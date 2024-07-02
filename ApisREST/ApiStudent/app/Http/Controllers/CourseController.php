<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use App\Rules\IsCoach;
use Illuminate\Http\Request;

class CourseController extends Controller
{

    public function index()
    {
        try{
            $courses = Course::with(['students','coach'])->get();
            return response()->json(['success'=>true, 'courses'=>$courses]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $request->validate(['title_course'=>'required','description'=>'required','quota'=>'required|numeric|min:1','cdl_coach'=>['required','exists:users,cdl_user',new IsCoach],'sport_id'=>'required|exists:sports,sport_id'],
        ['title_course.required'=>'No has ingresado un nombre',
        'description.required'=>'No has ingresado una descripción',
        'quota.required'=>'No has ingresado una cantidad de cupos',
        'quota.numeric'=>'La cantidad de cupos debe ser un número',
        'quota.min'=>'La cantidad de cupos debe ser mayor a 0']);
        try{
            $course = new Course();
            $course->title_course = $request->title_course;
            $course->description = $request->description;
            $course->quota = $request->quota;
            $course->cdl_coach = $request->cdl_coach;
            $course->sport_id = $request->sport_id;
            $course->save();
            return response()->json(['success'=>true, 'message'=>'Curso creado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()],400);
        }
    }

    public function show($course)
    {
        try{
            $course = Course::find($course);
            return response()->json(['success'=>true, 'course'=>$course]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function update(Request $request, $course)
    {
        $request->validate(['title_course'=>'required','description'=>'required','quota'=>'required|numeric|min:1'],
        ['title_course.required'=>'No has ingresado un nombre',
        'description.required'=>'No has ingresado una descripción',
        'quota.required'=>'No has ingresado una cantidad de cupos',
        'quota.numeric'=>'La cantidad de cupos debe ser un número',
        'quota.min'=>'La cantidad de cupos debe ser mayor a 0']);
        try{
            $course = Course::find($course);
            $course->name = $request->title_course;
            $course->description = $request->description;
            $course->quota = $request->quota;
            $course->save();
            return response()->json(['success'=>true, 'message'=>'Curso actualizado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function destroy($course)
    {
        try{
            $course = Course::find($course);
            $course->status = 0;
            $course->save();
            return response()->json(['success'=>true, 'message'=>'Curso deshabilitado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }



}
