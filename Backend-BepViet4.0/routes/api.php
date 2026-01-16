<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
});//->middleware('auth:sanctum');
Route::post('/register',[UserController::class,'register'])->name("register");
Route::post('/login-user',[LoginController::class,'loginUser'])->name("login-user");
//user
Route::get("user/{username}",[UserController::class,"getUserByUsername"])->name("user.username");
//posts
Route::get("/posts",[PostController::class,"getPosts"])->name("posts");

Route::prefix('admin')->group(function () {
    Route::get('/posts', [PostController::class, 'getAllPosts']);
    Route::get('/pendingposts', [PostController::class, 'pendingPost']);
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::post('/posts/{id}/status', [PostController::class, 'updateStatus']);
    Route::get('/update-blog/{id}', [PostController::class, 'editBlog']);
    Route::put('/update-blog/{id}', [PostController::class, 'update'])->name("update-blog");
    Route::delete('/delete-post/{id}', [PostController::class, 'destroy']);
});
Route::get('/category', [CategoryController::class, 'getCategory']);
Route::get('/recipe-detail/{id}', [PostController::class, 'recipeDetail']);
Route::get('/blog-detail/{id}', [PostController::class, 'blogDetail']);


