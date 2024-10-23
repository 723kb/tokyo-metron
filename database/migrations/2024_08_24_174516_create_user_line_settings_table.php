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
        Schema::create('user_line_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();  // 外部キー
            $table->foreignId('line_id')->constrained();  // 外部キー
            $table->tinyInteger('favorite_flag') ->default(0);
            $table->tinyInteger('notify_status_flag') ->default(0);
            $table->tinyInteger('notify_monday')->default(0);
            $table->tinyInteger('notify_tuesday')->default(0);
            $table->tinyInteger('notify_wednesday')->default(0);
            $table->tinyInteger('notify_thursday')->default(0);
            $table->tinyInteger('notify_friday')->default(0);
            $table->tinyInteger('notify_saturday')->default(0);
            $table->tinyInteger('notify_sunday')->default(0);
            $table->time('notify_start_time') -> nullable();
            $table->time('notify_end_time') -> nullable();
            $table->time('notify_fixed_time') -> nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_line_settings');
    }
};
