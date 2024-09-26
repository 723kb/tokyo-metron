<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * コメントテーブルの外部キー制約を変更するマイグレーション
 * 
 * commentsテーブルのstatus_update_idカラムの
 * 外部キー制約をカスケード削除に変更。これにより、
 * status_updatesテーブルのレコードが削除された際に、
 * 関連するコメントも自動的に削除されるようになる。
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // 既存の外部キー制約を削除
            $table->dropForeign(['status_update_id']);
            
            // カスケード削除を含む新しい外部キー制約を追加
            $table->foreign('status_update_id')
                ->references('id')->on('status_updates')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['status_update_id']);
            $table->foreign('status_update_id')
                ->references('id')->on('status_updates');
        });
    }
};
