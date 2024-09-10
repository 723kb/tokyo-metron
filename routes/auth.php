<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

/**
 * ゲストユーザー（未ログインユーザー）向けのルート
 * 全体にmiddleware('guest')がかかってるから個々のルートには不要
 */
Route::middleware('guest')->group(function () {  // 
    /**
     * RegisteredUserControllerのルート
     * 同じコントローラーを使うルートはまとめられる
     *  */
    Route::controller(RegisteredUserController::class)->group(function () {
        // 会員登録フォーム表示
        Route::get('/register', 'showRegistrationForm')
            ->name('register');

        // 会員登録確認画面表示
        Route::post('/register/confirm', 'showConfirmForm')
            ->name('register.confirm');

        // 会員登録処理
        Route::post('/register',  'register')
            ->name('register.store');

        // 会員登録結果画面表示
        Route::get('/register/result', 'showResult')
            ->name('register.result');
    });

    // ログインフォーム表示
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    // ログイン処理
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // パスワードリセットフォーム表示
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    // パスワードリセットリンク送信
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // パスワードリセットフォーム表示
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    // パスワードリセット処理
    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

/**
 * 認証済みユーザー向けのルート
 */
Route::middleware('auth')->group(function () {
    // メール認証通知
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    // メール認証処理
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    // メール認証再送信
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // パスワード確認画面表示
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    // パスワード確認処理
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // パスワード更新処理
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    // ログアウト処理
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});