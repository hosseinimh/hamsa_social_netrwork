<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $table = 'tbl_users';
    protected $fillable = [
        'name',
        'family',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
