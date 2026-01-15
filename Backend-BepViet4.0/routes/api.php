<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
});//->middleware('auth:sanctum');
Route::post('/register',[UserController::class,'register'])->name("register");
Route::post('/login-user',[LoginController::class,'loginUser'])->name("login-user");
//posts
Route::get("/posts",[PostController::class,"getPosts"])->name("posts");

Route::prefix('admin')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::post('/posts/{id}/status', [PostController::class, 'updateStatus']);
});
