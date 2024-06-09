<?php

namespace App\Http\Middleware;

use App\Constants\ErrorCode;
use App\Constants\Theme;
use Closure;
use Illuminate\Http\Request;

// not logged in users

class AuthNotLoggedMiddleware
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
            if (auth()->user()) {
                auth()->logout();
                throw new \Exception(__('user.user_already_logged_in'));
            }
        } catch (\Exception $e) {
            if ($request->expectsJson()) {
                return response()->json(['_result' => '0', '_error' => $e->getMessage(), '_errorCode' => ErrorCode::USER_ALREADY_LOGGED_IN], 200);
            }
            return redirect(Theme::BASE_URL);
        }
        return $next($request);
    }
}
