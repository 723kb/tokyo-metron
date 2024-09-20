<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\StatusUpdate;
use Carbon\Carbon;

/**
 * 古い運行状況をデータベースから削除するコマンド
 * 
 * 最終更新日から4日以上経過した運行状況データを
 * データベースから削除する。
 */
class DeleteOldStatuses extends Command
{
  /**
   * コマンドの名前と引数を定義
   *
   * @var string
   */
  protected $signature = 'app:delete-old-statuses';


  /**
   * コマンドの説明
   *
   * @var string
   */
  protected $description = '最終更新日から4日以上経過した運行状況を削除';

  /**
   * コマンドの実行
   *
   * @return void
   */
  public function handle()
  {
    // Carbonライブラリを使って4日前の日時を計算
    $cutoffDate = Carbon::now()->subDays(4);

    // 指定した日時より古い運行状況データを削除
    StatusUpdate::where('updated_at', '<', $cutoffDate)->delete();

    // 削除完了のメッセージを表示
    $this->info('古い運行状況を削除しました。');
  }
}
