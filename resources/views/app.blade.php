<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="東京メトロ運行状況共有サービス">
        <meta name="keywords" content="東京メトロ,運行状況,地下鉄">
        <!-- ファビコン -->
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <!-- アイコン -->
        <link rel="apple-touch-icon" href="/images/apple-touch-icon-180x180.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/images/icon-32x32.png" sizes="180x180" />

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>