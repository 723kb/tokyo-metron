<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusUpdate;  // 使うモデルを追記
use App\Models\User;
use App\Models\Line;
use Faker\Factory as Faker;

class StatusUpdatesTableSeeder extends Seeder
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
        
        // 様々な状況をランダムに生成
        $statuses = ['平常運転', '遅延', '運転見合わせ', '運転再開', '一部列車遅延', 'ダイヤ乱れ', '運休'];
        
        $statusUpdates = [
            [
                'user_id' => 1, 
                'line_id' => 1,
                'status' => '平常運転',
                'content' => '現在、平常どおり運転しています。',
                'official_flag' => 1,
            ],
            [
                'user_id' => 1,
                'line_id' => 2,
                'status' => '一部列車遅延',
                'content' => '19時17分頃、四谷駅で信号トラブルのため、一部の列車に遅れが出ています。',
                'official_flag' => 1,
            ],
            [
                'user_id' => 1,
                'line_id' => 4,
                'status' => 'ダイヤ乱れ',
                'content' => '7時28分頃、綾瀬駅で車両ドア点検のため、ダイヤが乱れています',
                'official_flag' => 1,
            ],
        ];

        // ランダムなデータを生成
        for ($i = 0; $i < 10; $i++) {
            $statusUpdates[] = [
                // カラム名(配列のキー) => データベースに入る値(キーに対応する値)
                // ->の右側はFakerでダミーを生成する指示
                'user_id' => $faker->randomElement($users),
                'line_id' => $faker->randomElement($lines),
                'status' => $faker->randomElement($statuses),
                'content' => $faker->realText(100, 5),  // 日本語のテキストを生成 
                'official_flag' => $faker->boolean(70) ? 1 : 0,  // 70%の確率でフラグ1
            ];
        }

        // 配列内を回してモデルを使ってレコード作成
        foreach ($statusUpdates as $statusUpdate) {
            StatusUpdate::create($statusUpdate);
        }
    }
}
