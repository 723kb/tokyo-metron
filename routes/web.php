<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;  // Auth ファサード
use App\Http\Controllers\LineController;
use App\Http\Controllers\StatusUpdateController;

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
});

/**
 * 認証関連のルート
 * （Laravel Breezeが生成）
 */
require __DIR__.'/auth.php';

/**
 * 全路線の最新状況を取得するAPI
 */
Route::get('/lines-with-latest-status', [StatusUpdateController::class, 'getLinesWithLatestStatus']);

/**
 * 特定の路線の詳細情報を表示するルート
 */
Route::get('/line/{id}', [StatusUpdateController::class, 'show'])->name('line.show');

/**
 * 新しい運行状況を保存するルート
 */
Route::post('/status-update', [StatusUpdateController::class, 'store'])->name('status-update.store');