<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_student', function (Blueprint $table) {
            $table->id();
            $table->decimal('score_course',4,2)->default(0)->unsigned();
            $table->timestamps();

            $table->unsignedBigInteger('cdl_student');
            $table->foreign('cdl_student')
                    ->references('cdl_user')
                    ->on('users')
                    ->onDelete('cascade');
            $table->unsignedBigInteger('course_id');
            $table->foreign('course_id')
                    ->references('course_id')
                    ->on('courses')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_student');
    }
};
