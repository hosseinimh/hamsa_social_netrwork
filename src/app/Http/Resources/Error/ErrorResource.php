<?php

namespace App\Http\Resources\Error;

use DateTime;
use Illuminate\Http\Resources\Json\JsonResource;

class ErrorResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'message' => $this->message ?? '',
            'createdAt' => (new DateTime($this->created_at))->format('Y-m-d H:i:s'),
        ];
    }
}
