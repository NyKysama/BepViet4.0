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
        Schema::create('likes', function (Blueprint $table) {

            $table->integer('user_id'); // Người nhấn thích

            $table->integer('blog_id')->nullable();   // Like blog
            $table->integer('recipe_id')->nullable(); // Like công thức

            $table->timestamps();

            // Tránh like trùng
            $table->unique(['user_id', 'blog_id']);
            $table->unique(['user_id', 'recipe_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
