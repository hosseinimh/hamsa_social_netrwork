<?php

namespace App\Constants;

abstract class ErrorCode
{
    const SERVER_ERROR = 500;
    const CLIENT_ERROR = 1000;

    const USER_NOT_FOUND = 1;
    const USER_NOT_AUTHORIZED = 2;
    const USER_ALREADY_LOGGED_IN = 3;

    const FORM_INPUT_INVALID = 7;
    const STORE_ERROR = 8;
    const ITEM_NOT_FOUND = 9;
    const UPDATE_ERROR = 10;
    const DELETE_ERROR = 11;
    const CUSTOM_ERROR = 5009;
}
