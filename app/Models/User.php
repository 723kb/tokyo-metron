<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

        /**
     * ユーザーが投稿した運行状況更新を取得
     */
    public function statusUpdates()
    {
        return $this->hasMany(StatusUpdate::class);
    }

    /**
     * ユーザーが投稿したコメントを取得
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * ユーザーが「いいね」したコメントを取得
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * ユーザーの路線設定を取得
     */
    public function lineSettings()
    {
        return $this->hasMany(UserLineSetting::class);
    }

    /**
     * ユーザーのLINE Notify設定を取得
     */
    public function lineNotifyToken()
    {
        return $this->hasOne(LineNotifyToken::class);
    }
}
