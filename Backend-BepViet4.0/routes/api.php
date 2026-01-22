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
use App\Http\Controllers\RatingController;

Route::get('/users', function (Request $request) {
    return response()->json(["message"=>"Lấy danh sách người dùng thành công",
    "users"=>User::all(),
    ],200);
});//->middleware('auth:sanctum');
Route::post('/register',[UserController::class,'register'])->name("register");
Route::post('/login-user',[LoginController::class,'loginUser'])->name("login-user");
//user
Route::get("user/{username}",[UserController::class,"getUserByUsername"])->name("user.username");
Route::post("/update-user",[UserController::class,"updateUserByUsername"])->name("user.update"); 
Route::get("/admin/user/{id}",[UserController::class,"getUserByUser_id"])->name("user.user_id");   
Route::post("/unfollow",[UserController::class,"unfollow"])->name("user.unfollow");
Route::post("/follow",[UserController::class,"follow"])->name("user.follow");
Route::post("user/update-avatar",[UserController::class,"updateAvatar"])->name("user.update-avatar");
Route::post("/user/block",[UserController::class,"block"])->name("user.block");
//posts
Route::get("/posts",[PostController::class,"getPosts"])->name("posts");
Route::post("/post/serch",[PostController::class,"search"])->name("post.search");
Route::post('/post/filter', [PostController::class, 'filter']);
//create_blog 18/01/2026
Route::post('/user/blog', [PostController::class, 'createBlog']);
//tao cong thuc moi nma ko biet de o dau
Route::post('/create-recipe',[PostController::class,'createRecipe']);
//create_blog khi có token ko biết đúng ko để đây trước 18/01/2026
// Route::middleware('auth:sanctum')->post('/user/blog',[PostController::class, 'createBlog']);
Route::post('/rating', [RatingController::class, 'postRating']);//rating 19/01/2026
Route::get('/post/rating/{post_id}',[RatingController::class,'getPostRating']);//20/01/2026

Route::prefix('admin')->group(function () {
    //post
    Route::get('/posts', [PostController::class, 'getAllPosts']);
    Route::get('/pendingposts', [PostController::class, 'pendingPost']);
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::post('/posts/{id}/status', [PostController::class, 'updateStatus']);
    Route::get('/update-blog/{id}', [PostController::class, 'editBlog']);
    Route::put('/update-blog/{id}', [PostController::class, 'update'])->name("update-blog");
    Route::delete('/delete-post/{id}', [PostController::class, 'destroy']);
    Route::delete('/forcedestroy-post/{id}', [PostController::class, 'forceDestroy']);
    
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
Route::get('/cmt-count/{id}', [CommentController::class, 'cmtCount']);
//cookbook
Route::post("/coobook/create",[CookbookController::class,"createCookbook"])->name("cookbook.create");
Route::post("/cookbook/delete/{cookbook_id}",[CookbookController::class,"delete"])->name("cookbook.delete");
Route::get("/cookbook/{username}/{name}",[CookbookController::class,"getCookbookDetail"])->name("cookbook.cookbook_detail");
Route::post("/cookbook/{cookbook_id}/detatch/{post_id}",[CookbookController::class,"detachCoobook_Post"])->name("cookbook.detatch.post");
Route::post("/coobook/update/{cookbook_id}",[CookbookController::class,"updateCookbook"])->name("cookbook.update");
//post
Route::get('news-feeds/{page?}/{seed?}', [PostController::class, 'getNewsFeeds']);


