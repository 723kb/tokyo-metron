<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LineNotifyToken;
use App\Models\User;
use Faker\Factory as Faker;

class LineNotifyTokensTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('ja_JP');

        // 外部キーの使用 各モデルから全ユーザーのidのみ取得→配列に変換
        $users = User::pluck('id')->toArray();  // ::はモデルクラスを指す  = そのテーブル

        // LINE Notify用のトークンデータの生成
        foreach ($users as $userId) {  // 全ユーザーidにループ実行
            if ($faker->boolean(70)) {  // 70%の確率でtrue = トークン生成
                LineNotifyToken::create([  // モデルを使ってレコード作成
                    // カラム名(配列のキー) => データベースに入る値(キーに対応する値)
                    // ->の右側はFakerでダミーを生成する指示
                    'user_id' => $userId,
                    'token' => $faker->sha256,  // ハッシュ
                ]);
            }
        }
    }
}
