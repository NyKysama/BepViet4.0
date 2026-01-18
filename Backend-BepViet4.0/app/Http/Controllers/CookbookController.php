<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cookbook;
use App\Models\User;

class CookbookController extends Controller
{
    //
    public function createCookbook(Request $request){
        // 1. Validate dữ liệu
        $request->validate([
            "user_id"=>"required|exists:users,user_id",
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120', // 5MB
        ]);

         // 2. Tạo cookbook
        $cookbook = new Cookbook();
        $cookbook->user_id = $request->user_id; // hoặc $request->user_id
        $cookbook->name = $request->name;
        $cookbook->description = $request->description;

        // 3. Upload ảnh nếu có
        if ($request->hasFile('image_file')) {
           $file = $request->file('image_file');

            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

            // đường dẫn vật lý
            $destinationPath = public_path('images');

            // tạo folder nếu chưa có
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            // di chuyển file
            $file->move($destinationPath, $filename);

            // lưu path vào DB
            $cookbook->image = 'images/' . $filename;
             $cookbook->save();

            return response()->json([
                'message' => 'Tạo cookbook thành công',
                'newCookbook' => $cookbook
            ], 200);
        }
    }
    //xoa cookbook
    public function delete($cookbook_id){
        Cookbook::where("cookbook_id",$cookbook_id)->delete();
        return response()->json(["message"=>"Xoa thanh cong coobook so: ".$cookbook_id],200);
    }
    //lay chi tieet cookbook gom ten ng so huu, thong tin cookbook, danh sach cong thuc cua cookbook
    public function getCookbookDetail($username,$name){//name la ten cua cookbook
        $user=User::where("username",$username)->first();
        $cookbook=Cookbook::where([["name",$name],["user_id",$user->user_id],])->first();
        return response()->json(["message"=>"Lay chi tiet cookbook thanh cong",
        "cookbook"=>$cookbook,
        "user"=>$cookbook->user,
        "posts"=>$cookbook->posts,
        ],200);
    }
    //huy lien ket 1 post den cookbook
    public function detachCoobook_Post($cookbook_id,$post_id){
        $cookbook = Cookbook::where("cookbook_id",$cookbook_id)->first();

        $cookbook->posts()->detach($post_id);

        return response()->json([
            'message' => 'Đã gỡ post khỏi cookbook'
        ],200);
    }
}
