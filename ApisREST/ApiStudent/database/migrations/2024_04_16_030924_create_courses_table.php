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
        Schema::create('courses', function (Blueprint $table) {
            $table->id('course_id');
            $table->string('title_course');
            $table->string('description');
            $table->unsignedBigInteger('sport_id');
            $table->unsignedBigInteger('cdl_coach');
            $table->unsignedInteger('quota');
            $table->boolean('status')->default(1);
            $table->timestamps();


            $table->foreign('cdl_coach')
                    ->references('cdl_user')
                    ->on('users')
                    ->onDelete('cascade');

            $table->foreign('sport_id')
                    ->references('sport_id')
                    ->on('sports')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course');
    }
};
