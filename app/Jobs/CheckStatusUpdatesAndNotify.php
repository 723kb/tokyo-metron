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
     * @param NotificationService $notificationService 通知サービス
     * @return void
     */
    public function handle(NotificationService $notificationService)
    {
        // ジョブの開始をログに記録
        Log::info('Starting CheckStatusUpdatesAndNotify job');

        // 通知サービスを使用して状態更新を処理
        $notificationService->processStatusUpdates();

        // ジョブの終了をログに記録
        Log::info('Finished CheckStatusUpdatesAndNotify job');
    }
}
