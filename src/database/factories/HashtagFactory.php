<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class HashtagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $text = fake()->realText(20);
        $text = str_replace(' ', '_', $text);
        $text = str_replace(['.', ',', '؟'], '', $text);
        return [
            'hashtag' => strlen($text) === 0 ? __('hashtag.hashtag_empty') : $text,
        ];
    }
}
