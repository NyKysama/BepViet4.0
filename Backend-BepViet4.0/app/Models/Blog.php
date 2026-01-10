<?php

namespace App\Models;

use Mongodb\Laravel\Eloquent\Model;

class Blog extends Model
{
   protected $connection = 'mongodb';
    protected $collection = 'blogs';

  protected $fillable = [
        'user_id',
        'title',
        'content',
        'img',
        'status',
        'comments',
        'created_at',
        'updated_at'
    ];
}
