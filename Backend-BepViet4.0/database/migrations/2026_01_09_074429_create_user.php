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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // INT, PK, AUTO_INCREMENT

            $table->string('name', 50); // Tên hiển thị
            $table->string('username', 100)->unique(); // Tên đăng nhập
            $table->string('password', 255); // Mật khẩu (hash)

            $table->date('ngaysinh')->nullable(); // Ngày sinh
            $table->enum('gioitinh', ['Nam', 'Nữ', 'Khác'])->nullable(); // Giới tính

            $table->string('sdt', 15)->nullable(); // Số điện thoại
            $table->string('gmail', 100)->unique(); // Email

            $table->enum('role', ['admin', 'user'])->default('user'); // Phân quyền
            $table->tinyInteger('status')->default(1); // 1: hoạt động, 0: khóa

            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
