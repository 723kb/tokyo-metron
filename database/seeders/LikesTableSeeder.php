<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Like;
use App\Models\Comment;
use App\Models\User;
use Faker\Factory as Faker;

class LikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('ja_JP');
        
        // 外部キーの使用 各モデルから全ユーザーのidのみ取得→配列に変換
        $users = User::pluck('id')->toArray();  // ::はモデルクラスを指す  = そのテーブル
        $comments = Comment::pluck('id')->toArray();
        
        // いいねの生成
        for ($i = 0; $i < 50; $i++) {
            Like::create([  // モデルを使ってレコード作成
                // カラム名(配列のキー) => データベースに入る値(キーに対応する値)
                // ->の右側はFakerでダミーを生成する指示
                'user_id' => $faker->randomElement($users),
                'comment_id' => $faker->randomElement($comments),
            ]);
        }
    }
}
