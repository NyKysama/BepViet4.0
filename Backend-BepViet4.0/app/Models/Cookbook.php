<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Post;

class Cookbook extends Model {
    protected $table = 'cookbooks';
    protected $primaryKey = 'cookbook_id';
    protected $fillable = ['user_id', 'name'];

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
    public function posts() { 
        return $this->belongsToMany(Post::class, 'cookbook_detail', 'cookbook_id', 'post_id'); 
    }
}
