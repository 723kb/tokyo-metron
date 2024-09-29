<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * LINE Notify サービスクラス
 * 
 * LINE Notify APIとの通信を担当し、通知の送信や
 * アクセストークンの取得を行う。
 */
class LineNotifyService
{
    // LINE Notify APIのエンドポイントURL
    private $apiUrl = 'https://notify-api.line.me/api/notify';

    /**
     * LINE Notifyを使用して通知を送信する
     *
     * @param string $accessToken LINE Notifyのアクセストークン
     * @param string $message 送信するメッセージ
     * @return bool 送信が成功したかどうか
     */
    public function sendNotification($accessToken, $message)
    {
        try {
            // HTTP POSTリクエストを送信
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,  // // 認証ヘッダーにアクセストークンを設定
            ])->asForm()->post($this->apiUrl, [
                'message' => $message,  // 送信するメッセージ
            ]);

            // レスポンスが成功でない場合、エラーをログに記録して false を返す
            if (!$response->successful()) {
                Log::error('Failed to send LINE notification', ['status' => $response->status(), 'body' => $response->body()]);
                return false;
            }

            // 通知の送信に成功した場合、true を返す
            return true;
        } catch (\Exception $e) {
            // 例外が発生した場合、エラーをログに記録して false を返す
            Log::error('Exception occurred while sending LINE notification', ['error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * LINE Notifyのアクセストークンを取得する
     *
     * @param string $code 認証コード
     * @return string|null アクセストークン（失敗時はnull）
     */
    public function getAccessToken($code)
    {
        try {
            // アクセストークン取得のためのPOSTリクエストを送信
            $response = Http::asForm()->post('https://notify-bot.line.me/oauth/token', [
                'grant_type' => 'authorization_code',
                'code' => $code,
                'redirect_uri' => config('services.line_notify.redirect_uri'),
                'client_id' => config('services.line_notify.client_id'),
                'client_secret' => config('services.line_notify.client_secret'),
            ]);

            // リクエストとレスポンスの内容をログに記録（デバッグ用）
            // 本番環境では機密情報をログに記録しないよう注意！！
            Log::info('LINE Notify token request', [
                'request' => [
                    'grant_type' => 'authorization_code',
                    'code' => $code,
                    'redirect_uri' => config('services.line_notify.redirect_uri'),
                    'client_id' => config('services.line_notify.client_id'),
                ],
                'response' => $response->json()
            ]);

            // レスポンスが成功の場合、アクセストークンを返す
            if ($response->successful()) {
                return $response->json()['access_token'];
            } else {
                // エラーの場合、ログに記録してnullを返す
                Log::error('Failed to get access token', ['response' => $response->body()]);
                return null;
            }
        } catch (\Exception $e) {
            // 例外が発生した場合、ログに記録してnullを返す
            Log::error('Exception occurred while getting LINE Notify token', ['error' => $e->getMessage()]);
            return null;
        }
    }
}
