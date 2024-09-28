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

/**
 * 必須通知時刻に設定された通知を送信するジョブクラス
 */
class SendFixedTimeNotifications implements ShouldQueue
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
        // 現在の日時を取得
        $now = Carbon::now();
        $currentTime = $now->format('H:i:s');
        $dayOfWeek = strtolower($now->englishDayOfWeek);

        // 通知設定を取得
        $userSettings = UserLineSetting::where('notify_status_flag', true)
            ->where("notify_{$dayOfWeek}", true)
            ->where('notify_fixed_time', $currentTime)
            ->with(['user.lineNotifyToken', 'line'])
            ->get();

        // 各ユーザー設定に対して処理
        foreach ($userSettings as $setting) {
            // ユーザーとLINE Notifyトークンが存在する場合のみ処理
            if ($setting->user && $setting->user->lineNotifyToken) {
                // 最新の運行状況を取得
                $latestStatus = StatusUpdate::where('line_id', $setting->line_id)
                    ->latest()
                    ->first();

                // 運行状況が存在する場合、通知を送信
                if ($latestStatus) {
                    /**
                     * 通知メッセージの作成
                     * 「時間帯通知」の文言は本番環境では不要かも
                     */
                    $message = "必須通知\n路線名: {$setting->line->name}\n状況: {$latestStatus->status}\n内容: {$latestStatus->content}\n更新時間: {$latestStatus->created_at}";
                    $lineNotifyService->sendNotification($setting->user->lineNotifyToken->token, $message);
                }
            }
        }
    }
}
