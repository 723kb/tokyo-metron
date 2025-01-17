<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'odpt' => [
        'key' => env('ODPT_API_KEY'),
    ],

    // デプロイ時にはenvファイルを本番用にする！
    'line_notify' => [
        'client_id' => env('LINE_NOTIFY_CLIENT_ID'),
        'client_secret' => env('LINE_NOTIFY_CLIENT_SECRET'),
        'redirect_uri' => env('LINE_NOTIFY_REDIRECT_URI'), 
    ],

];
