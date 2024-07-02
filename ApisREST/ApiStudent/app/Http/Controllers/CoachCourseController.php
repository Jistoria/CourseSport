<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Rules\IsStudent;
use Illuminate\Http\Request;

class CoachCourseController extends Controller
{
    public function myCourses()
    {
        try{
            $courses = auth()->user()->coursesCoach()->with('students','sport')->get();
            return response()->json(['success'=>true, 'courses'=>$courses]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function scoreStudent(Course $course, Request $request)
    {
        $request->validate(['score'=>'required|numeric|min:1|max:10','cdl_student'=>['required','numeric','exists:users,cdl_user',new IsStudent]],
        ['score.required'=>'No has ingresado una calificación',
        'score.numeric'=>'La calificación debe ser un número',
        'score.min'=>'La calificación debe ser mayor a 1',
        'score.max'=>'La calificación debe ser menor o igual 10']);
        try{
            $course->students()->updateExistingPivot($request->cdl_student, ['score_course'=>$request->score]);
            return response()->json(['success'=>true, 'message'=>'Calificación actualizada']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }
}
