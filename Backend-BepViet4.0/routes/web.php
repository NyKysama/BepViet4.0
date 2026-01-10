<?php

use Illuminate\Support\Facades\Route;
//goi model
use App\Models\Blog;

Route::get('api/blogs', function () {
return response()->json( Blog::all());
});


Route::get('/', function () {
    return view('welcome');
});

