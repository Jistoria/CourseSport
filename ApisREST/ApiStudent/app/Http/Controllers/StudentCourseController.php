<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class StudentCourseController extends Controller
{
    public function index()
    {
        try{
            $courses = Course::with('sport','coach')->where('status',1)->get();
            return response()->json(['success'=>true, 'courses'=>$courses]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }
    public function yourCourse()
    {
        $courses = auth()->user()->coursesStudent()->with('sport','coach')->get();
        return response()->json(['success'=>true, 'courses'=>$courses]);
    }

    public function courseRegister($course)
    {
        try{
            $user = auth()->user();
            $user->coursesStudent()->attach($course);
            return response()->json(['success'=>true, 'message'=>'Curso registrado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }

    }

    public function courseUnregister($course)
    {
        $user = auth()->user();
        $user->coursesStudent()->detach($course);
        return response()->json(['success'=>true, 'message'=>'Curso desregistrado']);
    }
}
