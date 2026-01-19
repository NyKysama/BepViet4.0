<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function getCommentByPost($id)
    {
        $comment = Comment::with(['user', 'replies.user', 'replies.replies'])->where('post_id', $id)->where('parent_id', null)->get();
        return response()->json($comment);
    }

    public function create(Request $request, $post, $id = null, )
    {
        $validate = $request->validate([
            'content' => 'required|string',
        ]);
        // 1. Kiểm tra Token/Đăng nhập
        if (!Auth::check()) {
            return response()->json(['message' => 'Bạn chưa đăng nhập!'], 401);
        }
        Comment::create([
            'content' => $request->input('content'),
            'user_id' => Auth::id(),
            'post_id' => $post,
            'parent_id' => $id
        ]);
        return response()->json(['mesage' => 'Bình luận thành công']);
    }

    public function cmtCount($id){
        $cmt = Comment::where('post_id', $id)->count();
        return response()->json($cmt);
    }
}
