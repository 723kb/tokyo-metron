<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ユーザーのシーディング
        \App\Models\User::factory(10)->create();
        // 各テーブルのシーダー呼び出し
        $this->call(
            [
                LinesTableSeeder::class,
                StatusUpdatesTableSeeder::class,
                CommentsTableSeeder::class,
                LikesTableSeeder::class,
                UserLineSettingsTableSeeder::class,
                LineNotifyTokensTableSeeder::class,
            ]
        );
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
