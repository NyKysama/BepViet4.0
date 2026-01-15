<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function updateStatus(Request $request, $id)
    {
        // Tìm bài viết
        $post = Post::find($id);

        // Dùng hàm update để thay đổi trạng thái
        // 'status' là tên cột trong DB của ông (0: chờ, 1: duyệt, 2: từ chối)
        $post->update([
            'status' => $request->action === 'update' ? 1 : 2
        ]);

        return response()->json([
            'message' => 'Đã cập nhật trạng thái thành công!',
        ]);
    }
    //lay tat ca post
    public function getPosts(){
        //lay tat ca post
        $posts=Post::skip(0)->take(5)->get();
        return response()->json(["posts"=>$posts,
        ]);
    }
}
