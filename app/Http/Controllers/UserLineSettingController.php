<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Services\UserLineSettingService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserLineSettingController extends Controller
{
    // UserLineSettingServiceのインスタンスを保持(サービスファイルに分けたものを使うので記載)
    protected $service;

    public function __construct(UserLineSettingService $service)
    {
        $this->service = $service;
    }

    /**
     * お気に入りの一覧を表示
     */
    public function index()
    {
        // サービスを使用してお気に入りを取得
        $favorites = $this->service->getFavoriteLineSettings();

        // FavoriteListコンポーネントをレンダリング
        return Inertia::render('FavoriteList', [
            'favorites' => $favorites,
            'initialMessage' => session('message') // セッションからメッセージを取得
        ]);
    }

    /**
     * 新しいお気に入りを作成するフォームを表示
     */
    public function create()
    {
        // サービスを使用して路線一覧を取得
        $lines = $this->service->getLines();

        // FavoriteListコンポーネントをレンダリング
        return Inertia::render('FavoriteCreate', [
            'lines' => $lines
        ]);
    }

    /**
     * 新しいお気に入りを保存
     */
    public function store(Request $request)
    {
        // リクエストデータのバリデーション
        $validated = $request->validate([
            'selectedLines' => 'required|array|min:1',  // 少なくとも1つの路線が選択されていること
            'selectedLines.*' => 'exists:lines,id',  // 選択された各路線IDがlinesテーブルに存在すること
        ]);

        // サービスを使用してお気に入りを保存
        $this->service->storeFavorites($validated['selectedLines']);

        // お気に入り一覧ページにリダイレクト
        return redirect()->route('favorites.index')
            ->with('message', 'お気に入りを登録しました！');
    }

    /**
     * お気に入りを更新するフォームを表示
     */
    public function edit()
    {
        // サービスを使用して路線一覧とお気に入り路線IDを取得
        $lines = $this->service->getLines();
        $favoriteLineIds = $this->service->getFavoriteLineIds();

        // FavoriteEditコンポーネントをレンダリング
        return Inertia::render('FavoriteEdit', [
            'lines' => $lines,
            'favoriteLineIds' => $favoriteLineIds
        ]);
    }

    /**
     * お気に入り設定を更新
     */
    public function update(Request $request)
    {
        // リクエストデータのバリデーション
        $validated = $request->validate([
            'selectedLines' => 'required|array',
            'selectedLines.*' => 'exists:lines,id',
        ]);

        // サービスを使用してお気に入りを更新
        $this->service->updateFavorites($validated['selectedLines']);

        // お気に入り一覧ページにリダイレクト
        return redirect()->route('favorites.index')
            ->with('message', 'お気に入りを更新しました！');
    }

    /**
     * お気に入り設定を削除
     */
    public function destroy($id)
    {
        try {
            // サービスを使用してお気に入りを削除
            $this->service->deleteFavorite($id);

            // お気に入り一覧ページにリダイレクト
            return redirect()->route('favorites.index')
                ->with('message', 'お気に入りを削除しました！');
        } catch (\Exception $e) {
            // エラーが発生した場合は前のページに戻る
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * 通知設定ページを表示
     */
    public function showNotificationSettings()
    {
        $user = Auth::user();

        // サービスを使用してユーザーの路線設定を取得
        $userLineSettings = $this->service->getFavoriteLineSettings();

        // LINE Notify連携状態を確認
        $isLineConnected = $user->lineNotifyToken()->exists();

        // LINE Notify用のstateパラメータを生成
        $state = Str::random(40);  // 40文字のランダムな文字列を生成
        session(['line_notify_state' => $state]);  // $state(CSRF攻撃を防ぐために使用)をセッションに保存し、後でコールバック時に検証

        // LINE Notify認証URLの生成
        $lineConnectUrl = 'https://notify-bot.line.me/oauth/authorize?' . http_build_query([  // 配列をクエリ文字列に変換
            'response_type' => 'code',  // OAuth2.0の認証コードフローを使用
            'client_id' => config('services.line_notify.client_id'),  //  LINE Notifyで取得したクライアントID
            'redirect_uri' => route('line-notify.callback'),  // 認証後にリダイレクトされる URL
            'scope' => 'notify',  //  LINE Notify の通知権限を要求
            'state' => $state  // 生成したランダムな文字列
        ]);

        // NotificationSettingsコンポーネントをレンダリング
        return Inertia::render('NotificationSettings', [
            'userLineSettings' => $userLineSettings,
            'lineConnectUrl' => $lineConnectUrl,
            'isLineConnected' => $isLineConnected,
        ]);
    }

    /**
     * 通知設定を更新
     */
    public function updateNotificationSettings(Request $request)
    {
        try {
            // リクエストデータのバリデーション
            $validatedData = $request->validate([
                'userLineSettings' => 'required|array',
                'userLineSettings.*.id' => 'required|exists:user_line_settings,id',
                'userLineSettings.*.notify_status_flag' => 'required|boolean',
                'userLineSettings.*.notify_monday' => 'required|boolean',
                'userLineSettings.*.notify_tuesday' => 'required|boolean',
                'userLineSettings.*.notify_wednesday' => 'required|boolean',
                'userLineSettings.*.notify_thursday' => 'required|boolean',
                'userLineSettings.*.notify_friday' => 'required|boolean',
                'userLineSettings.*.notify_saturday' => 'required|boolean',
                'userLineSettings.*.notify_sunday' => 'required|boolean',
                'userLineSettings.*' => [
                    'required',
                    function ($_, $value, $fail) {  // $_はphpのクロージャの引数の仕様により削除するとエラーになる！
                        // 通知が有効な場合、少なくとも1つの曜日が選択されているか確認
                        if ($value['notify_status_flag'] && !array_sum(array_slice($value, 2, 7))) {
                            $fail('通知を有効にする場合は、少なくとも1つの曜日を選択してください。');
                        }
                    },
                ],
                'notify_start_time' => 'nullable|date_format:H:i:s',
                'notify_end_time' => 'nullable|date_format:H:i:s',
                'notify_fixed_time' => 'nullable|date_format:H:i:s',
            ]);

            // サービスを使用して通知設定を更新
            $this->service->updateNotificationSettings($validatedData['userLineSettings']);

            // 最新のユーザー設定を取得
            $userLineSettings = $this->service->getFavoriteLineSettings();

            return  Inertia::render('NotificationSettings', [
                'userLineSettings' => $userLineSettings,
                'flashMessage' => '通知設定を更新しました。'
            ]);
        } catch (\Exception $e) {
            // エラーをログに記録
            Log::error('Error updating settings: ' . $e->getMessage());
            return Inertia::render('NotificationSettings', [
                'userLineSettings' => $this->service->getFavoriteLineSettings(),
                'flashMessage' => 'エラーが発生しました。'
            ])->with('errors', [$e->getMessage()]);
        }
    }
}
