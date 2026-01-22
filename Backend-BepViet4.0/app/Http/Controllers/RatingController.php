<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;

class RatingController extends Controller
{
    public function postRating(Request $request)//20/01/2026
    {
       //kiểm tra dữ liệu gửi lên
        $request->validate([
            'user_id' => 'required|integer',
            'post_id' => 'required|integer',
            'score'   => 'required|integer|min:1|max:5',
        ]);

        //kiểm tra user đã rating bài này chưa
        $rating = Rating::where('user_id', $request->user_id)
                        ->where('post_id', $request->post_id)
                        ->first();

        if ($rating) {
            Rating::where('user_id', $request->user_id)
            ->where('post_id', $request->post_id)
            ->update([
                'score' => $request->score
            ]);
        } else {
            //nếu chưa có -> tạo mới
            Rating::create([
                'user_id' => $request->user_id,
                'post_id' => $request->post_id,
                'score'   => $request->score
            ]);
        }
        return response()->json([
            'message' => 'Đánh giá thành công'
        ], 200);
    }
    public function getPostRating($post_id){
        $ratings=Rating::where('post_id',$post_id)->get();
        return response()->json(['ratings'=>$ratings,]);        
    }
}
