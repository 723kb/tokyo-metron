<?php

namespace App\Console\Commands;

use App\Models\Line;
use App\Models\StatusUpdate;
use App\Services\ODPTService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

/**
 * ODPTからデータを取得し、データベースに保存するコマンド
 */
class FetchODPTData extends Command
{
  /**
   * コマンドの名前と引数を定義
   *
   * @var string
   */
  protected $signature = 'odpt:fetch';

  /**
   * コマンドの説明
   *
   * @var string
   */
  protected $description = 'Fetch data from ODPT API';

  /**
   * コマンドの実行
   *
   * @param ODPTService $odptService ODPTサービスのインスタンス
   * @return void
   */
  public function handle(ODPTService $odptService)
  {
    $this->info('Fetching data from ODPT API...');

    try {
      // 路線情報(odpt:Railway)の取得
      $railwayData = $odptService->getRailways();
      $this->processRailwayData($railwayData);

      // 運行情報(odpt:TrainInformation)の取得
      $trainInformationData = $odptService->getTrainInformation();
      $this->processTrainInformationData($trainInformationData);

      $this->info('Data fetched and saved successfully.');
    } catch (\Exception $e) {
      $this->error("Error fetching data: " . $e->getMessage());
      Log::error("Error fetching data: " . $e->getMessage());
    }
  }

  /**
   * 路線情報の処理
   *
   * @param array $railwayData 路線情報の配列
   * @return void
   */
  private function processRailwayData($railwayData)
  {
    foreach ($railwayData as $railway) {
      // 路線名を取得
      $name = $railway['dc:title'];
      // 丸ノ内線支線をスキップ
      if ($name === '丸ノ内線支線') {
        continue;
      }
      $this->info("Processing railway: $name");
      try {
        // データベースに路線情報を更新または新規作成
        Line::updateOrCreate(
          ['name' => $name],  // 検索条件
          [
            'color_code' => $railway['odpt:color'] ?? '#FFFFFF',  // 更新または作成するデータ
          ]
        );
        $this->info("Successfully saved railway: $name");
      } catch (\Exception $e) {
        // エラー発生時のログ記録
        $this->error("Error processing railway $name: " . $e->getMessage());
        Log::error("Error processing railway $name: " . $e->getMessage());
      }
    }
  }

  /**
   * 運行情報の処理
   *
   * @param array $trainInformationData 運行情報の配列
   * @return void
   */
  private function processTrainInformationData($trainInformationData)
  {
    foreach ($trainInformationData as $info) {
      // 路線名を取得
      $railwayName = $info['odpt:railway'];
      $lineName = $this->extractLineName($railwayName);
      $this->info("Processing train information for: $lineName");
      try {
        // データベースから路線情報を取得
        $line = Line::where('name', 'LIKE', "%{$lineName}%")->first();
        if ($line) {
          // 運行情報テキストを取得（配列の場合は日本語テキストを使用）
          // null合体演算子を使用してキーの存在チェック
          $content = is_array($info['odpt:trainInformationText'])
            ? $info['odpt:trainInformationText']['ja'] ?? ''
            : $info['odpt:trainInformationText'] ?? '';
          // 運行状況を取得（デフォルトは'平常運転'）
          $status = '平常運転';
          if (isset($info['odpt:trainInformationStatus'])) {
            // 'odpt:trainInformationStatus'キーが存在する場合のみ処理
            $status = is_array($info['odpt:trainInformationStatus'])
              ? ($info['odpt:trainInformationStatus']['ja'] ?? '平常運転')
              : $info['odpt:trainInformationStatus'];
          }

          // デバッグ情報の出力
          $this->info("Raw status data: " . print_r($info['odpt:trainInformationStatus'] ?? 'Not set', true));
          $this->info("Processed status: $status");

          // 最新の状態更新を取得
          $latestUpdate = StatusUpdate::where('line_id', $line->id)
            ->latest()
            ->first();

          // 新しい情報がある場合のみ更新
          if (!$latestUpdate || $latestUpdate->content !== $content || $latestUpdate->status !== $status) {
            StatusUpdate::create([
              'line_id' => $line->id,
              'status' => $status,
              'content' => $content,
            ]);
            $this->info("Created new status update for: " . $line->name);
          } else {
            $this->info("No changes for: " . $line->name);
          }
        } else {
          $this->warn("Line not found for railway: $lineName");
        }
      } catch (\Exception $e) {
        // エラーログを記録
        $this->error("Error processing train information for $lineName: " . $e->getMessage());
        $this->error("Raw data: " . print_r($info, true));
        Log::error("Error processing train information for $lineName: " . $e->getMessage());
        Log::error("Raw data: " . print_r($info, true));
      }
    }
  }

  /**
   * 路線名の英語表記を日本語に変換
   *
   * @param string $railwayName 英語の路線名
   * @return string 日本語の路線名
   */
  private function extractLineName($railwayName)
  {
    // 路線名を'.'で分割し、最後の部分を取得
    $parts = explode('.', $railwayName);
    $englishName = end($parts);
    // 英語名と日本語名の対応表
    $japaneseNames = [
      'Ginza' => '銀座線',
      'Marunouchi' => '丸ノ内線',
      'MarunouchiBranch' => '丸ノ内線支線',
      'Hibiya' => '日比谷線',
      'Tozai' => '東西線',
      'Chiyoda' => '千代田線',
      'Yurakucho' => '有楽町線',
      'Hanzomon' => '半蔵門線',
      'Namboku' => '南北線',
      'Fukutoshin' => '副都心線',
    ];
    // 対応する日本語名があればそれを返し、なければ英語名をそのまま返す
    return $japaneseNames[$englishName] ?? $englishName;
  }
}
