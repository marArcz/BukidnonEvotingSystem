<?php

namespace App\Http\Controllers;

use App\Models\Participants;
use App\Models\Poll;
use App\Models\PollCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    //
    public function index(Request $request){
        if($request->user()){
            return redirect()->intended(route('dashboard'));
        }
        return Inertia::render('Home');
    }
    public function about(){
        return Inertia::render('About');
    }
    public function contact(){
        return Inertia::render('Contact');
    }
    public function dashboard(Request $request){
        $user = $request->user();
        $polls = Poll::select('id')->whereIn('id',Participants::select('poll_id')->where('user_id',$user->id))->orWhere('user_id',$user->id);

        $data['polls'] = Poll::with(['option_groups','participants','poll_code'])->whereIn('id',$polls)->where('is_deleted',false)->orderByDesc('id')->get();
        $data['session'] = [
            'success' => session('success'),
            'error' => session('error'),
        ];
        return Inertia::render('Dashboard',$data);
    }

    public function create_poll(){
        return Inertia::render('CreatePoll');
    }
    public function new_poll(){
        return Inertia::render('NewPoll');
    }

    public function poll(Request $request){
        $poll_id = $request->id;
        $data['poll'] = Poll::find($poll_id);

        if($data['poll']){
            return Inertia::render('Poll',$data);
        }else{
            return redirect()->intended('dashboard');
        }
    }


    public function error(Request $request){
        $data['status'] = $request->status;
        return Inertia::render('ErrorPage',$data);
    }

    public function profile(Request $request){
        $user = $request->user();
        //
    $polls_created = Poll::where('user_id',$user->id)->where('is_deleted',false)->count();
        $polls_joined = Participants::where('user_id',$user->id)->count();

        $data['profile'] = [
            'polls_created' => $polls_created,
            'polls_joined' => $polls_joined,
        ];

        $data['session'] = [
            'success'=>session('success'),
            'error'=>session('error'),
        ];
        return Inertia::render('Profile',$data);
    }

}
