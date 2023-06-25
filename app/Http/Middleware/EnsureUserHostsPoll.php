<?php

namespace App\Http\Middleware;

use App\Models\Poll;
use App\Models\PollCode;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHostsPoll
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $user = $request->user();
        $code = $request->code;
        $poll = Poll::with(['poll_code', 'participants', 'option_groups'])->whereIn('id', PollCode::select('poll_id')->where('code', $code))->firstOrFail();

        if ($user->id != $poll->user_id) {
            return redirect()->intended(route('error', ['status' => 401]));
        }
        return $next($request);
    }
}
