<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\ErrorService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class ErrorController extends Controller
{
    public function __construct(JsonResponse $response, public ErrorService $service)
    {
        parent::__construct($response);
    }

    public function index(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi));
    }

    public function store(Request $request): HttpJsonResponse
    {
        $error = $request->error ?? '';
        $errorInfo = $request->error_info ?? '';
        $message = $error . '
' . $errorInfo;

        return $this->onStore($this->service->store($message));
    }
}
