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
        Schema::create('cookbooks', function (Blueprint $table) {

            $table->increments('cookbook_id'); // INT, PK, AUTO_INCREMENT

            $table->integer('user_id'); // Chủ sở hữu sổ tay
            $table->string('name', 100); // Tên sổ tay

            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cookbooks');
    }
};
