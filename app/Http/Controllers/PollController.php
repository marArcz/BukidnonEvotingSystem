<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\OptionGroup;
use App\Models\Participants;
use App\Models\Poll;
use App\Models\PollCode;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PollController extends Controller
{
    //
    public function store(Request $request)
    {
        $user_id = $request->user_id;
        $title = $request->title;
        $description = $request->has('description') ? $request->description : '';
        $status = 'Live';

        $newPoll = Poll::create([
            'user_id' => $user_id,
            'title' => $title,
            'description' => $description,
            'status' => $status,
            'deadline_date' => $request->deadline
        ]);
        if ($newPoll) {
            // make poll share code
            $code = Str::random(6);
            $poll_code = PollCode::create([
                'poll_id' => $newPoll->id,
                'code' => $code
            ]);

            return response()->json(['poll' => $newPoll]);
        }
        return response()->json(status: 500);
    }

    public function uploadImage(Request $request)
    {
        $image = $request->file('image');
        $imageName = $image->getClientOriginalName();
        $image->move(public_path('images'), $imageName);
        $imageUrl = "/images/" .  $imageName;

        return response()->json(['imageUrl' => $imageUrl]);
    }

    public function addOptions(Request $request)
    {
        $poll_id = $request->poll_id;
        $group_title = $request->group_title;
        $group_type = $request->group_type;
        $option_names = $request->option_names;
        $option_descriptions = $request->option_descriptions;
        $option_images = $request->option_images;

        $new_group = OptionGroup::create([
            'poll_id' => $poll_id,
            "title" => $group_title,
            'type' => $group_type
        ]);

        // save options
        for ($x = 0; $x < count($option_names); $x++) {
            $new_option = Option::create([
                'option_group_id' => $new_group->id,
                'name' => $option_names[$x] ? $option_names[$x] : '',
                'description' => $option_descriptions[$x] ? $option_descriptions[$x] : '',
                'image' => $option_images[$x] ? $option_images[$x] : '',
            ]);
        }

        return response()->json(['success' => true]);
    }


    public function manage(Request $request)
    {
        $poll_id = $request->id;
        $data['poll'] = Poll::with(['poll_code', 'option_groups'])->where('id', $poll_id)->where('is_deleted', false)->first();
        if ($data['poll']) {
            return Inertia::render('Poll', $data);
        } else {
            return redirect()->intended(route('error', ['status' => 404]));
        }
    }
    public function voter(Request $request)
    {
        $code = $request->code;
        $poll_code = PollCode::where('code', $code)->first();

        if (!$poll_code) {
            return redirect()->intended(route('poll-not-found'));
        }
        // find poll
        $data['poll'] = Poll::with(['poll_code', 'option_groups'])->where('id', $poll_code->poll_id)->where('is_deleted', false)->first();

        if ($request->user()) {
            $user = $request->user();
            // get if user already joined the poll
            $data['participant'] = Participants::where('user_id', $user['id'])->where('poll_id', $data['poll']->id)->first();
        } else {
            $data['participant'] = null;
        }

        if ($data['poll']) {
            $data['session'] = [
                'success' => session('success'),
                'error' => session('error')
            ];
            return Inertia::render('Voters/Poll', $data);
        } else {
            return redirect()->intended(route('poll-not-found'));
        }
    }

    public function notFound()
    {
        return Inertia::render('PollNotFound');
    }

    public function voting(Request $request)
    {
        // get user
        $user = $request->user();
        $code = $request->code;

        $poll_code = PollCode::with(['poll'])->where('code', $code)->first();

        if (!$poll_code) {
            return redirect()->intended(route('poll-not-found'));
        }

        // check if participants
        $get_participant = Participants::where('user_id', $user['id'])->where('poll_id', $poll_code->poll_id)->get();
        if (count($get_participant) == 0) {
            return redirect()->intended(route('voter_poll'));
        }

        $data['poll'] = Poll::with(['option_groups', 'poll_code'])->where('id', $poll_code->poll_id)->firstOrFail();

        return Inertia::render('Voters/Voting', $data);
    }

    public function join(Request $request)
    {
        $user = $request->user();
        $code = $request->code;

        $participant = Participants::where('user_id', $user->id)->whereIn('poll_id', PollCode::select('poll_id')->where('code', $code))->first();

        if (!$participant) {
            $poll_code = PollCode::with(['poll'])->where('code', $code)->first();

            if (!$poll_code) {
                return redirect()->intended(route('poll-not-found'));
            }

            $participant = Participants::create([
                'user_id' => $user->id,
                'poll_id' => $poll_code->poll->id
            ]);
        }


        return redirect()->intended(route('voter_poll', ['code' => $code]))->with('success', 'You can now participate in this poll.');
    }

    public function apiJoinPoll(Request $request)
    {
        $user_id = $request->user_id;
        $code = $request->code;

        $poll_code = PollCode::with(['poll'])->where('code', $code)->first();

        if (!$poll_code) {
            return response()->json(['poll_code' => $poll_code, 'message' => "You entered an invalid code"], 404);
        }

        $participant = Participants::create([
            'user_id' => $user_id,
            'poll_id' => $poll_code->poll->id
        ]);


        return response()->json(['success' => true]);
    }

    public function statistics(Request $request)
    {
        $code = $request->code;
        $poll_code = PollCode::where('code', $code)->first();

        if (!$poll_code) {
            return redirect()->intended(route('poll-not-found'));
        }
        // find poll
        $data['poll'] = Poll::with(['poll_code', 'option_groups', 'participants'])->where('id', $poll_code->poll_id)->first();
        // get votes
        $data['votes'] = Vote::with(['option'])->where('poll_id', $data['poll']->id)->get();

        if ($data['poll']) {
            return Inertia::render('Statistics', $data);
        } else {
            return redirect()->intended(route('poll-not-found'));
        }
    }

    public function myVote(Request $request)
    {
        $user = $request->user();
        $code = $request->code;
        $poll_code = PollCode::where('code', $code)->first();

        if (!$poll_code) {
            return redirect()->intended(route('poll-not-found'));
        }
        // find poll
        $data['poll'] = Poll::with(['poll_code', 'option_groups', 'participants'])->where('id', $poll_code->poll_id)->first();
        // get votes
        $data['votes'] = Vote::with(['option'])->where('poll_id', $data['poll']->id)->whereIn('participant_id', Participants::select('id')->where('user_id',$user->id))->get();

        if ($data['poll']) {
            return Inertia::render('MyVote', $data);
        } else {
            return redirect()->intended(route('poll-not-found'));
        }
    }
    public function edit(Request $request)
    {
        $user = $request->user();
        $code = $request->code;
        $poll_code = PollCode::where('code', $code)->first();

        if (!$poll_code) {
            return redirect()->intended(route('poll-not-found'));
        }
        // find poll
        $data['poll'] = Poll::with(['poll_code', 'option_groups'])->where('id', $poll_code->poll_id)->first();

        if ($data['poll']) {
            return Inertia::render('EditPoll', $data);
        } else {
            return redirect()->intended(route('poll-not-found'));
        }
    }

    public function save(Request $request)
    {
        $poll_id = $request->poll_id;
        $title = $request->title;
        $description = $request->description;

        $poll = Poll::find($poll_id);
        $poll->title = $title;
        $poll->description = $description;
        if ($poll->save()) {
            return response()->json(['success' => true, 'poll' => $poll]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    public function savePollOptions(Request $request)
    {

        $group_id = $request->group_id;
        $group_title = $request->group_title;
        $group_type = $request->group_type;
        $option_ids = $request->option_ids;
        $option_names = $request->option_names;
        $option_images = $request->option_images;
        $option_descriptions = $request->option_descriptions;

        $group = OptionGroup::find($group_id);
        $group->title = $group_title;
        $group->type = $group_type;

        $group->save();

        foreach ($option_ids as $key => $option_id) {
            $option = Option::find($option_id);
            $option->name = $option_names[$key];
            $option->image = $option_images[$key];
            $option->description = $option_descriptions[$key];

            $option->save();
        }

        if ($request->has("removed_groups")) {
            $removed_groups = $request->removed_groups;
            foreach ($removed_groups as $key => $id) {
                OptionGroup::where('id', $id)->delete();
            }
        }


        return response()->json(['success', true]);
    }

    public function manageVoters(Request $request)
    {
        $code = $request->code;
        $poll = Poll::with(['poll_code', 'participants', 'option_groups'])->whereIn('id', PollCode::select('poll_id')->where('code', $code))->firstOrFail();

        return Inertia::render('Voters', ['poll' => $poll]);
    }

    public function endPoll(Request $request)
    {
        $poll = Poll::find($request->id);
        $poll->status = "Closed";

        $poll->save();

        return redirect()->back()->with('success', 'Successfully updated!');
    }

    public function result(Request $request)
    {
        $code = $request->code;
        $poll_code = PollCode::where('code', $code)->first();

        if (!$poll_code) {
            return redirect()->intended(route('poll-not-found'));
        }
        // find poll
        $data['poll'] = Poll::with(['poll_code', 'option_groups', 'participants'])->where('id', $poll_code->poll_id)->first();
        // get votes
        $data['votes'] = Vote::with(['option'])->where('poll_id', $data['poll']->id)->get();

        if ($data['poll']) {
            return Inertia::render('Result', $data);
        } else {
            return redirect()->intended(route('poll-not-found'));
        }
    }

    public function delete(Request $request)
    {
        $code = $request->code;
        $poll = Poll::whereIn('id', PollCode::select('id')->where('code', $code))->first();
        $poll->is_deleted = true;
        $poll->save();

        return redirect()->back()->with('success', 'Successfully deleted poll!');
    }
}
