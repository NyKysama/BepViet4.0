<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingredient;

class IngredientController extends Controller
{
    //hàm lấy ds nguyên liệu
    public function getIng(){
        $ing = Ingredient::all();
        return response()->json($ing);
    }
    //hàm kiểm tra dl đầu vào
    public function checkValidate(Request $request){
        $validate = $request->Validate([
            'name' => 'required|string|unique:ingredients,name|max:100'
        ]);
        return $validate;
    }
    public function createIng(Request $request){
        $validate = $this->checkValidate($request);
        Ingredient::create($validate);
        return response()->json(['message'=>'Tạo nguyên liệu mới thành công ']);
    }

    public function edit($id){
        $ing = Ingredient::find($id);
        return response()->json($ing);
    }

    public function destroy($id){
        $ing = Ingredient::findOrFail($id);
        return response()->json(['message'=>'Xóa nguyên liệu thành công ']);
    }

    public function update(Request $request, $id){
        $ing = $ing = Ingredient::find($id);
        $validate = $this->checkValidate($request);
        $ing::update($validate);
        return response()->json(['message'=>'Sửa nguyên liệu thành công ']);
    }
}
