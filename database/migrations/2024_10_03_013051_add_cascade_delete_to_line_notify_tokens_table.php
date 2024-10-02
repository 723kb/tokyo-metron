<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * LINE Notifyトークンテーブルの外部キー制約を修正するマイグレーション
 */
return new class extends Migration
{
    /**
     * マイグレーションを実行し、LINE Notifyトークンテーブルにカスケード削除を追加する
     */
    public function up(): void
    {
        Schema::table('line_notify_tokens', function (Blueprint $table) {
            // 既存の外部キー制約を削除
            $table->dropForeign(['user_id']);

            // カスケード削除を含む新しい外部キー制約を追加
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
        Schema::table('line_notify_tokens', function (Blueprint $table) {
            // カスケード削除を含む外部キー制約を削除
            $table->dropForeign(['user_id']);

            // 元の外部キー制約を再追加
            $table->foreign('user_id')
                ->references('id')->on('users');
        });
    }
};
