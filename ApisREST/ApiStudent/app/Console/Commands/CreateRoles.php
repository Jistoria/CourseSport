<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class CreateRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create roles default';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $roles = ['Administrador','Entrenador','Estudiante'];

        foreach($roles as $role){
            Role::findOrCreate($role);
            $this->info("Se ha creado el rol $role");
        }
    }
}
