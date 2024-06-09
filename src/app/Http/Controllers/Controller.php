<?php

namespace App\Http\Controllers;

use App\Packages\JsonResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct(protected JsonResponse $response)
    {
        date_default_timezone_set('UTC');
    }

    public function onItem(mixed $item): HttpJsonResponse
    {
        return $this->response->itemResponse($item);
    }

    public function onItems(mixed $items)
    {
        if (is_array($items)) {
            if (array_key_exists('items', $items) && is_object($items['items'])) {
                $count = count($items['items']);
            } else {
                $count = count($items);
            }
        } else {
            $count = 0;
        }
        return $this->response->itemsResponse($items, $count);
    }

    public function onStore(Model|bool $model = true): HttpJsonResponse
    {
        return $this->response->storeResponse($model);
    }

    public function onUpdate(bool $result = true, array $data = null): HttpJsonResponse
    {
        return $this->response->updateResponse($result, $data);
    }

    public function onDelete(bool $result = true): HttpJsonResponse
    {
        return $this->response->deleteResponse($result);
    }

    public function onBoolean(bool $result): HttpJsonResponse
    {
        return $this->response->booleanResponse($result);
    }

    public function onOk(array|null $data = null): HttpJsonResponse
    {
        return $this->response->okResponse($data);
    }

    public function onError(array|null $data = null): HttpJsonResponse
    {
        return $this->response->errorResponse($data);
    }

    public function resource(mixed $item)
    {
        return $this->response->resource($item);
    }

    public function collection(mixed $items)
    {
        return $this->response->collection($items);
    }
}
