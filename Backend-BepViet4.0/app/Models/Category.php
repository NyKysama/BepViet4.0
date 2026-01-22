<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Post;

class Category extends Model {
    protected $table = 'categories';
    use SoftDeletes;
    protected $primaryKey = 'category_id';
    protected $fillable = ['name'];

    public static function getAll(){
        return self::all();
    }

    public function posts() { 
        return $this->belongsToMany(Post::class, 'category_recipe', 'category_id', 'post_id'); 
    }
    
}