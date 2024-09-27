<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LineNotifyToken;
use App\Services\LineNotifyService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class LineNotifyTokenController extends Controller
{
    // LineNotifyServiceのインスタンスを保持
    protected $lineNotifyService;

    // コンストラクタでLineNotifyServiceをDIで注入
    public function __construct(LineNotifyService $lineNotifyService)
    {
        $this->lineNotifyService = $lineNotifyService;
    }

    /**
     * LINE Notifyのコールバックを処理するメソッド
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleCallback(Request $request)
    {
        // コールバックリクエストの内容をログに記録
        Log::info('LINE Notify callback received', $request->all());

        // リクエストから認証コードとステートを取得
        $code = $request->input('code');
        $state = $request->input('state');

        // CSRFトークンの検証
        if ($state !== session('line_notify_state')) {
            Log::error('Invalid state', ['received' => $state, 'expected' => session('line_notify_state')]);
            return redirect()->route('notification-settings.show')->with('error', '不正なリクエストです。');
        }

        try {
            // 認証コードを使用してアクセストークンを取得
            $accessToken = $this->lineNotifyService->getAccessToken($code);
            Log::info('Access token received', ['token' => $accessToken]);

            if ($accessToken) {
                $user = Auth::user();
                if ($user) {
                    // ユーザーとLINE Notifyトークンを関連付けて保存または更新
                    LineNotifyToken::updateOrCreate(
                        ['user_id' => $user->id],
                        ['token' => $accessToken]
                    );
                    Log::info('LINE Notify token saved', ['user_id' => $user->id]);
                    return redirect()->route('notification-settings.show')->with('success', 'LINE Notifyとの連携が完了しました。');
                } else {
                    Log::error('User not authenticated');
                    return redirect()->route('notification-settings.show')->with('error', 'ユーザー認証に失敗しました。');
                }
            } else {
                Log::error('Failed to get access token');
                return redirect()->route('notification-settings.show')->with('error', 'アクセストークンの取得に失敗しました。');
            }
        } catch (\Exception $e) {
            // 例外が発生した場合、ログに記録してエラーメッセージを表示
            Log::error('Exception occurred', ['error' => $e->getMessage()]);
            return redirect()->route('notification-settings.show')->with('error', 'エラーが発生しました: ' . $e->getMessage());
        }
    }
    
    /**
     * LINE Notifyとの連携を解除するメソッド
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function disconnect()
    {
        $user = Auth::user();
        $lineNotifyToken = $user->lineNotifyToken;

        if ($lineNotifyToken) {
            // トークンを削除して連携を解除
            $lineNotifyToken->delete();
            Log::info('LINE Notify disconnected', ['user_id' => $user->id]);
            return redirect()->route('notification-settings.show')->with('success', 'LINE Notifyとの連携を解除しました。');
        }

        return redirect()->route('notification-settings.show')->with('error', 'LINE Notify連携が見つかりませんでした。');
    }

    /**
     * 特定のユーザーにLINE通知を送信するメソッド
     *
     * @param int $userId
     * @param string $message
     * @return string
     */
    public function sendNotification($userId, $message)
    {
        // ユーザーのLINE Notifyトークンを取得
        $lineNotifyToken = LineNotifyToken::where('user_id', $userId)->first();

        if (!$lineNotifyToken) {
            Log::warning('Attempted to send notification to user without LINE Notify token', ['user_id' => $userId]);
            return 'User not found or LINE Notify not connected';
        }

        try {
            // LINE Notifyサービスを使用して通知を送信
            $result = $this->lineNotifyService->sendNotification($lineNotifyToken->token, $message);
            if ($result) {
                Log::info('Notification sent successfully', ['user_id' => $userId]);
                return 'Notification sent successfully';
            } else {
                Log::error('Failed to send notification', ['user_id' => $userId]);
                return 'Failed to send notification';
            }
        } catch (\Exception $e) {
            // 例外が発生した場合、ログに記録してエラーメッセージを返す
            Log::error('Exception occurred while sending notification', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return 'Error occurred while sending notification';
        }
    }
}
