<?php

namespace App\Packages;

use App\Constants\ErrorCode;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class JsonResponse
{
    /**
     * @var string $entityResource
     */
    private ?string $entityResource;

    public function __construct(?string $entityResource = null)
    {
        $this->entityResource = $entityResource;
    }

    public function itemResponse($item): HttpJsonResponse
    {
        if ($item) {
            return $this->okResponse(['item' => $this->entityResource ? new $this->entityResource($item) : $item]);
        }

        return $this->errorResponse();
    }

    public function itemsResponse($items, $count): HttpJsonResponse
    {
        if ($items) {
            if (is_array($items) && count(array_keys($items)) > 0) {
                return $this->okResponse(array_merge($items, ['count' => $count]));
            } else {
                return $this->okResponse(['items' => $this->entityResource ? $this->entityResource::collection($items) : $items, 'count' => count($items) > 0 ? $items[0]->items_count : 0]);
            }
        }
        return $this->errorResponse();
    }

    public function storeResponse(Model|bool $model = true): HttpJsonResponse
    {
        if ($model) {
            return $this->okResponse();
        }

        return $this->errorResponse(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function updateResponse(bool $result = true, array $data = null): HttpJsonResponse
    {
        if ($result) {
            return $this->okResponse($data);
        }

        return $this->errorResponse(['_error' => __('general.update_error'), '_errorCode' => ErrorCode::UPDATE_ERROR]);
    }

    public function deleteResponse(bool $result): HttpJsonResponse
    {
        if ($result) {
            return $this->okResponse();
        }

        return $this->errorResponse(['_error' => __('general.delete_error'), '_errorCode' => ErrorCode::DELETE_ERROR]);
    }

    public function booleanResponse(bool $result): HttpJsonResponse
    {
        if ($result) {
            return $this->okResponse();
        }

        return $this->errorResponse();
    }

    public function okResponse(array|null $data = null): HttpJsonResponse
    {
        return $this->handleResult(true, $data);
    }

    public function errorResponse(array|null $data = null): HttpJsonResponse
    {
        return $this->handleResult(false, $data);
    }

    public function resource(mixed $item)
    {
        return $this->entityResource ? new $this->entityResource($item) : $item;
    }

    public function collection(mixed $items)
    {
        return $this->entityResource ? $this->entityResource::collection($items) : $items;
    }

    private function jsonResponse($data)
    {
        return response()->json($data);
    }

    private function handleResult($result, $data)
    {
        $result = ['_result' => $result ? '1' : '0'];

        if ($data && is_array($data)) {
            foreach ($data as $key => $value) {
                $result[$key] = $value;
            }
        }

        return $this->jsonResponse($result);
    }
}
