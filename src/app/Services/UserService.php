<?php

namespace App\Services;

use App\Models\User as Model;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(string|null $name, string|null $family, int $page, int $pageItems): mixed
    {
        return Model::where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->select('tbl_users.*', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getHighlitedUserIds(): mixed
    {
        return Model::select('id')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->take(5)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
