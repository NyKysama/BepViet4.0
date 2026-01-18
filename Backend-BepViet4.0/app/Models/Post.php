<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use App\Models\Step;
use App\Models\Comment;
use App\Models\Ingredient;
use App\Models\Category;
use App\Models\Cookbook;


class Post extends Model
{
    protected $table = 'posts';
    use SoftDeletes;
    protected $primaryKey = 'post_id';
    protected $fillable = ['img', 'title', 'description', 'type', 'cook_time', 'user_id', 'slug', 'difficulty', 'region', 'status'];

    //hàm lấy ds bài đăng
    public static function getAll()
    {
        return self::all();
    }

    //hàm lấy ds bài đăng chưa duyệt && đã từ chối
    public static function pendingPosts()
    {
        return self::with('user')->with('categories')->where('status', '=!', 0)->get();
    }

    //hàm lấy dsct chưa chuyệt 
    public static function pending()
    {
        return self::with('user')->where('status', 0)->orderBy('created_at', 'desc')->get();
    }


    // hàm lấy ds bài đăng theo công thức
    public static function recipes()
    {
        return self::where('type', 'Công thức')->get();
    }

    //hàm lấy ds bài đăng theo blog
    public static function blogs()
    {
        return self::where('type', 'blog')->get();
    }

    //hàm đếm ds bài đăng theo công thức
    public static function countRecipes()
    {
        return self::where('type', 'Công thức')->where('status', 1)->count();
    }

    //hàm đếm ds bài viết theo blog
    public static function countBlog()
    {
        return self::where('type', 'Blog')->where('status', 1)->count();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function steps()
    {
        return $this->hasMany(Step::class, 'post_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }

    // Quan hệ N-N với Ingredient
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredient', 'post_id', 'ing_id')
            ->withPivot('amount', 'unit');
    }

    // Quan hệ N-N với Category
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_recipe', 'post_id', 'category_id');
    }

    // Quan hệ N-N với Cookbook
    public function cookbooks()
    {
        return $this->belongsToMany(Cookbook::class, 'cookbook_detail', 'post_id', 'cookbook_id');
    }
}
?>