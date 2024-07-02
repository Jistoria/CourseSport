<?php

namespace App\Services;

use App\Models\User;
use Spatie\Permission\Models\Role;

class CoachService
{
    /**
     * @var User
     */
    private $coach;
    /**
     * CoachService constructor.
     * @param User $coach
     */
    public function __construct(User $coach)
    {
        $this->coach = $coach->role('Entrenador');
    }

    public function indexCoach(string $search = null)
    {
        return $this->coach->with('coursesCoach')
        ->when($search, function($query) use ($search){
            return $query->where('name','like','%'.$search.'%');
        })
        ->get();
    }

    public function find(int $id)
    {
        return $this->coach->with('coursesCoach')->find($id);
    }

    public function edit(int $id, array $data)
    {
        $coach = $this->coach->find($id);
        $coach->update($data);
        return true;
    }

    public function deleteCoach(int $id)
    {
        $coach = $this->coach->find($id);
        return $coach->delete();
    }

    /**
     * Crear un nuevo entrenador
     * @param array $data
     * @return User
     */
    public function create(array $data)
    {
        $coach = $this->coach->create($data);
        $role = Role::where('name','Entrenador')->first();
        $coach->assignRole($role);
        return $coach;
    }

    /**
     * Obtener todos los entrenadores
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCoach()
    {
        $course = $this->coach->with('coursesCoach')->get();
        return $course;
    }
}
