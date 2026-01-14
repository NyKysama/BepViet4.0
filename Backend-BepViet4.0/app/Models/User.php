<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Post;
use App\Models\Cookbook;
use App\Models\Comment;
use App\Models\Rating;

class User extends Authenticatable {
    use HasApiTokens;
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $fillable = ['name', 'avatar', 'username', 'password', 'birthday', 'sex', 'phone', 'gmail', 'role', 'slug', 'status'];
    protected $hidden = ['password'];

    public function posts() { return $this->hasMany(Post::class, 'user_id'); }
    public function cookbooks() { return $this->hasMany(Cookbook::class, 'user_id'); }
    public function comments() { return $this->hasMany(Comment::class, 'user_id'); }
    public function ratings() { return $this->hasMany(Rating::class, 'user_id'); }

    // Quan hệ Follow
    public function followers() { return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id'); }
    public function followings() { return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id'); }
}
?>
