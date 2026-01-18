<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Post;

class Ingredient extends Model {
    protected $table = 'ingredients';
    use SoftDeletes;
    protected $primaryKey = 'ing_id';
    protected $fillable = ['name'];

    public static function getAll(){
        return self::all();
    }

    public function posts() { 
        return $this->belongsToMany(Post::class, 'recipe_ingredient', 'ing_id', 'post_id')
                    ->withPivot('amount', 'unit'); 
    }
}
