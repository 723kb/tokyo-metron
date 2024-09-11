<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

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
