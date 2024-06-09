<?php

namespace App\Services;

use App\Models\Error as Model;
use Illuminate\Support\Facades\DB;

class ErrorService
{
    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::select('tbl_errors.*', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $message): mixed
    {
        $data = [
            'message' => $message,
        ];
        return Model::create($data) ?? null;
    }

    public function count(): int
    {
        return Model::count();
    }
}
