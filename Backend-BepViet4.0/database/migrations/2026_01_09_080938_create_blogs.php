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
        Schema::create('blogs', function (Blueprint $table) {

            $table->increments('blog_id'); // INT, PK, AUTO_INCREMENT

            $table->integer('user_id'); // Người viết blog

            $table->string('title', 255); // Tiêu đề
            $table->longText('content'); // Nội dung (HTML / JSON)
            $table->string('img', 255)->nullable(); // Ảnh đại diện

            $table->tinyInteger('status')->default(1); // 1: hiển thị, 0: ẩn

            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
