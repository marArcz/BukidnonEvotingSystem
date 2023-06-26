<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participants extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'poll_id',
        'has_voted'
    ];
    
    public function user(){
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function poll(){
        return $this->belongsTo(Poll::class,'poll_id','id')->with(['poll_code']);
    }

    public function votes(){
        return $this->hasMany(Vote::class,'participant_id','id');
    }
}
