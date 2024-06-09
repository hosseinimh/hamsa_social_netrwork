<?php

namespace App\Http\Resources\Keyword;

use Illuminate\Http\Resources\Json\JsonResource;

class KeywordResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'keyword' => $this->keyword,
        ];
    }
}
