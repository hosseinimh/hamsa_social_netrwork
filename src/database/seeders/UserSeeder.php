<?php

namespace Database\Seeders;

use App\Models\Hashtag;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(range(1, 10))
            ->each(function () {
                User::factory()
                    ->has(Post::factory()->has(Hashtag::factory()->count(rand(1, 5)))->count(rand(10, 50)))
                    ->create();
            });
    }
}
