<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * いいねテーブルの外部キー制約を変更するマイグレーション
 * 
 * likesテーブルのcomment_idカラムの外部キー制約を
 * カスケード削除に変更。これにより、
 * commentsテーブルのレコードが削除された際に、
 * 関連するいいねも自動的に削除されるようになる。
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            // 既存の外部キー制約を削除
            $table->dropForeign(['comment_id']);

            // カスケード削除を含む新しい外部キー制約を追加
            $table->foreign('comment_id')
                ->references('id')->on('comments')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('likes', function (Blueprint $table) {
            $table->dropForeign(['comment_id']);
            $table->foreign('comment_id')
                ->references('id')->on('comments');
        });
    }
};
