<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    // 1. 会員登録フォーム表示
    public function showRegistrationForm()
    {
        // Auth/Registerコンポーネントをレンダリング
        return Inertia::render('Auth/Register');
    }

    // 2. 確認画面表示
    public function showConfirmForm(Request $request)
    {
        // バリデーション
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // セッションにバリデーション済みのデータを保存
        $request->session()->put('registration_data', $validatedData);

        // 確認画面（Auth/RegisterConfirm）をレンダリング
        return Inertia::render('Auth/RegisterConfirm', [
            'data' => [
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => str_repeat('*', strlen($validatedData['password'])),
            ]
        ]);
    }

    // 3. 登録処理と結果画面表示
    public function register(Request $request)
    {
        // セッションから保存したデータを取得
        $data = $request->session()->get('registration_data');

        // データが存在しない場合は登録フォームにリダイレクト
        if (!$data) {
            return redirect()->route('register');
        }

        // ユーザーを作成
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Registeredイベントを発火（メール送信などの処理をトリガー）
        event(new Registered($user));

        // セッションからデータを削除
        $request->session()->forget('registration_data');

        // 登録結果画面にリダイレクト
        return redirect()->route('register.result')->with('user', $user);
    }

    public function showResult(Request $request)
    {
        // セッションからユーザー情報を取得
        $user = $request->session()->get('user');

        // ユーザー情報が存在しない場合は登録画面にリダイレクト
        if (!$user) {
            return redirect()->route('register');
        }

        // 会員登録結果画面をレンダリング
        return Inertia::render('Auth/RegisterResult', [
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'password' => str_repeat('*', 8), // パスワードの長さは固定
            ]
        ]);
    }
}