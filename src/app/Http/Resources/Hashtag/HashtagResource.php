<?php

namespace App\Http\Resources\Hashtag;

use Illuminate\Http\Resources\Json\JsonResource;

class HashtagResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'hashtag' => $this->hashtag,
            'postId' => intval($this->post_id),
        ];
    }
}
