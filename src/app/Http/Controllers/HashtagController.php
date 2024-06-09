<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Hashtag\IndexHashtagsRequest;
use App\Models\Hashtag as Model;
use App\Models\Post;
use App\Packages\JsonResponse;
use App\Services\HashtagService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class HashtagController extends Controller
{
    public function __construct(JsonResponse $response, public HashtagService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexHashtagsRequest $request, Post $post): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($post, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
