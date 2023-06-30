<?php

namespace App\Http\Middleware;

use App\Models\Poll;
use App\Models\PollCode;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPollDeadline
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->code) {
            $code = $request->code;
            $poll = Poll::whereIn('id', PollCode::select('poll_id')->where('code', $code))->first();

            if ($poll && $poll->deadline_date != '') {
                if (date('M-d-Y', strtotime($poll->deadline_date)) == date('M-d-Y')) {
                    $poll->status = 'Closed';
                    $poll->save();
                } else if (strtotime($poll->deadline_date) < time()) {
                    $poll->status = 'Closed';
                    $poll->save();
                }
            }
        }
        return $next($request);
    }
}
