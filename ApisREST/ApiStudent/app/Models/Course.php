<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $primaryKey = 'course_id';

    protected $fillable = ['title_course', 'description', 'sport_id', 'cdl_coach', 'quota', 'status'];

    public function sport()
    {
        return $this->belongsTo(Sport::class, 'sport_id');
    }

    public function coach()
    {
        return $this->belongsTo(User::class, 'cdl_coach');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_student', 'course_id', 'cdl_student');
    }
}
