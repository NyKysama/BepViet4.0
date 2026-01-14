<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; 
use App\Models\Post;

class Step extends Model {
    protected $table = 'steps';
    protected $primaryKey = 'step_id';
    protected $fillable = ['post_id', 'steps', 'content', 'img'];

    public function post() { return $this->belongsTo(Post::class, 'post_id'); }
}
?>