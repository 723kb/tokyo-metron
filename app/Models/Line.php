<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'color_code'];

    public function statusUpdates()
    {
        // $thisはこのモデル(Lineモデル)って意味
        return $this->hasMany(StatusUpdate::class);  // 多対多
    }

    public function userLineSettings()
    {
        return $this->hasMany(UserLineSetting::class);
    }
}
