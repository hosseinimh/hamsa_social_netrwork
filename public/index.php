<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

require_once __DIR__ . '/../src/server-config.php';

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = FRAMEWORK_PATH . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

require FRAMEWORK_PATH . '/vendor/autoload.php';

$app = require_once FRAMEWORK_PATH . '/bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
)->send();

$kernel->terminate($request, $response);
