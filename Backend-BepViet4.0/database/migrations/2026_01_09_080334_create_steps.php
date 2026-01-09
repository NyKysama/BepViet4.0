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
        Schema::create('steps', function (Blueprint $table) {

            $table->increments('step_id'); // INT, AUTO_INCREMENT

            $table->integer('recipe_id'); // ID món ăn
            $table->integer('steps'); // Thứ tự bước

            $table->text('content'); // Nội dung hướng dẫn
            $table->string('img', 255)->nullable(); // Ảnh minh họa

            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('steps');
    }
};
