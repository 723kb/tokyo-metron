<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserLineSetting;
use App\Models\Line;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserLineSettingController extends Controller
{
    /**
     * お気に入りの一覧を表示
     */
    public function index()
    {
        // 現在のユーザーのお気に入り路線(favorite_flagが true=1 )のものを取得
        $favorites = UserLineSetting::where('user_id', Auth::id())
            ->where('favorite_flag', true)
            ->with('line')  // 関連する路線情報も取得
            ->get();

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
        // 丸ノ内線支線を除く全路線を取得
        $lines = Line::where('name', '!=', '丸ノ内線支線')
            ->select('id', 'name', 'color_code')
            ->get();

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

        // 選択された各路線をお気に入りとして保存
        foreach ($validated['selectedLines'] as $lineId) {
            UserLineSetting::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'line_id' => $lineId,
                ],
                ['favorite_flag' => true]
            );
        }

        // お気に入り一覧ページにリダイレクト
        return redirect()->route('favorites.index')
            ->with('message', 'お気に入りを登録しました！');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * お気に入りを更新するフォームを表示
     */
    public function edit()
    {
        $user = Auth::user();
        // 丸ノ内線支線を除く全路線を取得
        $lines = Line::where('name', '!=', '丸ノ内線支線')
            ->select('id', 'name', 'color_code')
            ->get();
        // ユーザーのお気に入り路線IDを取得
        $favoriteLineIds = UserLineSetting::where('user_id', $user->id)
            ->where('favorite_flag', true)
            ->pluck('line_id')
            ->toArray();

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

        $userId = Auth::id();

        // 全てのお気に入りを一旦 false = 0 に設定
        UserLineSetting::where('user_id', $userId)->update(['favorite_flag' => false]);

        // 選択された路線を true=1 に設定
        foreach ($validated['selectedLines'] as $lineId) {
            UserLineSetting::updateOrCreate(
                [
                    'user_id' => $userId,
                    'line_id' => $lineId,
                ],
                ['favorite_flag' => true]
            );
        }

        return redirect()->route('favorites.index')
            ->with('message', 'お気に入りを更新しました！');
    }

    /**
     * お気に入り設定を削除
     */
    public function destroy($id)
    {
        // 指定されたIDのお気に入り設定を取得
        $favorite = UserLineSetting::findOrFail($id);
        // ユーザーが自分のお気に入りのみを削除できるようにチェック
        if (Auth::id() !== $favorite->user_id) {
            abort(403, 'このお気に入りを削除する権限がありません。');
        }

        // お気に入り設定を削除
        $favorite->delete();

        // お気に入り一覧ページにリダイレクト
        return redirect()->route('favorites.index')
            ->with('message', 'お気に入りを削除しました！');
    }
}
