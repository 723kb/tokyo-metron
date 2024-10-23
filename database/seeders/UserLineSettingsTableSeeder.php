<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserLineSetting;
use App\Models\User;
use App\Models\Line;
use Faker\Factory as Faker;

class UserLineSettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('ja_JP');
        
        // 外部キーの使用 各モデルから全ユーザーのidのみ取得→配列に変換
        $users = User::pluck('id')->toArray();  // ::はモデルクラスを指す  = そのテーブル
        $lines = Line::pluck('id')->toArray();

        // ユーザーの路線設定データを生成
        // 各ユーザーに対して各路線の設定を作成
        foreach ($users as $userId) {
            foreach ($lines as $lineId) {
                UserLineSetting::create([  // モデルを使ってレコード作成
                    // カラム名(配列のキー) => データベースに入る値(キーに対応する値)
                    'user_id' => $userId,
                    'line_id' => $lineId,
                    // ->の右側はFakerでダミーを生成する指示
                    'favorite_flag' => $faker->boolean(60),  // 60%の確率でtrue = 1
                    'notify_status_flag' => $faker->boolean(50),
                    'notify_monday' => $faker->boolean,  // 各曜日は50%の確率で1か0を生成
                    'notify_tuesday' => $faker->boolean,
                    'notify_wednesday' => $faker->boolean,
                    'notify_thursday' => $faker->boolean,
                    'notify_friday' => $faker->boolean,
                    'notify_saturday' => $faker->boolean,
                    'notify_sunday' => $faker->boolean,
                    'notify_start_time' => $faker->time('H:i:s'),
                    'notify_end_time' => $faker->time('H:i:s'),
                    'notify_fixed_time' => $faker->time('H:i:s'),
                ]);
            }
        }

    }
}
