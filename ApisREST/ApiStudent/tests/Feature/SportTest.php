<?php

namespace Tests\Feature;

use App\Models\Sport;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class SportTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use DatabaseTransactions;


    #[Test]
    public function it_has_the_correct_primary_key(): void
    {
        $sport = new Sport();

        $this->assertEquals('sport_id', $sport->getKeyName());
    }

    #[Test]
    public function it_has_the_correct_fillable_properties(): void
    {
        $sport = new Sport();

        $this->assertEquals(['name', 'description'], $sport->getFillable());
    }
}
