<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StatusUpdate;  // 使うモデルを追記
use App\Models\Line;
use Faker\Factory as Faker;

class StatusUpdatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $isLocalhost = in_array(request()->getHost(), ['localhost', '127.0.0.1']);

        if ($isLocalhost) {
            $this->seedLocalhost();
        } else {
            $this->seedProduction();
        }
    }

    /**
     * localhostでのシーダーデータ
     */
    private function seedLocalhost(): void
    {
        $faker = Faker::create('ja_JP');
        // 外部キーの使用 各モデルから全ユーザーのidのみ取得→配列に変換
         // ::はモデルクラスを指す  = そのテーブル
        $lines = Line::pluck('id')->toArray();

        // 様々な状況をランダムに生成
        $statuses = ['平常運転', '遅延', '運転見合わせ', '運転再開', '一部列車遅延', 'ダイヤ乱れ', '運休'];

        // 様々な状況をランダムに生成
        for ($i = 0; $i < 10; $i++) {
            StatusUpdate::create([
                'line_id' => $faker->randomElement($lines),
                'status' => $faker->randomElement($statuses),
                'content' => $faker->realText(100, 5),
            ]);
        }
    }

    /**
     * localhost以外でのシーダーデータ
     */
    private function seedProduction(): void
    {
        $statusUpdates = [
            [
                'line_id' => 1,
                'status' => '平常運転',
                'content' => '現在、平常どおり運転しています。',
            ],
            [
                'line_id' => 2,
                'status' => '一部列車遅延',
                'content' => '19時17分頃、四谷駅で信号トラブルのため、一部の列車に遅れが出ています。',
            ],
            [
                'line_id' => 4,
                'status' => 'ダイヤ乱れ',
                'content' => '7時28分頃、綾瀬駅で車両ドア点検のため、ダイヤが乱れています',
            ],
        ];

        // 配列内を回してモデルを使ってレコード作成
        foreach ($statusUpdates as $statusUpdate) {
            StatusUpdate::create($statusUpdate);
        }
    }
}