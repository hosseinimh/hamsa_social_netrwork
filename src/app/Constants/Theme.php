<?php

namespace App\Constants;

require_once __DIR__ . '/../../server-config.php';

abstract class Theme
{
    const BASE_URL = BASE_URL;
    const JS_PATH = '/assets/js';
    const CSS_PATH = '/assets/css';
    const LOGIN_URL = self::BASE_URL . '/users/login';
    const ITEMS_PER_PAGE = 10;
}
