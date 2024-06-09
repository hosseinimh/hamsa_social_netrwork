<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $text = fake()->realText(100);
        return [
            'text' => $text,
            'is_anonymous' => random_int(0, 1),
            'is_public' => random_int(0, 1),
        ];
    }
}
