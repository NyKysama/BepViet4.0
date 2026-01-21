<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Step;
use App\Models\User;
use Laravel\Pail\ValueObjects\Origin\Console;
use DB;


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
    public function getPosts()
    {
        //lay tat ca post
        $posts = Post::skip(0)->take(5)->get();
        return response()->json([
            "posts" => $posts,
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
        $post = Post::with('categories', 'user')->where('type', 'Blog')->find($id);
        return response()->json($post);
    }

    public function recipeDetail($id)
    {
        $post = Post::with('user', 'ingredients')->where('type', 'Công thức')->find($id);
        $steps = Step::getStepByPostID($id);
        
        return response()->json([
            'post' => $post,
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
    public function forceDestroy($id)
    {
        $post = Post::findOrFail($id);
        $post->forceDelete();

        return response()->json(['message' => 'Bài post đã bị xóa']);
    }

    //hiện ds post trên trang chủ
    public function getNewsFeeds(Request $request)
    {
        $userId = Auth::id(); // lấy id người đang dn
        $seed = $request->seed ?? rand(1, 999999);// dùng để cố định bài post trong trang page 
        $sevenDaysAgo = now()->subDays(7)->toDateTimeString();// điều kiện trong 3 ngày 

        // 1. Lấy danh sách ID người đang follow
        $followingIds = DB::table('follows')
            ->where('follower_id', $userId)
            ->pluck('following_id')
            ->toArray();
        $followingIdsString = !empty($followingIds) ? implode(',', $followingIds) : '0';

        // 2. Truy vấn nếu id user có trong mảng sẻ lấy hết bài post cảu user đó sau đó lại lấy số bài post của ng ch follow 
        $posts = Post::with('user')
            ->where('status', 1)
            ->orderByRaw("
            CASE 
                WHEN user_id IN ($followingIdsString) AND created_at >= '$sevenDaysAgo' THEN 1 
                WHEN user_id NOT IN ($followingIdsString) AND created_at >= '$sevenDaysAgo' THEN 2               
                ELSE 3 
            END ASC,
            RAND($seed)
        ")
            /* Xáo trộn ngẫu nhiên trong từng nhóm để mỗi lần vào là một trải nghiệm khác */
            //->inRandomOrder($seed)
            ->simplePaginate(10); // số post trong 1 page 
        
        return response()->json($posts);
    }

    // hàm tạo câu hỏi
    public function createQuestion(Request $request)
    {
        $validate = $request->validate([
            'description' => 'required',
        ]);
        Post::create([
            'description' => $request->description,
            'type' => 'Question',
            'user_id' => Auth::id(),
            'slug' => Str::slug($request->description),
            'status' => 0,
        ]);
        return response()->json(['message' => 'Tạo câu hỏi thành công']);
    }


    //hàm tạo công thức
    public function createRecipe(Request $request){
       return response()->json([
        'success' => true,
        'message' => 'Backend đã nhận được dữ liệu',
        'data' => $request->all(),
        'files' => $request->file()
    ], 200);

    //     $validate = $request->validate([
    //         'title' => 'required|max:150',
    //         'description' => 'required',
    //         'category_ids' => 'nullable|array',
    //         'img' => 'nullable|image|max:2048',
    //         'steps' => 'required|array',
    //         'ingredients' => 'required|array',
    //         'cook_time' => 'nullable|integer',
    //         'difficulty'=> 'nullable|string',
    //         'region'=> 'nullable|string',
    //     ]);
    //     // 2. Dùng Transaction để đảm bảo an toàn dữ liệu
    // return DB::transaction(function () use ($request) {
    //     $img = $this->uploadImg($request);
    //     // A. Tạo bài viết gốc (Post)
    //     $recipe = Post::create([
    //         'title'       => $request->title,
    //         'description' => $request->description,
    //         'type'        => 'Recipe',
    //         'cook_time'   => $request->cook_time,
    //         'difficulty'  => $request->difficulty,
    //         'region'      => $request->region,
    //         'user_id'     => auth()->id(),
    //         'slug'        => Str::slug($request->title) . '-' . uniqid(),
    //         'img'         => $img,
    //         'status'      => 0,
    //     ]);

    //     // B. Lưu các bước (Steps)
    //     foreach ($request->steps as $index => $item) {
    //         $stepImgPath = null;

    //         // Kiểm tra xem tại vị trí index này có file ảnh được upload lên không
    //         if ($request->hasFile("steps.$index.img")) {
    //             $file = $request->file("steps.$index.img");
    //             $destinationPath = public_path('images'); // đi đến thư mục lưu trữ ảnh
    //             $originalName = $file->getClientOriginalName(); // Lấy tên gốc của file
    //             $pathForDB = $destinationPath . '/' . $originalName;
    //             // 2. KIỂM TRA: Nếu file CHƯA TỒN TẠI thì mới tạo/di chuyển vào
    //             if (file_exists($pathForDB)) {
    //                 file($pathForDB);
    //             }
    //             // Tạo tên file duy nhất: 2024_01_14_65a3b_slug.png
    //             $avatarName = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
    //             // 2. Di chuyển file thẳng vào thư mục public/images của dự án
    //             $file->move(public_path('images'), $avatarName);
    //             $stepImgPath = 'images/' . $avatarName;
    //         }
    //         $recipe->steps()->create([
    //             'steps' => $item['step'],
    //             'content'     => $item['content'],
    //             'img' => $stepImgPath,                
    //         ]);
    //     }

    //     // C. Lưu nguyên liệu (Ingredients)
    //     foreach ($request->ingredients as $item) {
    //         // Giả sử quan hệ là $recipe->ingredients()
    //         $recipe->ingredients()->create([
    //             'name'   => $item['name'],
    //             'amount' => $item['amount']
    //         ]);
    //     }

    //     // D. Gắn danh mục (Categories) - Quan hệ N-N
    //     $recipe->categories()->sync($request->category_ids);

    //     return response()->json([
    //         'message' => 'Đã đăng công thức thành công!',
    //         'id'      => $recipe->id
    //     ], 201);
    // });

    }


    // hàm tìm kiếm
    public function search(Request $request) {
    // $query = Post::query(); // 

    // // 1. Kiểm tra nếu có từ khóa tìm kiếm
    // if ($request->has('search') && $request->search != '') {
    //     $searchTerm = $request->search;
    //     $query->where(function($q) use ($searchTerm) {
    //         $q->where('title', 'LIKE', "%{$searchTerm}%")
    //         ->orWhere('content', 'LIKE', "%{$searchTerm}%");
    //     });
    // }

    // 2. Logic phân trang kết hợp seed (giữ nguyên logic cũ của bạn)
    // $posts = $query->paginate(10); 

    $posts = Post::when($request->searchQuery, function ($query) use ($request) {
    $query->where('title', 'LIKE',  "%{$request->searchQuery}%" );
        })->get();


    return response()->json(["posts"=>$posts,
    "searchQuery"=>$request->searchQuery,],200);
    }

}
