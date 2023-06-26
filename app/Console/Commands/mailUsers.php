<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class mailUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:sendmail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send a test mail to users';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userMails = User::select('email')->get();
        $emails = [];

        foreach ($userMails as $key => $mail) {
            $emails[] = $mail['email'];
        }
        Mail::send('emails.test',[],function($message) use ($emails){
            $message->to($emails)->subject("test cron job");
        });
    }
}
