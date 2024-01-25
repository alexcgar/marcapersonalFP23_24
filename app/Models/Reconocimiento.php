<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;

class Reconocimiento extends Model
{
    use HasFactory;
    protected $fillable = [
        'estudiante_id',
        'actividad_id',
        'documento',
        'docente_validador',
        'fecha'
    ];
    public function actividad(): BelongsTo
{
     return $this->belongsTo(Actividad::class, 'actividad_id');
}

}
