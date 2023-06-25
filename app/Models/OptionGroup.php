<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionGroup extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'poll_id',
        'type'
    ];

    public function options(){
        return $this->hasMany(Option::class,'option_group_id','id')->with(['votes']);
    }

    public function poll(){
        return $this->belongsTo(Poll::class,'poll_id','id');
    }
}
