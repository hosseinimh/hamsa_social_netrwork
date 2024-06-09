<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ErrorController;
use App\Http\Controllers\HashtagController;
use App\Http\Controllers\KeywordController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Resources\Error\ErrorResource;
use App\Http\Resources\Hashtag\HashtagResource;
use App\Http\Resources\Keyword\KeywordResource;
use App\Http\Resources\Post\PostResource;
use App\Http\Resources\User\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Services\ErrorService;
use App\Services\HashtagService;
use App\Services\KeywordService;
use App\Services\PostService;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function () {
            return new Helper();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(ErrorController::class, function ($app) {
            return new ErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(PostController::class, function ($app) {
            return new PostController(new JsonResponse(PostResource::class), $app->make(PostService::class));
        });

        $this->app->bind(HashtagController::class, function ($app) {
            return new HashtagController(new JsonResponse(HashtagResource::class), $app->make(HashtagService::class));
        });

        $this->app->bind(KeywordController::class, function ($app) {
            return new KeywordController(new JsonResponse(KeywordResource::class), $app->make(KeywordService::class));
        });
    }
}
