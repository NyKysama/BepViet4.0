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
        Schema::create('recipe_ingredient', function (Blueprint $table) {

            $table->integer('recipe_id');
            $table->integer('ing_id');

            $table->float('amount'); // Số lượng
            $table->string('unit', 50); // Đơn vị

            $table->timestamps();

            // Khóa chính kép
            $table->primary(['recipe_id', 'ing_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipe_ingredient');
    }
};
