<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\UserLineSetting;
use App\Models\StatusUpdate;
use App\Services\LineNotifyService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * 運行状況の更新を確認し、ユーザーに通知を送信するジョブクラス
 * 
 * 開始時間と終了時間に設定した時間内に、運行状況に変化があれば通知を送信する
 */
class CheckStatusUpdatesAndNotify implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * ジョブを実行する
     *
     * @param LineNotifyService $lineNotifyService LINE Notify サービス
     * @return void
     */
    public function handle(LineNotifyService $lineNotifyService)
    {
        // ジョブの開始をログに記録
        Log::info('Starting CheckStatusUpdatesAndNotify job');

        $now = Carbon::now();
        /**
         * 過去5分以内に作成された最新の運行状況を取得
         * これにより直近の変更のみを処理し、古い更新による重複通知を防ぐ
         */
        $latestStatuses = StatusUpdate::where('created_at', '>=', $now->subMinutes(5))->get();

        // 各運行状況更新に対して処理を実行
        foreach ($latestStatuses as $status) {
            $this->processStatusUpdate($status, $lineNotifyService);
        }

        // ジョブの終了をログに記録
        Log::info('Finished CheckStatusUpdatesAndNotify job');
    }

    /**
     * 個別の運行状況更新を処理する
     *
     * @param StatusUpdate $status 運行状況
     * @param LineNotifyService $lineNotifyService LINE Notify サービス
     * @return void
     */
    private function processStatusUpdate(StatusUpdate $status, LineNotifyService $lineNotifyService)
    {

        /**
         * 該当する路線の通知設定を持つユーザーを取得
         * 通知フラグが有効で、現在の曜日の通知が許可されているものに限定
         */
        $userSettings = UserLineSetting::where('line_id', $status->line_id)
            ->where('notify_status_flag', true)
            ->where('notify_' . strtolower(Carbon::now()->englishDayOfWeek), true)
            ->get();

        // 各ユーザー設定に対して通知処理を実行
        foreach ($userSettings as $setting) {
            if ($this->shouldSendNotification($setting)) {
                $this->sendNotification($setting, $status, $lineNotifyService);
            }
        }
    }

    /**
     * 通知を送信すべきかどうかを判断する
     *
     * @param UserLineSetting $setting ユーザーの通知設定
     * @return bool 通知を送信すべき場合は true
     */
    private function shouldSendNotification(UserLineSetting $setting): bool
    {
        $now = Carbon::now();
        $currentTime = $now->format('H:i:s');

        // 現在時刻が通知時間範囲内にあるか、または必須通知時刻と一致する場合に true を返す
        return ($setting->notify_start_time <= $currentTime && $setting->notify_end_time >= $currentTime)
            || $setting->notify_fixed_time == $currentTime;
    }

    /**
     * 通知を送信する
     *
     * @param UserLineSetting $setting ユーザーの通知設定
     * @param StatusUpdate $status 運行状況
     * @param LineNotifyService $lineNotifyService LINE Notify サービス
     * @return void
     */
    private function sendNotification(UserLineSetting $setting, StatusUpdate $status, LineNotifyService $lineNotifyService)
    {

        /**
         * 重複通知を防ぐためのチェック
         * 最後の通知から5分以内で、かつ状態が変わっていない場合は通知をスキップ
         */
        $lastNotification = Cache::get("last_notification_{$setting->user_id}_{$setting->line_id}");
        if ($lastNotification && $lastNotification['status'] == $status->status && $lastNotification['time']->diffInMinutes(now()) < 5) {
            Log::info('Skipping duplicate notification', ['user_id' => $setting->user_id, 'line_id' => $setting->line_id]);
            return;
        }

        /**
         * 通知メッセージの作成
         * 「時間帯通知」の文言は本番環境では不要かも
         */
        $message = "時間帯通知\n路線名: {$setting->line->name}\n状況: {$status->status}\n内容: {$status->content}\n更新時間: {$status->created_at}";
        // LINE Notify を使用して通知を送信
        $result = $lineNotifyService->sendNotification($setting->user->lineNotifyToken->token, $message);

        if ($result) {
            /**
             * 送信成功時、最後の通知情報をキャッシュに保存
             * これにより、短時間での重複通知を防ぐ
             */
            Cache::put("last_notification_{$setting->user_id}_{$setting->line_id}", [
                'status' => $status->status,
                'time' => now()
            ], now()->addMinutes(10));
            Log::info('Notification sent', ['user_id' => $setting->user_id, 'line_id' => $setting->line_id]);
        } else {
            // 送信失敗時のエラーログ
            Log::error('Failed to send notification', ['user_id' => $setting->user_id, 'line_id' => $setting->line_id]);
        }
    }
}
