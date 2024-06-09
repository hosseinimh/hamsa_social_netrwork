<?php

namespace App\Http\Middleware;

use App\Constants\Theme;
use Closure;
use Illuminate\Http\Request;

class SetPagination
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
        // page number
        $request->merge(['_pn' => ($pn = intval($request->_pn)) > 0 ? $pn : 1]);

        // items per page
        $request->merge(['_pi' => ($pi = intval($request->_pi)) > 0 && $pi % 10 === 0 ? $pi : Theme::ITEMS_PER_PAGE]);

        return $next($request);
    }
}
