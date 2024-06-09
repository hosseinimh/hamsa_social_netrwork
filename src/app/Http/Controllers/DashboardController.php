<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\HashtagService;
use App\Services\KeywordService;
use App\Services\PostService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Support\Facades\Artisan;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function index(): HttpJsonResponse
    {
        $userService = new UserService();
        $postService = new PostService();
        $hashtagService = new HashtagService();
        $keywordService = new KeywordService();
        $data = [
            'usersCount' => $userService->countAll(),
            'postsCount' => $postService->countAll(),
            'hashtagsCount' => $hashtagService->countAll(),
            'keywordsCount' => $keywordService->countAll(),
        ];
        return $this->onOk($data);
    }

    public function seed(): HttpJsonResponse
    {
        Artisan::call('migrate:fresh --seed');
        return $this->onOk();
    }
}
