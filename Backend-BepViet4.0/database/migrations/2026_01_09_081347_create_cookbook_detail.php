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
        Schema::create('cookbook_recipe', function (Blueprint $table) {

            $table->integer('cookbook_id');
            $table->integer('recipe_id');

            $table->timestamps();

            // Khóa chính kép
            $table->primary(['cookbook_id', 'recipe_id']);

            /*
             CHỈ MỞ FK KHI:
            - cookbooks.cookbook_id tồn tại
            - recipes.recipe_id tồn tại
            - kiểu INT giống nhau
            */

            // $table->foreign('cookbook_id')
            //       ->references('cookbook_id')
            //       ->on('cookbooks')
            //       ->onDelete('cascade');

            // $table->foreign('recipe_id')
            //       ->references('recipe_id')
            //       ->on('recipes')
            //       ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cookbook_recipe');
    }
};
