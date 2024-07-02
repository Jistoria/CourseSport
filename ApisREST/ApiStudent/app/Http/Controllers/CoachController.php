<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\CoachService;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    /**
     * @var CoachService
     */
    private $coachService;
    /**
     * CoachController constructor.
     * @param CoachService $coachService
     */
    public function __construct(CoachService $coachService)
    {
        $this->coachService = $coachService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try{
            $coachs = $this->coachService->indexCoach();
            return response()->json(['success'=>true, 'coachs'=>$coachs]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $coachs
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $coachs)
    {
        try{
            $coach = $this->coachService->find($coachs);
            return response()->json(['success'=>true, 'coach'=>$coach]);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $coachs
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $coachs)
    {
        try{
            $this->coachService->edit($coachs, $request->all());
            return response()->json(['success'=>true, 'message'=>'Entrenador actualizado correctamente']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $coachs
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $coachs)
    {
        try{
            $success = $this->coachService->deleteCoach($coachs);
            if($success){
                return response()->json(['success'=>true, 'message'=>'Entrenador eliminado correctamente']);
            }
            return response()->json(['success'=>false, 'message'=>'No se pudo eliminar el entrenador']);
        }catch(\Exception $e){
            return response()->json(['success'=>false, 'message'=>'No se pudo eliminar el entrenador', 'error'=>$e->getMessage()]);
        }
    }

    public function store(RegisterRequest $request)
    {
        $success = $this->coachService->create($request->all());
        if($success){
            return response()->json(['success'=>true, 'message'=>'Entrenador creado correctamente']);
        }
        return response()->json($success);
    }



}
