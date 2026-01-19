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

    //Cac moi quan he
    public function posts() { return $this->hasMany(Post::class, 'user_id'); }
    public function cookbooks() { return $this->hasMany(Cookbook::class, 'user_id'); }
    public function comments() { return $this->hasMany(Comment::class, 'user_id'); }
    public function ratings() { return $this->hasMany(Rating::class, 'user_id'); }
    // Quan hệ Follow
    //follower_id ID của người đi nhấn theo dõi.
    //following_id ID của người được theo dõi.
    //lay danh dach nguoi dang theo doi minh
    public function followers() { return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id'); }
    //lay dang sach nguoi minh dang theo doi
    public function followings() { return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id'); }

    //Phan ham
    
}
?>
