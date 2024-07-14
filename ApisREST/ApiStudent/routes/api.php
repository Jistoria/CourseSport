<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\CoachCourseController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SportController;
use App\Http\Controllers\StudentCourseController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;






//Rutas que requieren no tener sesion
Route::middleware(['guest:sanctum'])->group(function () {
    Route::post('/register',[UserController::class,'register'])->name('register');
    Route::post('/login',[UserController::class,'login']);
});


//Rutas que necesitan tener sesion
Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/get-session',[UserController::class,'get_session']);
    Route::post('/logout',[UserController::class,'logout']);
});
//Rutas que necesitan tener sesion y un rol Administrador
Route::middleware(['auth:sanctum','role:Administrador'])->prefix('dashboard_admin')->group(function(){
    Route::resource('/coachs',CoachController::class);
    Route::resource('/courses',CourseController::class);
    Route::resource('/sports', SportController::class);
    Route::delete('/user_disable/{user}',[AdminController::class,'userDisable']);
    Route::get('/students',[AdminController::class,'students']);
});

//Rutas que necesitan tener sesion y un rol Entrenador
Route::middleware(['auth:sanctum','role:Entrenador'])->prefix('dashboard_coach')->group(function(){
    Route::get('/my_courses',[CoachCourseController::class,'myCourses']);
    Route::put('/score_student/{course}',[CoachCourseController::class,'scoreStudent']);
});

//Rutas que necesitan tener sesion y un rol Estudiante
Route::middleware(['auth:sanctum','role:Estudiante'])->prefix('dashboard_student')->group(function(){
    Route::get('/courses',[StudentCourseController::class,'index']);
    Route::get('/my_courses',[StudentCourseController::class,'yourCourse']);
    Route::post('/course_register/{course}',[StudentCourseController::class,'courseRegister']);
    Route::delete('/course_unregister/{course}',[StudentCourseController::class,'courseUnregister']);
});

