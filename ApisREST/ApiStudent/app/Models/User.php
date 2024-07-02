<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'cdl_user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'cdl_user',
        'name',
        'lastname',
        'gender',
        'age',
        'email',
        'password',
        'status'
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getAuthIdentifierName()
    {
        return 'cdl_user';
    }

    public function getSessionDetails()
    {
        return [
            'cdl_user' => $this->cdl_user,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->getRoleNames()->first(),
        ];
    }

    //Relacion de estudiantes
    public function coursesStudent()
    {
        return $this->belongsToMany(Course::class, 'course_student', 'cdl_student', 'course_id')->withPivot('score_course');
    }

    //Relacion de entrenadores
    public function coursesCoach()
    {
        return $this->hasMany(Course::class, 'cdl_coach');
    }

    public function coach()
    {
        return $this->hasRole('Entrenador');
    }
}
