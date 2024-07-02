<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sport extends Model
{
    use HasFactory;

    protected $primaryKey = 'sport_id';
    protected $fillable = ['name', 'description'];

    public function courses()
    {
        return $this->hasMany(Course::class, 'sport_id');
    }


}
