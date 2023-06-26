<?php

namespace App\Console\Commands;

use App\Models\Participants;
use App\Models\Poll;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class checkAndSendEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:email-notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email notification to users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // find polls due in a day
        $polls = Poll::select('id')->whereRaw('deadline_date < DATE_ADD(NOW(), INTERVAL 1 DAY)')->where('status','Live');
        $participants = Participants::with(['user','poll'])->where('has_voted',0)->whereIn('poll_id',$polls)->get();
        // make email
        foreach ($participants as $key => $participant) {
            $user = $participant->user;
            $data['name'] = $user->firstname . ' ' . $user->lastname;
            $data['poll'] = $participant->poll;
            $data['deadline'] = $participant->poll->deadline_date;
            $data['voting_link'] = route('voter_poll',['code',$participant->poll->poll_code->code]);
            Mail::send('emails.reminder',$data,function($message) use ($user){
                $message->to($user->email)->subject('Voting Reminder');
            });
        }
    }
}
