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
        Schema::create('status_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();  // 外部キー
            $table->foreignId('line_id')->constrained();  // 外部キー
            $table->string('status', 50);  // 50文字
            $table->string('content'); 
            $table->tinyInteger('official_flag')->default(1);  // 基本はAPIから取得した公式投稿のためデフォルト値1
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_updates');
    }
};
