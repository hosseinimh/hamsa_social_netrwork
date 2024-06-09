<?php

require __DIR__ . '/Helper/MessageHelper.php';

return [
    'user_not_found' => 'نام کاربری یا کلمه عبور اشتباه است.',
    'user_already_logged_in' => 'کاربر قبلا وارد حساب کاربری شده است.',
    'name_required' => $requiredMessage('نام'),
    'name_min' => $minStringMessage('نام', 2),
    'name_max' => $maxStringMessage('نام', 50),
    'family_required' => $requiredMessage('نام خانوادگی'),
    'family_min' => $minStringMessage('نام خانوادگی', 2),
    'family_max' => $maxStringMessage('نام خانوادگی', 50),
    'not_authorized' => 'شما مجوز ورود به این قسمت را ندارید.',
    'name' => 'کاربر',
];
