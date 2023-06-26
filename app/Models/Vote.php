<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    protected $fillable = [
        'participant_id',
        'option_id',
        'poll_id',
        'is_submitted'
    ];

    public function option(){
        return $this->belongsTo(Option::class,'option_id','id')->with(['option_group']);
    }

    public function participant(){
        return $this->belongsTo(Participants::class,'participant_id','id')->with(['user']);
    }
}
