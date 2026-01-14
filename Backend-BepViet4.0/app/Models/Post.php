<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Step;
use App\Models\Comment;
use App\Models\Ingredient;
use App\Models\Category;
use App\Models\Cookbook;


class Post extends Model {
    protected $table = 'posts';
    protected $primaryKey = 'post_id';
    protected $fillable = ['img', 'title', 'description', 'type', 'cook_time', 'user_id', 'slug', 'difficulty', 'region', 'status'];

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
    public function steps() { return $this->hasMany(Step::class, 'post_id'); }
    public function comments() { return $this->hasMany(Comment::class, 'post_id'); }
    
    // Quan hệ N-N với Ingredient
    public function ingredients() { 
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient', 'post_id', 'ing_id')
                    ->withPivot('amount', 'unit'); 
    }

    // Quan hệ N-N với Category
    public function categories() { 
        return $this->belongsToMany(Category::class, 'category_recipe', 'post_id', 'category_id'); 
    }

    // Quan hệ N-N với Cookbook
    public function cookbooks() { 
        return $this->belongsToMany(Cookbook::class, 'cookbook_detail', 'post_id', 'cookbook_id'); 
    }
}
?>