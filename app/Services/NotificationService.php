<?php

namespace App\Services;

use App\Models\UserLineSetting;
use App\Models\StatusUpdate;
use App\Models\LineNotifyToken;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * 通知関連の処理を行うサービスクラス
 */
class NotificationService
{
    private $lineNotifyService;

    /**
     * コンストラクタ
     *
     * @param LineNotifyService $lineNotifyService LINE Notify サービス
     */
    public function __construct(LineNotifyService $lineNotifyService)
    {
        $this->lineNotifyService = $lineNotifyService;
    }

    /**
     * LINE Notify トークンを保存または更新する
     * 
     * 既存のレコードがあれば更新、なければ新規作成。
     *
     * @param mixed $user ユーザーオブジェクト
     * @param string $accessToken アクセストークン
     * @return void
     */
    public function saveLineNotifyToken($user, $accessToken)
    {
        // ユーザーIDをキーにしてトークンを保存または更新
        LineNotifyToken::updateOrCreate(
            ['user_id' => $user->id],  // 検索条件
            ['token' => $accessToken]  // 更新または作成するデータ
        );
        // トークンの保存をログに記録
        Log::info('LINE Notify token saved', ['user_id' => $user->id]);
    }

    /**
     * LINE Notify との連携を解除する
     * 
     * トークンを無効化し、データベースから削除。
     *
     * @param mixed $user ユーザーオブジェクト
     * @return bool 解除成功時はtrue、失敗時はfalse
     */
    public function disconnectLineNotify($user)
    {
        // ユーザーに関連付けられたLINE Notifyトークンを取得
        $lineNotifyToken = $user->lineNotifyToken;

        // LINE Notifyトークンが存在する場合
        if ($lineNotifyToken) {
            // Http::withToken()で認証トークンをヘッダーに設定→LINE Notify APIを呼び出してトークンを無効化
            try {
                $response = Http::withToken($lineNotifyToken->token)
                    ->post('https://notify-api.line.me/api/revoke');

                // APIリクエストが成功した場合
                if ($response->successful()) {
                    // トークンを削除して連携を解除
                    $lineNotifyToken->delete();
                    // ログに成功メッセージを記録
                    Log::info('LINE Notify disconnected', ['user_id' => $user->id]);
                    return ['success' => true, 'message' => 'LINE Notifyとの連携を解除しました。'];
                } else {
                    // APIリクエストが失敗した場合、エラーをログに記録
                    Log::error('Failed to revoke LINE Notify token', ['status' => $response->status(), 'body' => $response->body()]);
                    return ['success' => false, 'message' => 'LINE Notifyとの連携解除に失敗しました。'];
                }
            } catch (\Exception $e) {
                // 例外が発生した場合、エラーをログに記録
                Log::error('Exception occurred while revoking LINE Notify token', ['error' => $e->getMessage()]);
                return ['success' => false, 'message' => 'LINE Notifyとの連携解除中にエラーが発生しました。'];
            }
        }
        return ['success' => false, 'message' => 'LINE Notify連携が見つかりませんでした。'];
    }

    /**
     * 最新の運行状況更新を処理する
     * 
     * 重複通知を避けるために過去5分以内の最新の
     * 運行状況を取得し、各ユーザーに通知を送信。
     *
     * @return void
     */
    public function processStatusUpdates()
    {
        $now = Carbon::now();
        // 過去5分以内に作成された最新の運行状況を取得
        $latestStatuses = StatusUpdate::where('created_at', '>=', $now->subMinutes(5))
            ->orderBy('line_id')
            ->orderBy('created_at', 'desc')
            ->get()
            ->unique('line_id');

        // 各運行状況に対して処理を実行
        foreach ($latestStatuses as $status) {
            try {
                $this->processStatusUpdate($status);
            } catch (\Exception $e) {
                Log::error('Error processing status update', [
                    'status_id' => $status->id,
                    'error' => $e->getMessage()
                ]);
            }
        }
    }

    /**
     * 個別の運行状況更新を処理する
     * 
     * 通知フラグが有効で、現在の曜日の通知が
     * 許可されているものに通知を送信。
     *
     * @param StatusUpdate $status 運行状況オブジェクト
     * @return void
     */
    private function processStatusUpdate(StatusUpdate $status)
    {

        // 通知を送信すべきユーザー設定を取得
        $userSettings = UserLineSetting::where('line_id', $status->line_id)
            ->where('notify_status_flag', true)
            ->where('notify_' . strtolower(Carbon::now()->englishDayOfWeek), true)
            ->get();

        // 各ユーザー設定に対して通知処理を実行
        foreach ($userSettings as $setting) {
            if ($this->shouldSendNotification($setting)) {
                $this->sendNotification($setting, $status, false);
            }
        }
    }

    /**
     * 通知を送信すべきかどうかを判断する
     * 
     * ユーザーの通知設定に基づいて、現在時刻が
     * 通知を送信すべき時間帯かどうかを判断。
     *
     * @param UserLineSetting $setting ユーザーの通知設定
     * @return bool 通知を送信すべき場合はtrue
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
     * トークンの有効性をチェックする
     *
     * @param string $token
     * @return bool
     */
    private function isTokenValid($token)
    {
        try {
            $response = Http::withToken($token)->get('https://notify-api.line.me/api/status');
            // レスポンスが成功（2xx系のステータスコード）であればtrueを返す
            return $response->successful();
        } catch (\Exception $e) {
            // 例外が発生した場合、エラーをログに記録
            Log::error('Error checking token validity', ['error' => $e->getMessage()]);
            // エラーが発生した場合は、安全のためfalseを返す
            return false;
        }
    }

    /**
     * 通知を送信する
     * 
     * ユーザーの設定と運行状況に基づいて通知を送信。
     * 重複する通知を防ぐためのチェックも行います。
     *
     * @param UserLineSetting $setting ユーザーの通知設定
     * @param StatusUpdate $status 運行状況
     * @param bool $isFixedTime 必須通知かどうか
     * @return void
     */
    private function sendNotification(UserLineSetting $setting, StatusUpdate $status, bool $isFixedTime)
    {
        Log::info('Attempting to send notification', [
            'user_id' => $setting->user_id,
            'line_id' => $status->line_id,
            'is_fixed_time' => $isFixedTime
        ]);
        if (!$setting->user || !$setting->user->lineNotifyToken) {
            Log::warning('User or LineNotifyToken not found', ['user_id' => $setting->user_id]);
            return;
        }

        $token = $setting->user->lineNotifyToken->token;

        // トークンの有効性をチェック
        if (!$this->isTokenValid($token)) {
            Log::error('Invalid LINE Notify token', ['user_id' => $setting->user_id]);
            return;
        }

        // 各IDを組み合わせてキャッシュキーを生成
        $cacheKey = "last_notification_{$setting->user_id}_{$status->line_id}_{$status->id}";
        // 最後の通知された情報を取得
        $lastNotification = Cache::get($cacheKey);

        // 重複通知のチェック（必須通知の場合はスキップしない）
        if (!$isFixedTime && $lastNotification) {
            if (
                // 前回の通知と今回の通知の状態、内容、更新時間を比較
                $lastNotification['status'] == $status->status &&
                $lastNotification['content'] == $status->content &&
                $lastNotification['updated_at'] == $status->updated_at
            ) {
                // 重複する通知の場合、ログを記録してスキップ
                Log::info('Skipping duplicate notification', [
                    'user_id' => $setting->user_id,
                    'line_id' => $status->line_id,
                    'status_id' => $status->id,
                    'last_notification_time' => $lastNotification['time'],
                    'current_time' => now()
                ]);
                return;
            }
        }

        // 通知メッセージを作成
        $message = $this->createNotificationMessage($setting, $status, $isFixedTime);
        // LINE Notifyを使用して通知を送信
        $result = $this->lineNotifyService->sendNotification($token, $message);

        if ($result) {
            /**
             * 送信成功時、最後の通知情報をキャッシュに保存
             * これにより、短時間での重複通知を防ぐ
             */
            Cache::put($cacheKey, [
                'status' => $status->status,
                'content' => $status->content,
                'updated_at' => $status->updated_at,
                'time' => now()
            ], now()->addHours(1));
            Log::info('Notification sent', [
                'user_id' => $setting->user_id,
                'line_id' => $status->line_id,
                'status_id' => $status->id,
                'type' => $isFixedTime ? '必須通知' : '時間帯通知',
                'time' => now()
            ]);
        } else {
            // 送信失敗時、エラーログを記録
            Log::error('Failed to send notification', [
                'user_id' => $setting->user_id,
                'line_id' => $status->line_id,
                'type' => $isFixedTime ? '必須通知' : '時間帯通知'
            ]);
        }
    }

    /**
     * 通知メッセージを作成する
     *
     * @param UserLineSetting $setting ユーザーの通知設定
     * @param StatusUpdate $status 運行状況
     * @param bool $isFixedTime 固定時間通知かどうか
     * @return string 通知メッセージ
     */
    private function createNotificationMessage(UserLineSetting $setting, StatusUpdate $status, bool $isFixedTime): string
    {
        $prefix = $isFixedTime ? "必須通知" : "時間帯通知";
        return "{$prefix}\n路線名: {$setting->line->name}\n状況: {$status->status}\n内容: {$status->content}\n更新時間: {$status->created_at}";
    }

    /**
     * 必須通知を処理する
     *
     * @return void
     */
    public function processFixedTimeNotifications()
    {
        // 現在の日時を取得
        $now = Carbon::now();
        $currentTime = $now->format('H:i:s');
        // 現在の曜日を小文字の英語で取得
        $dayOfWeek = strtolower($now->englishDayOfWeek);

        Log::info('Processing fixed time notifications', [
            'current_time' => $currentTime,
            'day_of_week' => $dayOfWeek
        ]);

        /**
         * 通知設定を取得
         * 条件：通知がオン、現在の曜日の通知が有効、現在時刻が通知時刻と一致
         */
        $userSettings = UserLineSetting::where('notify_status_flag', true)
            ->where("notify_{$dayOfWeek}", true)
            ->where('notify_fixed_time', $currentTime)
            ->with(['user.lineNotifyToken', 'line']) // 関連するユーザー、LINEトークン、路線情報も同時に取得
            ->get();

            Log::info('Found user settings for fixed time notifications', [
                'count' => $userSettings->count()
            ]);

        // 各ユーザー設定に対して処理を実行
        foreach ($userSettings as $setting) {
            try {
                Log::info('Processing user setting', [
                    'user_id' => $setting->user_id,
                    'line_id' => $setting->line_id,
                    'notify_fixed_time' => $setting->notify_fixed_time
                ]);

                // ユーザーとLINE Notifyトークンが存在する場合のみ処理
                if ($setting->user && $setting->user->lineNotifyToken) {
                    // 該当する路線の最新の運行状況を取得
                    $latestStatus = StatusUpdate::where('line_id', $setting->line_id)
                        ->latest()
                        ->first();

                    // 運行状況が存在する場合、通知を送信
                    if ($latestStatus) {
                        Log::info('Sending fixed time notification', [
                            'user_id' => $setting->user_id,
                            'line_id' => $setting->line_id,
                            'status_id' => $latestStatus->id
                        ]);
                        // 第3引数のtrueは、これが必須通知であることを示す
                        $this->sendNotification($setting, $latestStatus, true);
                    } else {
                        Log::warning('No latest status found for line', [
                            'line_id' => $setting->line_id
                        ]);
                    }
                } else {
                    Log::warning('User or LINE Notify token not found', [
                        'user_id' => $setting->user_id
                    ]);
                }
            } catch (\Exception $e) {
                // エラーが発生した場合、ログに記録
                Log::error('Error processing fixed time notification', [
                    'user_id' => $setting->user_id,
                    'error' => $e->getMessage()
                ]);
            }
        }
        Log::info('Finished processing fixed time notifications');
    }
}
