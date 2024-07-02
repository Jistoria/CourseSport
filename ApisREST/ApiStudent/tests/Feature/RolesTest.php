<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Spatie\Permission\Models\Role;

class RolesTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * A basic feature test example.
     */
    #[Test]
    public function rol_administrador_can_see_users()
    {

        $superAdminRole = Role::where('name', 'Administrador')->first();
        $user = User::factory()->create();
        $superAdminRole = Role::where('name', 'Administrador')->first();
        $user->assignRole($superAdminRole);

        $response = $this->actingAs($user, 'sanctum')->get('/api/dashboard_admin/coachs');

        $response->assertStatus(200);
    }

    #[Test]
    public function rol_entrenador_can_see_courses()
    {
        $user = User::factory()->create();
        $coachRole = Role::where('name', 'Entrenador')->first();
        $user->assignRole($coachRole);

        $response = $this->actingAs($user, 'sanctum')->get('/api/dashboard_coach/my_courses');

        $response->assertStatus(200);
    }

    #[Test]
    public function rol_estudiante_can_see_courses()
    {
        $user = User::factory()->create();
        $studentRole = Role::where('name', 'Estudiante')->first();
        $user->assignRole($studentRole);

        $response = $this->actingAs($user, 'sanctum')->get('/api/dashboard_student/courses');

        $response->assertStatus(200);
    }



}
