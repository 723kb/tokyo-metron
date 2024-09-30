<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\LineNotifyService;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LineNotifyTokenController extends Controller
{
    private $lineNotifyService;
    private $notificationService;

    /**
     * コンストラクタ
     *
     * @param LineNotifyService $lineNotifyService LINE Notify サービス
     * @param NotificationService $notificationService 通知サービス
     * @return void
     */
    public function __construct(LineNotifyService $lineNotifyService, NotificationService $notificationService)
    {
        $this->lineNotifyService = $lineNotifyService;
        $this->notificationService = $notificationService;
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

        /**
         * リクエストから認証コードとステートを取得
         * codeはアクセストークンを取得するために使用、stateはCSRF対策に使用
         */
        $code = $request->input('code');
        $state = $request->input('state');

        /* 
        CSRFトークンの検証
        セッションに保存されたstateと受け取ったstateを比較して、リクエストの正当性を確認
        */
        if ($state !== session('line_notify_state')) {
            Log::error('Invalid state', ['received' => $state, 'expected' => session('line_notify_state')]);
            return redirect()->route('notification-settings.show')->with('error', '不正なリクエストです。');
        }

        try {
            // 認証コードを使用してアクセストークンを取得
            $accessToken = $this->lineNotifyService->getAccessToken($code);
            if ($accessToken) {
                $user = Auth::user();
                if ($user) {
                    // ユーザーとLINE Notifyトークンを関連付けて保存
                    $this->notificationService->saveLineNotifyToken($user, $accessToken);
                    // 成功した場合は、通知設定ページにリダイレクト
                    return redirect()->route('notification-settings.show')->with('success', 'LINE Notifyとの連携が完了しました。');
                } else {
                    Log::error('User not authenticated');
                    // ユーザーが認証されていない場合（通常ではほぼないはず）
                    return redirect()->route('notification-settings.show')->with('error', 'ユーザー認証に失敗しました。');
                }
            } else {
                Log::error('Failed to get access token');
                // アクセストークンの取得に失敗した場合
                return redirect()->route('notification-settings.show')->with('error', 'アクセストークンの取得に失敗しました。');
            }
        } catch (\Exception $e) {
            Log::error('Exception occurred', ['error' => $e->getMessage()]);
            // 例外が発生した場合、ログに記録してエラーメッセージを表示
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
        // 現在認証されているユーザーを取得
        $user = Auth::user();
        // 通知サービスを使用してLINE Notifyとの連携を解除
        $result = $this->notificationService->disconnectLineNotify($user);
        
        if ($result) {
            // 成功した場合
            $message = 'LINE Notifyとの連携を解除しました。';
            $type = 'success';
            $statusCode = 200; // HTTP 200 OK
        } else {
            // 失敗した場合
            $message = 'LINE Notifyとの連携解除に失敗しました。';
            $type = 'error';
            $statusCode = 500; // HTTP 500 Internal Server Error
        }
    
        return Inertia::render('NotificationSettings', [
            'flash' => [
                'message' => $message,
                'type' => $type
            ],
            'isLineConnected' => false
        ])->toResponse(request())->setStatusCode($statusCode);
    }
}
