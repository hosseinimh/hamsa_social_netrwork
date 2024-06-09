@php
$direction = 'rtl';
$cssFilename = 'style_rtl.css';

try {
$cssFileModified = substr(md5(filemtime('assets/css/'.$cssFilename)), 0, 6);
} catch (\Exception) {
$cssFileModified = '';
}

try {
$jsFilename = 'assets/js/index.js';
$jsFileModified = substr(md5(filemtime($jsFilename)), 0, 6);
} catch (\Exception) {
$jsFileModified = '';
}
@endphp
<!DOCTYPE html>
<html lang="{{app()->currentLocale()}}" dir="{{$direction}}">

<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="apple-touch-icon" sizes="180x180" href="{{$THEME::BASE_URL}}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$THEME::BASE_URL}}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$THEME::BASE_URL}}/favicon-16x16.png">
    <link rel="manifest" href="{{$THEME::BASE_URL}}/site.webmanifest">
    <link rel="mask-icon" href="{{$THEME::BASE_URL}}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title>{{ __('general._title') }}</title>
    <link href="{{$THEME::CSS_PATH}}/{{$cssFilename}}?v={{$cssFileModified}}" rel="stylesheet">
</head>

<body>
    <div id="root"></div>
    <script src="{{$THEME::JS_PATH}}/index.js?v={{$jsFileModified}}"></script>
</body>

</html>