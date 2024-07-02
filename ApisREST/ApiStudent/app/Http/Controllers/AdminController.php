<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function userDisable($user)
    {
        try{
            $user = User::find($user);
            $user->status = !$user->status;
            $user->save();
            return response()->json(['success'=>true, 'message'=>'Usuario deshabilitado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function students(string $search = null)
    {
        try{
            $students = User::with('coursesStudent')->role('Estudiante')
            ->when($search, function($query) use ($search){
                return $query->where('name','like','%'.$search.'%');
            })
            ->get();
            return response()->json(['success'=>true, 'students'=>$students]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function courses(string $search = null)
    {
        try{
            $courses = Course::with(['students','coach'])
            ->when($search, function($query) use ($search){
                return $query->where('title_course','like','%'.$search.'%');
            })
            ->get();
            return response()->json(['success'=>true, 'courses'=>$courses]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function coachs(string $search = null)
    {
        try{
            $coachs = User::with('coursesCoach')->role('Entrenador')
            ->when($search, function($query) use ($search){
                return $query->where('name','like','%'.$search.'%');
            })
            ->get();
            return response()->json(['success'=>true, 'coachs'=>$coachs]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }
}
