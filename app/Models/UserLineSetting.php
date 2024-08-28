<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLineSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'line_id',
        'favorite_flag',
        'notify_status_flag',
        'notify_monday',
        'notify_tuesday',
        'notify_wednesday',
        'notify_thursday',
        'notify_friday',
        'notify_saturday',
        'notify_sunday',
        'notify_start_time',
        'notify_end_time',
        'notify_fixed_time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function line()
    {
        return $this->belongsTo(Line::class);
    }
}
