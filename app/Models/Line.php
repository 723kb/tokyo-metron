<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'color_code'];

    // odpt_idをアクセサとして定義
    public function getOdptIdAttribute()
    {
        return 'odpt.Railway:' . $this->name;
    }

    // 1つの路線（Line）に対して複数のステータス更新（StatusUpdate）が存在 → 履歴の保持
    public function statusUpdates()
    {
        // $thisはこのモデル(Lineモデル)って意味
        return $this->hasMany(StatusUpdate::class);  // 多対多
    }

    // 最新のステータス更新を取得するリレーション
    public function latestStatusUpdate()
    {
        return $this->hasOne(StatusUpdate::class)->latest();
    }

    public function userLineSettings()
    {
        return $this->hasMany(UserLineSetting::class);
    }
}
