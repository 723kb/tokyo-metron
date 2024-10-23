<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Log;

/**
 * 必須通知時刻に設定された通知を送信するジョブクラス
 */
class SendFixedTimeNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * ジョブを実行する
     *
     * @param NotificationService $notificationService 通知サービス
     * @return void
     */
    public function handle(NotificationService $notificationService)
    {
        // ジョブの開始をログに記録
        Log::info('Starting SendFixedTimeNotifications job');

        // 通知サービスを使用して固定時間の通知を処理
        $notificationService->processFixedTimeNotifications();

        // ジョブの終了をログに記録
        Log::info('Finished SendFixedTimeNotifications job');
    }
}
