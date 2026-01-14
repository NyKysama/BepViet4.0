<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Ingredient extends Model {
    protected $table = 'ingredients';
    protected $primaryKey = 'ing_id';
    protected $fillable = ['name'];

    public function posts() { 
        return $this->belongsToMany(Post::class, 'recipe_ingredient', 'ing_id', 'post_id')
                    ->withPivot('amount', 'unit'); 
    }
}
