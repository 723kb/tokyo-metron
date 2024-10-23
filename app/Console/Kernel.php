<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\SendFixedTimeNotifications;
use App\Jobs\CheckStatusUpdatesAndNotify;

/**
 * アプリケーションのコンソールコマンドとスケジューリングを管理
 */
class Kernel extends ConsoleKernel
{

    /**
     * アプリケーションで提供されるArtisanコマンド
     *
     * @var array
     */    
    protected $commands = [
        \App\Console\Commands\FetchODPTData::class,  // ODPTデータ取得コマンドを登録
        \App\Console\Commands\DeleteOldStatuses::class,  // 古い運行状況を削除するコマンドを登録
    ];

    /**
     * アプリケーションのコマンドスケジュールを定義
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
         // ODPTデータ取得コマンドを5分ごとに実行するようスケジュール
        $schedule->command('odpt:fetch')->everyFiveMinutes();
        // 古い運行状況を削除するコマンドを毎日実行するようスケジュール
        $schedule->command('app:delete-old-statuses')->daily();  
        // 必須通知時刻の通知ジョブを毎分実行するようスケジュール
        $schedule->job(new SendFixedTimeNotifications)->everyMinute();
        // 運行状況更新チェックと通知ジョブを毎分実行するようスケジュール
        $schedule->job(new CheckStatusUpdatesAndNotify)->everyMinute();
    }

    /**
     * アプリケーションのコマンドを登録
     *
     * @return void
     */
    protected function commands(): void
    {
        // Commandsディレクトリ内のすべてのコマンドを自動的に登録
        $this->load(__DIR__ . '/Commands');

        // routes/console.phpファイルを読み込み（追加のコンソールルートを定義可能）
        require base_path('routes/console.php');
    }
}
