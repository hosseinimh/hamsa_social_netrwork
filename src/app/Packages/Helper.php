<?php

namespace App\Packages;

use App\Models\Error;
use DateTime;
use Exception;

class Helper
{
    public function handleError(Exception $e)
    {
        try {
            Error::create(['message' => $e->__toString()]);
        } catch (Exception) {
        }
    }

    public function randomString(int $length = 4): string
    {
        try {
            $characters = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $randstring = '';

            for ($i = 0; $i < $length; $i++) {
                $randstring[$i] = $characters[rand(0, strlen($characters) - 1)];
            }

            return $randstring;
        } catch (Exception) {
        }

        return '1234';
    }

    public function randomNumbersString(int $length = 4): string
    {
        try {
            $characters = '123456789';
            $randstring = '';

            for ($i = 0; $i < $length; $i++) {
                $randstring[$i] = $characters[rand(0, strlen($characters) - 1)];
            }

            return $randstring;
        } catch (Exception) {
        }

        return '1234';
    }

    public function persianNumbers($englishNumber)
    {
        try {
            $persianNumber = str_replace(array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'), $englishNumber);

            return $persianNumber;
        } catch (Exception) {
        }

        return $englishNumber;
    }

    public function localeNumbers($number)
    {
        try {
            return Helper::persianNumbers($number);
        } catch (Exception) {
        }

        return $number;
    }

    public function resizeImage(string $file, int $width): void
    {
        try {
            $src = imagecreatefromjpeg($file);
            list($imgWidth) = getimagesize($file);
            $dst = $imgWidth > $width ? imagescale($src, $width) : $src;

            imagejpeg($dst, $file);
        } catch (Exception) {
        }
    }

    public function deleteAll(string $dir): void
    {
        foreach (glob($dir . '/*') as $file) {
            if (is_dir($file)) {
                $this->deleteAll($file);
            } else {
                @unlink($file);
            }
        }

        @rmdir($dir);
    }

    public function gregorianToJalali($gy, $gm, $gd, $mod = '')
    {
        try {
            $g_d_m = array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
            $gy2 = ($gm > 2) ? ($gy + 1) : $gy;
            $days = 355666 + (365 * $gy) + ((int) (($gy2 + 3) / 4)) - ((int) (($gy2 + 99) / 100)) + ((int) (($gy2 + 399) / 400)) + $gd + $g_d_m[$gm - 1];
            $jy = -1595 + (33 * ((int) ($days / 12053)));
            $days %= 12053;
            $jy += 4 * ((int) ($days / 1461));
            $days %= 1461;

            if ($days > 365) {
                $jy += (int) (($days - 1) / 365);
                $days = ($days - 1) % 365;
            }

            if ($days < 186) {
                $jm = 1 + (int) ($days / 31);
                $jd = 1 + ($days % 31);
            } else {
                $jm = 7 + (int) (($days - 186) / 30);
                $jd = 1 + (($days - 186) % 30);
            }

            return ($mod === '') ? array($jy, $jm, $jd) : $jy . $mod . $jm . $mod . $jd;
        } catch (Exception) {
            return null;
        }
    }

    public function jalaliToGregorian($jy, $jm, $jd, $mod = '')
    {
        if ($jy > 979) {
            $gy = 1600;
            $jy -= 979;
        } else {
            $gy = 621;
        }
        $days = (365 * $jy) + (((int)($jy / 33)) * 8) + ((int)((($jy % 33) + 3) / 4)) + 78 + $jd + (($jm < 7) ? ($jm - 1) * 31 : (($jm - 7) * 30) + 186);
        $gy += 400 * ((int)($days / 146097));
        $days %= 146097;
        if ($days > 36524) {
            $gy += 100 * ((int)(--$days / 36524));
            $days %= 36524;
            if ($days >= 365) $days++;
        }
        $gy += 4 * ((int)(($days) / 1461));
        $days %= 1461;
        $gy += (int)(($days - 1) / 365);
        if ($days > 365) $days = ($days - 1) % 365;
        $gd = $days + 1;
        foreach (array(0, 31, ((($gy % 4 == 0) and ($gy % 100 != 0)) or ($gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31) as $gm => $v) {
            if ($gd <= $v) break;
            $gd -= $v;
        }
        return ($mod === '') ? array($gy, $gm, $gd) : $gy . $mod . $gm . $mod . $gd;
    }

    public function getFaDate($date, bool $fullDate = true)
    {
        $date = new DateTime($date);
        $h = $date->format('H');
        $i = $date->format('i');
        $s = $date->format('s');
        $date = Helper::gregorianToJalali($date->format('Y'), $date->format('m'), $date->format('d'));

        if ($fullDate && intval($date[1]) < 10) $date[1] = '0' . $date[1];
        if ($fullDate && intval($date[2]) < 10) $date[2] = '0' . $date[2];

        $date[3] = $h;
        $date[4] = $i;
        $date[5] = $s;

        return $date;
    }

    public function faDate($date)
    {
        $date = Helper::getFaDate($date);

        return $date[3] . ':' . $date[4] . ':' . $date[5] . ' ' . $date[0] . '-' . $date[1] . '-' . $date[2];
    }

    public function faDate2($date)
    {
        $date = Helper::getFaDate($date);

        return $date[3] . ':' . $date[4] . ':' . $date[5] . ' ' . $date[2] . '-' . $date[1] . '-' . $date[0];
    }

    public function logError($e)
    {
        try {
            $message = 'url: ' . url()->current();
            $message .= "
";
            $message .= "
" . is_string($e) ? $e : $e->__toString();
            foreach (getallheaders() as $name => $value) {
                $message .= "
$name: $value";
            }
            Error::create(['message' => $message]);
        } catch (Exception) {
        }
    }
}
