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

use Illuminate\Support\Facades\DB;


class PostController extends Controller
{

    // hàm hiện thị danh sách bài viết
    public function getAllPosts()
    {
        $posts = Post::getAll();
        return response()->json($posts);
    }

    //lấy ds post ch đc duyệt 
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

    // hàm tải ảnh 
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

    // hàm lấy dl của id blog đưa lên form 
    public function editBlog($id)
    {
        // lấy blog cùng id, kết vs bảng 
        $post = Post::with('categories')->where('type', 'Blog')->find($id);
        return response()->json($post);
    }

    // lấy blog cùng id, kết hợp kết bảng user và nguyên liệu để hiển thị 
    public function blogDetail($id)
    {
        $post = Post::with('categories', 'user')->where('type', 'Blog')->find($id);
        return response()->json($post);
    }

    // hàm chi tiết công thức  
    public function recipeDetail($id)
    {
        // lấy công thức cùng id, kết hợp kết bảng user và nguyên liệu để hiển thị 
        $post = Post::with('user', 'ingredients')->where('type', 'Công thức')->find($id);
        $steps = Step::getStepByPostID($id); // lấy ds các bước cùng id 
        
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

    // hàm xóa dl có id = id (chỉ xóa mềm)
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Đã ẩn thành công']);
    }

    // lấy dl dl bị xóa 
    public function getTrash()
    {
        // CHỈ lấy những bài đã bị xóa mềm
        $posts = Post::onlyTrashed()->get();
        return response()->json($posts);
    }

    // khôi phục dl bị xóa
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
        if ($request->hasFile('img'))
            $imgPath = $this->uploadImg($request);
        else $imgPath=null;
        // Tạo blog
        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'img' => $imgPath,
            'type' => 'Blog',
            'user_id' => 6, // USER ĐANG ĐĂNG NHẬP
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
        $userId = $request->user_id; // lấy id người đang dn
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
      //1. Luu anh cua cong thuc
      $postImg = null;
        if ($request->hasFile('img')) {
            $file = $request->file('img');
            $fileName = time().'_'.$file->getClientOriginalName();
            $file->move(public_path('images'), $fileName);
            $postImg = 'images/'.$fileName;
        }
      //2. tao cong thuc
       $post = Post::create([
            'title'       => $request->title,
            'description' => $request->description,
            'img'         => $postImg,
            'type'        => $request->type,
            'cook_time'   => (int) $request->cook_time,
            'difficulty'  => $request->difficulty,
            'region'      => $request->region,
            'status'      => (int) $request->status,
            'user_id'     => 1, // tạm
            'slug'        => Str::slug($request->title),
        ]);
        //3. luu steps
        $steps = json_decode($request->input('steps'), true);
        foreach ($steps as $index => $step) {

            $stepImgPath = null;
            //luu anh tung buoc
            if ($request->hasFile("step_imgs.$index")) {
                $file = $request->file("step_imgs.$index");
                $fileName = time().'_'.$file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);
                $stepImgPath = 'images/'.$fileName;
            }

            Step::create([
                'post_id' => $post->post_id,
                'step'    => (int)$step['step'],
                'content' => $step['content'],
                'img'     => $stepImgPath,
            ]);
        }
        //4. luu category
        $categoryIdsStr = $request->input('category_ids');
        $categoryIds =array_map('intval',explode(",",$categoryIdsStr));
        $post->categories()->sync($categoryIds);
        //5. luu ingredient
        // $ingredients= $request->input('ingredients');
        $rawIngredients = json_decode($request->input('ingredients'), true);
        $syncData =[];
        foreach ($rawIngredients as $item) {
           
                $syncData[(int)$item['ing_id']] = [
                    'amount' => (float) ($item['amount'] ?? 0),
                    'unit'   => $item['unit'] ?? null,
                ];
            }
        $post->ingredients()->sync($syncData);
        
        return response()->json([
            'success' => true,
            'message' => 'Tạo công thức thành công, công thức của bạn sẽ sớm được duyệt',
            'post' => $post,
            "steps"=>$steps,
            "all"=>$request->all(),
            "categories"=>$categoryIds,
            "ingredient"=>$rawIngredients,
        ], 200);
    }


    // hàm tìm kiếm
    public function search(Request $request) {
        
        $posts = Post::when($request->searchQuery, function ($query) use ($request) {
        $query->where('title', 'LIKE',  "%{$request->searchQuery}%" );
            })->get();


        return response()->json(["posts"=>$posts,
        "searchQuery"=>$request->searchQuery,],200);
        }


    // hàm lọc theo điều kiện kết hợp
    public function filter(Request $request){
        $query = Post::query();

        //Search theo tiêu đề
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->searchQuery . '%');
        }
        //Vùng miền
        if ($request->filled('region')) {
            $query->where('region', $request->region);
        }
        //Độ khó
        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }
        //Thời gian nấu (<= phút)
        if ($request->filled('cook_time')) {
            $time = (int) $request->cook_time;

            if ($time === 61) {
                // Trên 60 phút
                $query->where('cook_time', '>', 60);
            } else {
                // Dưới 15, 30, 60 phút
                $query->where('cook_time', '<=', $time);
            }
        }
        $posts = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'posts' => $posts
        ]);
    }

}
