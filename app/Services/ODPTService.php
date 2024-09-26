<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class ODPTService
{
  private $client;
  private $apiKey;
  private $baseUrl = 'https://api.odpt.org/';

  /**
   * ODPTServiceのコンストラクタ
   * APIキーの設定と、HTTPクライアントの初期化を行う
   *
   * @throws \RuntimeException APIキーが設定されていない場合
   */
  public function __construct()
  {
    $this->apiKey = config('services.odpt.key');
    if (!$this->apiKey) {
      throw new \RuntimeException('ODPT API key is not set.');
    }
    $this->client = new Client(['base_uri' => $this->baseUrl]);
  }

  /**
   * 列車運行情報を取得する
   *
   * @return array 列車運行情報
   */
  public function getTrainInformation()
  {
    return $this->makeRequest('api/v4/odpt:TrainInformation', [
      'odpt:operator' => 'odpt.Operator:TokyoMetro'
    ]);
  }

  /**
   * 路線情報を取得する
   *
   * @return array 路線情報
   */
  public function getRailways()
  {
    return $this->makeRequest('api/v4/odpt:Railway', [
      'odpt:operator' => 'odpt.Operator:TokyoMetro'
    ]);
  }

  /**
   * APIリクエストを実行する
   *
   * @param string $endpoint エンドポイントURL
   * @param array $additionalParams 追加のクエリパラメータ
   * @return array レスポンスデータ
   * @throws \Exception APIリクエストが失敗した場合
   */
  private function makeRequest($endpoint, $additionalParams = [])
  {
    try {
      // リクエストURLをログに記録
      Log::info('Request URL: ' . $this->baseUrl . $endpoint . '?acl:consumerKey=' . $this->apiKey);

      $params = array_merge([
        'acl:consumerKey' => $this->apiKey,
      ], $additionalParams);

      $response = $this->client->request('GET', $endpoint, [
        'query' => $params
      ]);

      return json_decode($response->getBody(), true);
    } catch (GuzzleException $e) {
      Log::error('ODPT API request failed', [
        'endpoint' => $endpoint,
        'error' => $e->getMessage()
      ]);

      // エラーの種類に応じて適切な処理を行う
      if ($e->getCode() == 401) {
        throw new \Exception('ODPT APIの認証に失敗しました。APIキーを確認してください。');
      }

      throw new \Exception('ODPT APIからデータの取得に失敗しました: ' . $e->getMessage());
    }
  }
}
