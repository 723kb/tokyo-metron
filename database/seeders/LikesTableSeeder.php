<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Like;
use App\Models\Comment;
use App\Models\User;

class LikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::pluck('id')->toArray();
        $comments = Comment::pluck('id')->toArray();
        
        for ($i = 0; $i < 50; $i++) {
            Like::updateOrCreate(  // updateOrCreateメソッド 指定の組み合わせがない時にレコード作成
                [
                    // array_rand()でランダムな要素を選択
                    'user_id' => $users[array_rand($users)],
                    'comment_id' => $comments[array_rand($comments)],
                ],
                []
            );
        }
    }
}