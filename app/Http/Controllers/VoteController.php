<?php

namespace App\Http\Controllers;

use App\Models\Participants;
use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    //

    public function store(Request $request)
    {
        $user_id = $request->user_id;
        $option_ids = $request->option_ids;
        $poll_id = $request->poll_id;

        $participant_id = Participants::select('id')->where('user_id',$user_id)->where('poll_id',$poll_id)->first()['id'];

        foreach ($option_ids as $key => $option_id) {
            Vote::create([
                'poll_id' => $poll_id,
                'participant_id' => $participant_id,
                'option_id' => $option_id,
                'is_submitted' => true
            ]);
        }

        Participants::where('user_id', $user_id)->update(['has_voted' => 1]);

        return response()->json(['success' => true]);
    }
}
