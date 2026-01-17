<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cookbook;

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
                'data' => $cookbook
            ], 200);
        }
    }
}
