<?php

namespace App\Services;

use App\Models\Post as Model;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PostService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(User $user, int $page, int $pageItems): mixed
    {
        return Model::where('user_id', $user->id)->select('tbl_posts.*', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('text', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getPaginateWithHashtags(User $user, int $page, int $pageItems): mixed
    {
        return Model::where('user_id', $user->id)->select('tbl_posts.*', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('text', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getHighlightedPostsV1(int $page, int $pageItems): mixed
    {
        $userService = new UserService();
        $hashtagService = new HashtagService();
        $keywordService = new KeywordService();
        $highlightedUserIds = $userService->getHighlitedUserIds()->toArray();
        $highlightedHashtagIds = $hashtagService->getHighlitedHashtagIds()->toArray();
        $highlightedKeywords = $keywordService->getHighlitedKeywords()->implode('keyword', ',');
        $highlightedKeywords = explode(',', $highlightedKeywords);
        $query = Model::join('tbl_hashtags', 'tbl_posts.id', '=', 'tbl_hashtags.post_id')
            ->where(function ($query) use ($highlightedUserIds) {
                $query->whereIn('tbl_posts.user_id', $highlightedUserIds)
                    ->where('tbl_posts.is_anonymous', 0);
            })
            ->orWhereIn('tbl_hashtags.id', $highlightedHashtagIds);
        foreach ($highlightedKeywords as $keyword) {
            $query = $query->orWhere('tbl_posts.text', 'LIKE', '%' . $keyword . '%');
        }
        $query = $query->where('tbl_posts.is_public', '!=', 0)
            ->where('tbl_posts.is_anonymous', 0)
            ->select('tbl_posts.id', 'tbl_posts.user_id', 'tbl_posts.text', DB::raw('COUNT(*) OVER() AS items_count'))
            ->orderBy('create_time', 'ASC')->orderBy('id', 'ASC')
            ->skip(($page - 1) * $pageItems)->take($pageItems)
            ->get();
        return $query;
    }

    public function getHighlightedPostsV2(int $page, int $pageItems): mixed
    {
        $userService = new UserService();
        $hashtagService = new HashtagService();
        $keywordService = new KeywordService();
        $highlightedUserIds = $userService->getHighlitedUserIds()->toArray();
        $highlightedHashtagRecords = $hashtagService->getHighlitedHashtags();
        $highlightedKeywords = $keywordService->getHighlitedKeywords()->implode('keyword', ',');
        $highlightedKeywords = explode(',', $highlightedKeywords);
        $query = Model::leftJoin('tbl_hashtags', 'tbl_posts.id', '=', 'tbl_hashtags.post_id')
            ->where('tbl_posts.is_public', '!=', 0)
            ->whereIn('tbl_posts.user_id', $highlightedUserIds)
            ->where(function ($query) use ($highlightedHashtagRecords, $highlightedKeywords) {
                $query->where(function ($query) use ($highlightedHashtagRecords) {
                    $highlightedHashtagIds = $highlightedHashtagRecords->implode('id', ',');
                    $highlightedHashtagIds = explode(',', $highlightedHashtagIds);
                    $highlightedHashtagPostIds = $highlightedHashtagRecords->implode('post_id', ',');
                    $highlightedHashtagPostIds = explode(',', $highlightedHashtagPostIds);
                    $query->whereIn('tbl_hashtags.id', $highlightedHashtagIds)
                        ->whereIn('tbl_posts.id', $highlightedHashtagPostIds);
                })
                    ->orWhere(function ($query) use ($highlightedKeywords) {
                        foreach ($highlightedKeywords as $keyword) {
                            $query->orWhere('tbl_posts.text', 'LIKE', '%' . $keyword . '%');
                        }
                    });
            })
            ->where('tbl_posts.is_anonymous', 0)
            ->select('tbl_posts.id', 'tbl_posts.user_id', 'tbl_posts.text', DB::raw('COUNT(*) OVER() AS items_count'))
            ->groupBy('tbl_posts.id')
            ->orderBy('create_time', 'ASC')->orderBy('id', 'ASC')
            ->skip(($page - 1) * $pageItems)->take($pageItems)
            ->get();
        return $query;
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
