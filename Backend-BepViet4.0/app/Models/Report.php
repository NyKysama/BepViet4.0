<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $primaryKey = 'id_report';
    public $timestamps = false;

    protected $fillable = ['post_id', 'user_id'];

    public static function getPendingRepost(){
        $reports = Report::with(['user', 'post'])
            ->orderBy('created_at', 'desc')            
            ->get();
        return $reports;
    }

    // Lấy thông tin người đã báo cáo
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Lấy thông tin bài viết bị báo cáo
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
}
