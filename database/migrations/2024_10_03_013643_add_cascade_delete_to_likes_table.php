<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * いいねテーブルの外部キー制約を修正するマイグレーション
 */
return new class extends Migration
{
    /**
     * マイグレーションを実行し、いいねテーブルにカスケード削除を追加する
     */
    public function up(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * マイグレーションを元に戻し、カスケード削除を削除する
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->foreign('user_id')
                ->references('id')->on('users');
        });
    }
};
