<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image',
        'option_group_id',
        'description'
    ];

    public function option_group(){
        return $this->belongsTo(OptionGroup::class,'option_group_id','id');
    }
    
    public function votes(){
        return $this->hasMany(Vote::class,'option_id','id')->with(['voter']);
    }
}
