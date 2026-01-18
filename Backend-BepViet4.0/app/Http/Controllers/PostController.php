<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Step;
use Laravel\Pail\ValueObjects\Origin\Console;


class PostController extends Controller
{

    // hàm hiện thị danh sách bài viết
    public function getAllPosts()
    {
        $posts = Post::getAll();
        return response()->json($posts);
    }

    public static function pendingPost()
    {
        $posts = Post::pendingPosts();
        return response()->json($posts);
    }

    //lay tat ca post
    public function getPosts(){
        //lay tat ca post
        $posts=Post::skip(0)->take(5)->get();
        return response()->json(["posts"=>$posts,
        ]);
    }

    public function uploadImg(Request $request)
    {
        //nếu có file ảnh đc gửi lên
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $destinationPath = public_path('images'); // đi đến thư mục lưu trữ ảnh
            $originalName = $file->getClientOriginalName(); // Lấy tên gốc của file
            $pathForDB = $destinationPath . '/' . $originalName;
            // 2. KIỂM TRA: Nếu file CHƯA TỒN TẠI thì mới tạo/di chuyển vào
            if (file_exists($pathForDB)) {
                file($pathForDB);
            }
            // Tạo tên file duy nhất: 2024_01_14_65a3b_slug.png
            $avatarName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
            // 2. Di chuyển file thẳng vào thư mục public/images của dự án
            $file->move(public_path('images'), $avatarName);
            return 'images/' . $avatarName;
        }
        // Ngược lại nếu KHÔNG CÓ file ảnh đc gửi lên
        return 'images/no_img.png';
    }

    // hàm update trạng thái
    public function updateStatus(Request $request, $id)
    {
        // Tìm bài viết
        $post = Post::findOrFail($id);

        // 'status' (0: chờ, 1: duyệt, 2: từ chối)
        $post->update([
            'status' => $request->action === 'update' ? 1 : 2
        ]);
        return response()->json([
            'message' => 'Đã cập nhật trạng thái thành công!',
        ]);
    }

    public function editBlog($id)
    {
        $post = Post::with('categories')->where('type', 'Blog')->find($id);
        return response()->json($post);
    }

    public function blogDetail($id)
    {
        $post = Post::with('categories','user')->where('type', 'Blog')->find($id);
        return response()->json($post);
    }

    public function recipeDetail($id){
        $post = Post::with('ingredients')->where('type', 'Công thức')->find($id);
        $steps = Step::getStepByPostID($id);
        return response()->json([
            'post'=>$post,
            'steps' => $steps
        ]);
    }

    // 2. Hàm Cập nhật
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $img = $this->uploadImg($request);
        $post->update([
            'img' => $img,
            'title' => $request->title,
            'description' => $request->description,
            'slug' => Str::slug($request->title),
        ]);
        // Cập nhật lại mối quan hệ Nhiều - Nhiều
        if ($request->has('category_id')) {// kiểm tra xem có điền danh mục ko       
            $val = $request->input('category_id');
            // Nếu chuỗi rỗng thì cho mảng rỗng để xóa hết danh mục cũ
            $ids = !empty($val) ? explode(',', $val) : [];
            // Ép kiểu về số nguyên để an toàn
            $ids = array_map('intval', $ids);

            // lệnh sync dùng để tạo, cập nhật, xóa các quan hệ nhìu nhìu khá phức tạp
            /*nói đại khái thì nó sẽ nhận 1 mảng các id dựa trên mối quan hệ nhìu nhìu để thêm dl cho bảng trong mối quan hệ 
            lưu ý lệnh này chỉ nhận mảng và phải có liên kết */
            $post->categories()->sync($ids);
        }
        return response()->json(['message' => 'Cập nhật thành công']);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Đã ẩn thành công']);
    }

    public function getTrash()
    {
        // CHỈ lấy những bài đã bị xóa mềm
        $posts = Post::onlyTrashed()->get();
        return response()->json($posts);
    }

    public function restore($id)
    {
        // Tìm bài viết TRONG CẢ những bài đã xóa mềm
        $post = Post::withTrashed()->find($id);

        if ($post && $post->trashed()) { // Kiểm tra xem có đúng là nó đang bị xóa không
            $post->restore(); // Khôi phục lại (deleted_at về NULL)
            return response()->json(['message' => 'Khôi phục thành công!']);
        }

        return response()->json(['message' => 'Không tìm thấy bài viết để khôi phục'], 404);
    }

    public function createBlog(Request $request) //18/01/2026
    {
    //Kiểm tra dữ liệu
    $request->validate([
        'title' => 'required|max:150',
        'description' => 'required',
        'category_id' => 'nullable|string',
        'img' => 'nullable|image|max:2048',
    ], [
        'title.required' => 'Tiêu đề không được để trống',
        'description.required' => 'Nội dung không được để trống',
    ]);
    // Upload ảnh
    $imgPath = $this->uploadImg($request);
    // Tạo blog
    $post = Post::create([
        'title' => $request->title,
        'description' => $request->description,
        'img' => $imgPath,
        'type' => 'Blog',
        'user_id' => auth()->id(), // USER ĐANG ĐĂNG NHẬP
        'slug' => Str::slug($request->title),
        'status' => 0, 
    ]);
    // Gán danh mục 
    if ($request->category_id) {
        $ids = array_map('intval', explode(',', $request->category_id));
        $post->categories()->sync($ids);
    }
    return response()->json([
        'message' => 'Đăng blog thành công, đang chờ duyệt',
        'post' => $post
    ], 201);
    }

    // hàm xóa post khỏi db
    public function forceDestroy($id) {
    $post = Post::findOrFail($id);
    $post->forceDelete();
    
    return response()->json(['message' => 'Bài post đã bị xóa']);
}
}
