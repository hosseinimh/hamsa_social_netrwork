<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Hashtag\HashtagResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'text' => $this->text,
            'userId' => intval($this->user_id),
            'hashtags' => HashtagResource::collection($this->hashtags),
            'createdAt' => date_format($this->create_time, 'Y-m-d H:i:s'),
            'updatedtAt' => date_format($this->update_time, 'Y-m-d H:i:s'),
        ];
    }
}
