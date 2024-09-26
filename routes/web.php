<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;  // Auth ファサード
use App\Http\Controllers\CommentController;
use App\Http\Controllers\StatusUpdateController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserLineSettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * トップページのルート
 */
Route::get('/', function () {
    return Inertia::render('Top', [
        'auth' => ['user' => Auth::user()],
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('top');  // 名前を明示

/**
 * メインページのルート
 * （認証済みユーザーのみアクセス可能）
 */
Route::get('/main', function () {
    return Inertia::render('Main');
})->middleware(['auth', 'verified'])->name('main');

/**
 * 認証済みユーザー向けのルートグループ
 * （認証済みユーザーのみアクセス可能）
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // マイページへのルート
    Route::get('/mypage', function () {
        return Inertia::render('MyPage');
    })->name('mypage.index');

    /**
     * コメント関連のルートグループ
     */
    Route::controller(CommentController::class)->group(function () {
        // コメント投稿ルート
        Route::post('/line/{lineId}/post/{postId}/comments', 'store')->name('comment.store');
        // コメント削除ルート
        Route::delete('/comments/{comment}', 'destroy')->name('comment.destroy');
    });

    /**
     * いいね関連のルートグループ
     */
    Route::controller(LikeController::class)->group(function () {
        // コメントにいいねを追加するルート
        Route::post('/comments/{comment}/like', 'store')->name('comments.like.store');
        // コメントのいいねを削除するルート
        Route::delete('/comments/{comment}/like', 'destroy')->name('comments.like.destroy');
        // コメントのいいね状態を取得するルート
        Route::get('/comments/{comment}/like-status', 'getStatus')
            ->name('comments.like.status');
    })->where('comment', '[0-9]+');  // {comment} パラメータが数字のみであることを保証

    /**
     * お気に入りページ/通知設定へのルートグループ
     */
    Route::controller(UserLineSettingController::class)->group(function () {
        // お気に入り一覧ページを表示
        Route::get('/favorites', 'index')->name('favorites.index');
        // 新しいお気に入りを作成するフォームを表示
        Route::get('/favorites/create', 'create')->name('favorites.create');
        // 新しいお気に入りをデータベースに保存
        Route::post('/favorites', 'store')->name('favorites.store');
        // お気に入りを編集するフォームを表示
        Route::get('/favorites/edit', 'edit')->name('favorites.edit');
        // 既存のお気に入りを更新
        Route::put('/favorites', 'update')->name('favorites.update');
        // 指定されたIDのお気に入りを削除
        Route::delete('/favorites/{id}', 'destroy')->name('favorites.destroy');

        // 通知設定を表示
        Route::get('notification-settings', 'showNotificationSettings')->name('notification-settings.show');
        // 通知設定を保存(更新)
        Route::patch('notification-settings', 'updateNotificationSettings')->name('notification-settings.update');
    });
});

/**
 * 路線情報関連のルートグループ
 */
Route::controller(StatusUpdateController::class)->group(function () {
    // 全路線の最新状況を取得するAPI
    Route::get('/lines-with-latest-status', 'getLinesWithLatestStatus');
    // 特定の路線の詳細情報を一覧表示するルート
    Route::get('/line/{id}', 'index')->name('line.index');
    // 特定の路線の詳細情報を個別に表示するルート
    Route::get('/line/{lineId}/post/{postId}', 'show')->name('line.post.show');
    // 新しい運行状況を保存するルート
    Route::post('/status-update', 'store')->name('status-update.store');
});

/**
 * 認証関連のルート
 * （Laravel Breezeが生成）
 */
require __DIR__ . '/auth.php';
