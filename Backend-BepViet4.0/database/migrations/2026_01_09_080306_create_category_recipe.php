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
        Schema::create('category_recipe', function (Blueprint $table) {

            $table->integer('category_id');
            $table->integer('recipe_id');

            $table->timestamps();

            // Khóa chính kép
            $table->primary(['category_id', 'recipe_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_recipe');
    }
};
