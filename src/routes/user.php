<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\HashtagController;
use App\Http\Controllers\KeywordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// all users
Route::middleware(['cors'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);
    Route::post('dashboard/seed', [DashboardController::class, 'seed']);

    Route::post('errors', [ErrorController::class, 'index']);
    Route::post('errors/store', [ErrorController::class, 'store']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'show']);
    Route::post('users/store', [UserController::class, 'store']);
    Route::post('users/update/{model}', [UserController::class, 'update']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('posts/v1', [PostController::class, 'highlightedPostsV1']);
    Route::post('posts/v2', [PostController::class, 'highlightedPostsV2']);
    Route::post('posts/{user}', [PostController::class, 'index']);

    Route::post('hashtags/{post}', [HashtagController::class, 'index']);

    Route::post('keywords', [KeywordController::class, 'index']);
});
