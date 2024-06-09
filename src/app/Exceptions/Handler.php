<?php

namespace App\Exceptions;

use App\Constants\ErrorCode;
use App\Constants\Theme;
use App\Facades\Helper;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $levels = [];

    protected $dontReport = [];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register()
    {
        $this->reportable(function (Throwable $e) {
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ValidationException) {
            return $exception->getResponse();
        }
        if ($exception instanceof AuthenticationException || $exception instanceof TokenMismatchException) {
            if ($request->expectsJson()) {
                return response()->json(['_result' => '0', '_error' => __('user.not_authorized'), '_errorCode' => ErrorCode::USER_NOT_AUTHORIZED], 200);
            }
            return redirect(Theme::LOGIN_URL);
        }
        if ($exception instanceof ModelNotFoundException) {
            if ($request->expectsJson()) {
                return response()->json(['_result' => '0', '_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND], 200);
            }
            return redirect(Theme::LOGIN_URL);
        }
        Helper::logError($exception);
        if ($request->expectsJson()) {
            if ($exception->getCode() === ErrorCode::CUSTOM_ERROR) {
                return response()->json(['_result' => '0', '_error' => $exception->getMessage(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);
            }
            return response()->json(['_result' => '0', '_error' => __('general.server_error'), '_errorCode' => ErrorCode::SERVER_ERROR], 200);
        }
        return redirect(Theme::BASE_URL);
    }
}
