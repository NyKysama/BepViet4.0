<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
//khai bao model
use App\Models\User;
use Nette\Utils\Json;

class AdminController extends Controller
{

    /**
     * Kiem tra dang nhap user
     * @param \Illuminate\Http\Request $request*username,password
     * @return Json(thong tin user kem token)
     */
    public function loginAdmin(Request $request){
        //validate
        $data=$request->validate([
            "username"=>'required',
            'password'=>'required',
        ]);

        $user=User::Where('username',$data["username"])->where('role', 'admin')->first();

        //Check Login
        if(! $user || ! Hash::check($data["password"], $user->password)){
            return response()->json(['message' => 'Sai ten tai khoan, mat khau hoac bạn không có quyền này',"success"=>false,], 401);
        }
    

        // Trả về token
        return response()->json([
            // 'access_token' => $token,
            "message"=>"Dang nhap vao admin thanh cong",
            "success"=>true,
            // 'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         =>$user,
        ],200);
    }
}
