<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\IndexPostsRequest;
use App\Http\Resources\Post\PostResource;
use App\Http\Resources\Post\PostResourceV1;
use App\Http\Resources\Post\PostResourceV2;
use App\Http\Resources\User\UserResource;
use App\Models\Post as Model;
use App\Models\User;
use App\Packages\JsonResponse;
use App\Services\PostService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class PostController extends Controller
{
    public function __construct(JsonResponse $response, public PostService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexPostsRequest $request, User $user): HttpJsonResponse
    {
        $userResource = new UserResource($user);
        $items = $this->service->getPaginateWithHashtags($user, $request->_pn, $request->_pi);
        $count = count($items) > 0 ? $items[0]->items_count : 0;
        $items = PostResource::collection($items);
        return $this->onOk(['items' => $items, 'user' => $userResource, 'count' => $count]);
    }

    public function highlightedPostsV1(IndexPostsRequest $request): HttpJsonResponse
    {
        $items = $this->service->getHighlightedPostsV1($request->_pn, $request->_pi);
        $count = count($items) > 0 ? $items[0]->items_count : 0;
        $items = PostResourceV1::collection($items);
        return $this->onOk(['items' => $items, 'count' => $count]);
    }

    public function highlightedPostsV2(IndexPostsRequest $request): HttpJsonResponse
    {
        $items = $this->service->getHighlightedPostsV2($request->_pn, $request->_pi);
        $count = count($items) > 0 ? $items[0]->items_count : 0;
        $items = PostResourceV2::collection($items);
        return $this->onOk(['items' => $items, 'count' => $count]);
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
