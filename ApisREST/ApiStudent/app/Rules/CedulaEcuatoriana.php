<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CedulaEcuatoriana implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Verificar la estructura y el dígito verificador de la cédula
        if (preg_match('/^[0-9]{10}$/', $value)) {
            $cedula = substr($value, 0, 9);
            $digito_verificador = substr($value, 9, 1);
             // Calcular el dígito verificador utilizando el algoritmo de Módulo 10
             $sum = 0;
             for ($i = 0; $i < 9; $i++) {
                 $digit = (int)$cedula[$i];
                 if ($i % 2 === 0) {
                     $digit *= 2;
                     if ($digit > 9) {
                         $digit -= 9;
                     }
                 }
                 $sum += $digit;
             }

             $remainder = $sum % 10;
             $computed_verifier = ($remainder !== 0) ? (10 - $remainder) : 0;

             // Comparar el dígito verificador calculado con el dígito verificador proporcionado
             if($computed_verifier !== (int)$digito_verificador){
                $fail('Cedula no valida');
             }
        }
    }
}
