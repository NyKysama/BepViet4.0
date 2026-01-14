<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function checkValidation(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'username' => 'required|string|unique:users,username|max:50',
                'password' => 'required|string|min:6',
                'gmail' => 'required|email|unique:users,gmail',
                'phone' => 'nullable|string|max:15',
                'birthday' => 'nullable|date',
                'sex' => 'nullable|in:Nam,Nữ,Khác',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'password_confirmation' => 'required|same:password',
            ],
            [
                'name.required' => 'Tên không được để trống.',
                'username.required' => 'Tên đăng nhập không được để trống.',
                'username.unique' => 'Tên đăng nhập đã tồn tại.',
                'password.required' => 'Mật khẩu không được để trống.',
                'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
                'gmail.required' => 'Email không được để trống.',
                'gmail.email' => 'Email không đúng định dạng.',
                'gmail.unique' => 'Email đã tồn tại.',
                'avatar.image' => 'File tải lên phải là ảnh.',
                'avatar.mimes' => 'Ảnh phải có định dạng: jpeg, png, jpg, gif.',
                'avatar.max' => 'Kích thước ảnh không được vượt quá 2MB.',
                'password_confirmation.required' => 'Xác nhận mật khẩu không được để trống.',
                'password_confirmation.same' => 'Xác nhận mật khẩu không khớp với mật khẩu.',
            ]
        );
        return $validator;
    }

    public function CreateUser(Request $request, $avatarName)
    {
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password), // Mã hóa mật khẩu
            'gmail' => $request->gmail,
            'phone' => $request->phone,
            'birthday' => $request->birthday,
            'sex' => $request->sex,
            'avatar' => 'avatars/' . $avatarName,
            'slug' => Str::slug($request->name) . '-' . Str::random(5), // Tạo slug duy nhất
            'role' => 'user',    // Mặc định là user
            'status' => 1,         // Mặc định là đang hoạt động
        ]);
        return $user;
    }
    public function register(Request $request)
    {
        // 1. Validate dữ liệu đầu vào
        $validator = $this->checkValidation($request);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // 2. Xử lý Upload Ảnh
        $avatarName = 'default-avatar.png'; // Tên mặc định nếu user không upload
        $pathForDB = null;
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            // Tạo tên file duy nhất: 2024_01_14_65a3b_slug.png
            $avatarName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            // 2. Di chuyển file thẳng vào thư mục public/images của dự án
            $file->move(public_path('images'), $avatarName);
            $pathForDB = 'images/' . $avatarName;
        }

        $user = $this->CreateUser($request, $pathForDB);

        return response()->json([
            'status' => 'success',
            'message' => 'Tạo tài khoản thành công rồi bro!',
            'user' => $user
        ], 201);
    }
}