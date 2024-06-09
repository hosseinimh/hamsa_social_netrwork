<?php

namespace App\Services;

use App\Models\Hashtag as Model;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class HashtagService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(Post $post, int $page, int $pageItems): mixed
    {
        return Model::where('post_id', $post->id)->select('tbl_hashtags.*', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('hashtag', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(Post $post): mixed
    {
        return Model::where('post_id', $post->id)->orderBy('hashtag', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public function getHighlitedHashtagIds(): mixed
    {
        return Model::select('id')->orderBy('hashtag', 'ASC')->orderBy('id', 'ASC')->take(5)->get();
    }

    public function getHighlitedHashtags(): mixed
    {
        return Model::orderBy('hashtag', 'ASC')->orderBy('id', 'ASC')->take(5)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
