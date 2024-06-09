<?php

namespace App\Http\Middleware;

use App\Constants\ErrorCode;
use App\Constants\Role;
use Closure;
use Illuminate\Http\Request;

// 'user' type users

class AuthUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            if (!auth()->user()) {
                throw new \Exception(__('user.not_authorized'));
            }
        } catch (\Exception $e) {
            return response()->json(['_result' => '0', '_error' => $e->getMessage(), '_errorCode' => ErrorCode::USER_NOT_AUTHORIZED], 200);
        }

        return $next($request);
    }
}
