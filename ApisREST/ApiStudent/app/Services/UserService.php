<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Spatie\Permission\Models\Role;

class UserService
{
    /**
     * @var User
     */
    private $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Función para registrar un usuario
     * @param array $user
     * @return string
     */
    public function register(array $user)
    {
        $new_user = $this->user->create($user);
        $role = Role::where('name','Estudiante')->first();
        $new_user->assignRole($role);
        return $new_user->name;
    }

    /**
     * Función para iniciar sesión
     * @param array $credentials
     * @return string|array
     */
    public function login(array $credentials)
    {
        if (Auth::attempt($credentials)) {
            // Autenticación exitosa, redirigir a la página deseada
            $user = Auth::user();
            $token = $user->createToken('token-name')->plainTextToken;
            return ['data'=>$user->getSessionDetails(), 'token'=>$token];
        }
        return 'Credenciales invalidas';
    }


    /**
     * Función para cerrar sesión
     * @return bool
     */
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return true;
    }


    /**
     * Función para obtener los detalles de la sesión
     * @return array
     */
    public function get_session()
    {
        $user = auth('sanctum')->user()->getSessionDetails();
        return $user;
    }
}
