<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Line;

class LinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lines = [
            ['name' => '銀座線', 'color_code' => '#FF9500'],
            ['name' => '丸ノ内線', 'color_code' => '#F62E36'],
            ['name' => '日比谷線', 'color_code' => '#B5B5AC'],
            ['name' => '千代田線', 'color_code' => '#00BB85'],
            ['name' => '半蔵門線', 'color_code' => '#8F76D6'],
            ['name' => '南北線', 'color_code' => '#00AC9B'],
            ['name' => '東西線', 'color_code' => '#009BBF'],
            ['name' => '有楽町線', 'color_code' => '#C1A470'],
            ['name' => '副都心線', 'color_code' => '#9C5E31'],
        ];
        foreach ($lines as $line) {
            Line::create($line);
        }
    }
}
