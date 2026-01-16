<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model; 
use App\Models\Post;

class Step extends Model {
    protected $table = 'steps';
    protected $primaryKey = 'step_id';
    protected $fillable = ['post_id', 'steps', 'content', 'img'];

    public static function getStepByPostID($id){
        return self::where('post_id', $id)->get();
    }

    public function post() { return $this->belongsTo(Post::class, 'post_id'); }
}
?>