<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller{
    public function getCategory(){
        $category = Category::getAll();
        return response()->json($category) ;
    }

    //hàm kiểm tra dl đầu vào
    public function checkValidate(Request $request){
        $validate = $request->validate([
            'name' => 'required|string|unique:categories,name|max:100'
        ]);
        return $validate;
    }
    public function createCategory(Request $request){
        $validate = $this->checkValidate($request);
        Category::create($validate);
        return response()->json(['message'=>'Tạo danh mục mới thành công ']);
    }
    public function edit($id){
        $ing = Category::findOrFail($id);
        return response()->json($ing);
    }
    
    public function destroy($id){
        $ing = Category::findOrFail($id);
        $ing->delete();
        return response()->json(['message'=>'Xóa nguyên liệu thành công ']);
    }

    public function update(Request $request, $id){
        $ing = Category::findOrFail($id);
        $validate = $request->validate([
            'name' => 'required|string|max:100|unique:categories,name,'. $id .',category_id'
        ]);
        $ing->update(['name'=>$request->name]);
        return response()->json(['message'=>'Sửa nguyên liệu thành công ']);
    }

}
