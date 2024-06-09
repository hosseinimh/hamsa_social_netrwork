<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResourceV1 extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'text' => $this->text,
            'userId' => intval($this->user_id),
        ];
    }
}
