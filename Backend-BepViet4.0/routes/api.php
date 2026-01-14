<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//khai bao model
use App\Models\User;
//khai bao controller
use App\Http\Controllers\LoginController;


Route::get('/user', function () {
    return response()->json(User::all());
});//->middleware('auth:sanctum');
Route::post('/login-user',[LoginController::class,'loginUser'])->name("login-user");
