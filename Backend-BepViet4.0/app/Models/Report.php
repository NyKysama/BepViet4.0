<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $primaryKey = 'id_report';
    public $timestamps = false;

    protected $fillable = ['post_id', 'user_id'];
}
