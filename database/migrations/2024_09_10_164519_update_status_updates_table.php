<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('status_updates', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');  // 削除 APIからの情報だけなのでuserは存在しない お気に入りにもここは関係ない
            $table->dropColumn('official_flag');  // 削除 APIからの情報しかDBに保存しない
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('status_updates', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->after('id');
            $table->tinyInteger('official_flag')->default(1)->after('content');
        });
    }
};
