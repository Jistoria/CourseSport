<?php

namespace App\Console\Commands;

use App\Models\Sport;
use Illuminate\Console\Command;

class DefaultSport extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:default-sport';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sports = [
            ['name' => 'Futbol', 'description' => 'Deporte de equipo'],
            ['name' => 'Baloncesto', 'description' => 'Deporte de equipo'],
            ['name' => 'Voleibol', 'description' => 'Deporte de equipo'],
            ['name' => 'Natacion', 'description' => 'Deporte individual'],
            ['name' => 'Atletismo', 'description' => 'Deporte individual'],
            ['name' => 'Ciclismo', 'description' => 'Deporte individual'],
            ['name' => 'Gimnasia', 'description' => 'Deporte individual'],
            ['name' => 'Tenis', 'description' => 'Deporte individual'],
            ['name' => 'Golf', 'description' => 'Deporte individual'],
            ['name' => 'Ajedrez', 'description' => 'Deporte individual'],
        ];

        foreach ($sports as $sport) {
            Sport::create($sport);
        }
        $this->info('Deportes creados correctamente');
    }
}
