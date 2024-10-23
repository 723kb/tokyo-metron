<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\StatusUpdate;
use Faker\Factory as Faker;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('ja_JP');
        
        // 外部キーの使用 各モデルから全ユーザーのidのみ取得→配列に変換
        $users = User::pluck('id')->toArray();  // ::はモデルクラスを指す  = そのテーブル
        $statusUpdates = StatusUpdate::pluck('id')->toArray();
        
        // コメントデータ生成
        for ($i = 0; $i < 30; $i++) {
            Comment::create([  // モデルを使ってレコード作成
                // カラム名(配列のキー) => データベースに入る値(キーに対応する値)
                // ->の右側はFakerでダミーを生成する指示
                'user_id' => $faker->randomElement($users),
                'status_update_id' => $faker->randomElement($statusUpdates),
                'content' => $faker->realText(100, 5),  // 日本語のテキストを生成
            ]);
        }
    }
}
