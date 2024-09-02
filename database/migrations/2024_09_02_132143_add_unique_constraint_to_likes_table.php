<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void  // upメソッド マイグレーション実行時に呼び出し
    {  // 既存の 'likes' テーブルを変更
        Schema::table('likes', function (Blueprint $table) {
            // user_idとcomment_idの組み合わせペアが重複しないようにする テーブルにこの項目を追加
            $table->unique(['user_id', 'comment_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void  // downメソッド マイグレーションをロールバック時に呼び出し
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'comment_id']);  // ロールバック時に制約を削除→元に戻せる
        });
    }
};
