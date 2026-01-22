<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Post;

class AIController extends Controller
{
     public function chatBot() {
        $content='Bạn là chuyên gia sáng tạo nội dung ẩm thực.

        Tôi sẽ cung cấp cho bạn danh sách các công thức nấu ăn.
        Nhiệm vụ của bạn:
        - Viết nội dung gợi ý để đăng bài cho từng công thức
        - Nội dung ngắn gọn, hấp dẫn, thân thiện
        - Mỗi công thức trả về đúng post_id
        - Mỗi công thức có mô tả riêng
        - Trả kết quả dưới dạng JSON hợp lệ

        Dữ liệu công thức:
        1. post_id: 12
        title: Gà chiên nước mắm
        description: Gà chiên giòn sốt nước mắm tỏi ớt

        2. post_id: 27
        title: Canh chua cá lóc
        description: Canh chua miền Tây nấu cá lóc

        Yêu cầu:
        Gợi ý nội dung post hấp dẫn để đăng mạng xã hội.

        Kết quả trả về theo format JSON như sau:
        {
        "posts": [
            {
            "post_id": number,
            "content": string,
            "short_description": string
            }
        ]
        }
        ';
        $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . "apikey",//test xong Ctrl z lai
        'Content-Type' => 'application/json',
    ])->post('https://api.openai.com/v1/chat/completions', [
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'user', 'content' => $content]
        ]
    ]);

    return $response->json();
    }
     public function chatBot1(Request $request) {
        $ingredients=$request-> ingredients;
        $ingredientsJson = json_encode($ingredients, JSON_UNESCAPED_UNICODE);
        $posts = Post::with('ingredients')
        ->select('post_id','title','difficulty','cook_time')
        ->skip(0)->take(5)->get();

        $postsJson = json_encode($posts, JSON_UNESCAPED_UNICODE);
        $content = "
            Bạn là chuyên gia sáng tạo nội dung ẩm thực.

            Nhiệm vụ:
            - Viết nội dung gợi ý đăng bài cho từng công thức
            - Nội dung ngắn gọn, hấp dẫn
            - Trả đúng post_id
            - Liệt kê nguyên liệu còn thiếu
            - Trả về JSON hợp lệ

            Danh sách công thức:
            $postsJson

            Nguyên liệu hiện có:
            $ingredientsJson

            Format JSON:
            {
            \"posts\": [
                {
                \"post_id\": number,
                \"title\": string,
                \"description\": string,
                \"difficulty\": string,
                \"cook_time\": string,
                \"needIngredients\": []
                }
            ]
            }
            ";
        $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . "apikey",//test xong Ctrl z lai
        'Content-Type' => 'application/json',
    ])->post('https://api.openai.com/v1/chat/completions', [
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'user', 'content' => $content]
        ],    'temperature' => 0.7
    ]);

    return $response->json();//response()->json(["ingredient"=> $postsJson]);//,"ketqua"=>$response->json()],200);//$response->json();
    }
}
