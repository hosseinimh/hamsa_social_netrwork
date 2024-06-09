<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Keyword\IndexKeywordsRequest;
use App\Models\Keyword as Model;
use App\Packages\JsonResponse;
use App\Services\KeywordService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class KeywordController extends Controller
{
    public function __construct(JsonResponse $response, public KeywordService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexKeywordsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->keyword, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
