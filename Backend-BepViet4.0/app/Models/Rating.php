<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Post;

class Rating extends Model {
    protected $table = 'rating';
    // public $timestamps = false; // Bảng này thường chỉ lưu score, không cần updated_at
    protected $fillable = ['user_id', 'post_id', 'score'];
    // protected $primaryKey=["post_id","user_id"];//20/01/2026

    public function user() { return $this->belongsTo(User::class, 'user_id'); }
    public function post() { return $this->belongsTo(Post::class, 'post_id'); }
}
