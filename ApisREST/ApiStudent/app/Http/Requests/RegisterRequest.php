<?php

namespace App\Http\Requests;

use App\Rules\CedulaEcuatoriana;
use App\Rules\EnumValue;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $age = $this->routeIs('register') ? 'required|int|min:6|max:19' : 'required|int|min:20|max:60';
        return [
            'cdl_user' => ['required','int','digits:10','unique:users',new CedulaEcuatoriana],
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'gender' => ['required','string',new EnumValue('M','F')],
            'age' => $age,
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'cof_password' => 'required|string|same:password',
        ];
    }

    public function messages()
    {
        $message_age = $this->routeIs('register') ? 'Solo se permiten estudiantes de 6 a 19 años' : 'Solo se permiten entrenadores de 20 a 60 años';
        return [
        'cdl_user.required' => 'La cedula es obligatoria.',
        'cdl_user.digits' => 'Deben ser 10 digitos.',
        'cdl_user.unique' => 'La cedula ya esta registrada.',
        'cdl_user.integer' => 'La cedula debe ser un número.',
        'name.required' => 'El nombre es obligatorio.',
        'name.string' => 'El nombre debe ser una cadena de texto.',
        'gender.required' => 'El género es obligatorio.',
        'gender.string' => 'El género debe ser una cadena de texto.',
        'age.required' => 'La edad es obligatoria.',
        'age.int' => 'La edad debe ser un número entero.',
        'age.min' => $message_age,
        'age.max' => $message_age,
        'lastname.required' => 'El nombre es obligatorio.',
        'lastname.string' => 'El nombre debe ser una cadena de texto.',
        'name.max' => 'El nombre no debe exceder los 255 caracteres.',
        'email.required' => 'El correo electrónico es obligatorio.',
        'email.string' => 'El correo electrónico debe ser una cadena de texto.',
        'email.email' => 'El formato del correo electrónico no es válido.',
        'email.max' => 'El correo electrónico no debe exceder los 255 caracteres.',
        'email.unique' => 'El correo electrónico ya está registrado.',
        'password.required' => 'La contraseña es obligatoria.',
        'password.string' => 'La contraseña debe ser una cadena de texto.',
        'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
        'cof_password.required' => 'La confirmación de contraseña es obligatoria',
        'cof_password.same' => 'Las contraseñas no coinciden'];
    }
}
