<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CookbookController;

Route::get('/user', function (Request $request) {
    return $request->user();
});//->middleware('auth:sanctum');
Route::post('/register',[UserController::class,'register'])->name("register");
Route::post('/login-user',[LoginController::class,'loginUser'])->name("login-user");
//user
Route::get("user/{username}",[UserController::class,"getUserByUsername"])->name("user.username");
Route::post("/update-user",[UserController::class,"updateUserByUsername"])->name("user.update");    
//posts
Route::get("/posts",[PostController::class,"getPosts"])->name("posts");
//create_blog
Route::post('/user/blog', [PostController::class, 'createBlog']);


Route::prefix('admin')->group(function () {
    //post
    Route::get('/posts', [PostController::class, 'getAllPosts']);
    Route::get('/pendingposts', [PostController::class, 'pendingPost']);
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::post('/posts/{id}/status', [PostController::class, 'updateStatus']);
    Route::get('/update-blog/{id}', [PostController::class, 'editBlog']);
    Route::put('/update-blog/{id}', [PostController::class, 'update'])->name("update-blog");
    Route::delete('/delete-post/{id}', [PostController::class, 'destroy']);
    //category
    Route::post('create-category', [CategoryController::class, 'createCategory']);
    Route::get('update-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update'])->name('update-category');
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    //ingredient
    Route::post('create-ingredient', [IngredientController::class, 'createIng']);
    Route::get('update-ingredient/{id}', [IngredientController::class, 'edit']);
    Route::put('update-ingredient/{id}', [IngredientController::class, 'update'])->name('update-ingredient');
    Route::delete('delete-ingredient/{id}', [IngredientController::class, 'destroy']);
});
Route::get('/category', [CategoryController::class, 'getCategory']);
Route::get('/ingredient', [IngredientController::class, 'getIng']);
Route::get('/recipe-detail/{id}', [PostController::class, 'recipeDetail']);
Route::get('/blog-detail/{id}', [PostController::class, 'blogDetail']);
//comment
Route::get('/post/comments/{id}', [CommentController::class, 'getCommentByPost']);
Route::post('/post/create-comments/{post}/{id?}', [CommentController::class, 'create']);
//cookbook
Route::post("/coobook/create",[CookbookController::class,"createCookbook"])->name("cookbook.create");



