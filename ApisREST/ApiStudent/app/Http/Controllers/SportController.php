<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use Illuminate\Http\Request;

class SportController extends Controller
{

    public function index()
    {
        try{
            $sports = Sport::with('courses')->get();
            return response()->json(['success'=>true, 'sports'=>$sports]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        try{
            $request->validate(['name'=>'required','description'=>'required'],
                ['name.required'=>'No has ingresado un nombre',
                'description.required'=>'No has ingresado una descripción']);
            $sport = new Sport();
            $sport->name = $request->name;
            $sport->description = $request->description;
            $sport->save();
            return response()->json(['success'=>true, 'message'=>'Deporte creado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()], 400);
        }
    }

    public function show(Sport $sport)
    {
        try{
            return response()->json(['success'=>true, 'sport'=>$sport]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function update(Request $request, Sport $sport)
    {
        $request->validate(['name'=>'required','description'=>'required'],
        ['name.required'=>'No has ingresado un nombre',
        'description.required'=>'No has ingresado una descripción']);
        try{
            $sport->name = $request->name;
            $sport->description = $request->description;
            $sport->save();
            return response()->json(['success'=>true, 'message'=>'Deporte actualizado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    public function destroy($sport)
    {
        try{
            $sport = Sport::find($sport);
            $sport->delete();
            return response()->json(['success'=>true, 'message'=>'Deporte eliminado']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }
}
