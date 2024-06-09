<?php

namespace App\Services;

use App\Models\Keyword as Model;
use Illuminate\Support\Facades\DB;

class KeywordService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(string|null $keyword, int $page, int $pageItems): mixed
    {
        return Model::select('tbl_keywords.*', DB::raw('COUNT(*) OVER() AS items_count'))->where('keyword', 'LIKE', '%' . $keyword . '%')->orderBy('keyword', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getHighlitedKeywords(): mixed
    {
        return Model::select('keyword')->orderBy('keyword', 'ASC')->orderBy('id', 'ASC')->take(5)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
