<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusUpdate extends Model
{
    use HasFactory;
    protected $fillable = ['line_id', 'status', 'content'];       

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function line()
    {
        return $this->belongsTo(Line::class);
    }

    public static function fromODPTData($data, $lineId)
    {
        return new self([
            'line_id' => $lineId,
            'status' => $data['odpt:trainInformationStatus'] ?? '平常運転',
            'content' => $data['odpt:trainInformationText'] ?? '',
        ]);
    }
}
