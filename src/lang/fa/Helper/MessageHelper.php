<?php

$templateMessages = [
    'required' => 'لطفا :field را وارد نمایید.',
    'valid' => 'لطفا :field را به درستی وارد نمایید.',
    'minString' => 'طول فیلد :field حداقل باید :value حرف باشد.',
    'maxString' => 'طول فیلد :field حداکثر باید :value حرف باشد.',
    'numeric' => 'مقدار فیلد :field تنها باید شامل اعداد باشد.',
    'minNumeric' => 'مقدار فیلد :field حداقل باید برابر یا بزرگ‌تر از :value باشد.',
    'maxNumeric' => 'مقدار فیلد :field حداکثر باید برابر یا کم‌تر ز :value باشد.',
    'digits' => 'طول فیلد :field باید :value رقم باشد.',
    'maxDigits' => 'حداکثر طول فیلد :field باید :value رقم باشد.',
    'gtNumeric' => 'مقدار فیلد :field باید بزرگ‌تر از :value  باشد.',
    'gteNumeric' => 'مقدار فیلد :field باید برابر یا بزرگ‌تر از :value باشد.',
    'ltNumeric' => 'مقدار فیلد :field باید کوچک‌تر از :value باشد.',
    'lteNumeric' => 'مقدار فیلد :field باید برابر یا کوچک‌تر از :value باشد.',
    'select' => 'لطفا یک :field را انتخاب نمایید.',
];

$requiredMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['required'];

    return str_replace(':field', $field, $message);
};

$validMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['valid'];

    return str_replace(':field', $field, $message);
};

$minStringMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['minString'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$maxStringMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['maxString'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$numericMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['numeric'];

    return str_replace(':field', $field, $message);
};

$minNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['minNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$maxNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['maxNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$digitsMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['digits'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$maxDigitsMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['maxDigits'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$gtNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['gtNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$ltNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['ltNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$gteNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['gteNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$lteNumericMessage = function ($field, $value) use ($templateMessages) {
    $message = $templateMessages['lteNumeric'];
    $message = str_replace(':field', $field, $message);

    return str_replace(':value', $value, $message);
};

$selectMessage = function ($field) use ($templateMessages) {
    $message = $templateMessages['select'];

    return str_replace(':field', $field, $message);
};
