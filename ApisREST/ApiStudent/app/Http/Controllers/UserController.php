<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterRequest $request)
    {
        $new_user = $this->userService->register($request->all());
        return response()->json(['success'=>true,'message'=>"Te has registrado $new_user"]);
    }
    public function login(Request $request)
    {
        $request->validate(['cdl_user'=>'required|int','password'=>'required'],
        ['cdl_user.required'=>'No has ingrsado una cedula',
        'cdl_user.int'=>'La cedula debe ser un número',
        'password.required'=>'No has ingresado una contraseña']);
        $credentials = $request->only('cdl_user', 'password');

        $user = $this->userService->login($credentials);

        if($user == 'Credenciales invalidas')
        {
            return response()->json(['success'=>false, 'message'=>'Credenciales invalidas'],401);
        }
        return response()->json(['success'=>true, 'message'=>'Se ha iniciado sesion', 'user' =>$user])->cookie('cookie_token', $user['token'], 60);
    }

    public function logout ()
    {
        if($this->userService->logout())
        {
            return response()->json(['success'=>true, 'message'=>'Se ha cerrado sesion'],200);
        }
        return response()->json(['success'=>true, 'message'=>'Ha ocurrido un error'],500);
    }

    public function get_session()
    {
        $user = $this->userService->get_session();
        if ($user) {

            return response()->json(['user' => $user]);
        }

        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }
}
