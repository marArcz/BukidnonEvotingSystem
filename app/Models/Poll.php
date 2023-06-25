<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        "deadline_date",
        "is_deleted"
    ];

    public function option_groups(){
        return $this->hasMany(OptionGroup::class,'poll_id','id')->with(['options']);
    }

    public function host(){
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function participants(){
        return $this->hasMany(Participants::class,'poll_id','id')->with(['user']);
    }

    public function poll_code(){
        return $this->hasOne(PollCode::class,'poll_id','id');
    }
}
