<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PollCode extends Model
{
    use HasFactory;
    protected $fillable = [
        'poll_id',
        'code'
    ];

    public function poll(){
        return $this->belongsTo(Poll::class,'poll_id','id');
    }
}
