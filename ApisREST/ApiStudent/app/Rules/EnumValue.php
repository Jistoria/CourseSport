<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EnumValue implements ValidationRule
{
    protected $allowedValues;

    public function __construct(...$allowedValues)
    {
        $this->allowedValues = $allowedValues;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if(!in_array($value, $this->allowedValues)){
            $fail("El valor de $attribute no es valido");
        }
    }
}
