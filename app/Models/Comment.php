<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status_update_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function statusUpdate()
    {
        return $this->belongsTo(StatusUpdate::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
