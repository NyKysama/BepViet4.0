<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
//khai bao model
use App\Models\User;
use Nette\Utils\Json;

class LoginController extends Controller
{
    /**
     * Kiem tra dang nhap user
     * @param \Illuminate\Http\Request $request*username,password
     * @return Json(thong tin user kem token)
     */
    public function loginUser(Request $request){
        //validate
        $data=$request->validate([
            "username"=>'required',
            'password'=>'required',
        ]);
        
        //fake data
        // $data=[
        //     "username"=>"kietbeve",
        //     "password"=>"123",
        // ];
      
        $user=User::Where('username',$data["username"])->first();

        //Check Login
        if(! $user || ! Hash::check($data["password"], $user->password)){
             return response()->json(['message' => 'Sai ten tai khoan hoac mat khau',"success"=>false,], 401);
        }
        $user->posts;
        $user->cookbooks;
        $user->followers;
        $user->followings;
        $url=$user->avatar;
        $user->avatar_url="http://127.0.0.1:8000/images/".$user->avatar;


        //jwt
        // $token = JWTAuth::fromUser($user);

        if(!$user){
            return response()->json([
            // 'access_token' => $token,
            "message"=>"Dang nhap that bai",
            "success"=>false,
            // 'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         =>$user,
        ],404);
        }
    

        // Trả về token
        return response()->json([
            // 'access_token' => $token,
            "message"=>"Dang nhap thanh cong",
            "success"=>true,
            // 'expires_in'   => auth()->factory()->getTTL() * 60,
            'user'         =>$user,
        ],200);
    }
}
