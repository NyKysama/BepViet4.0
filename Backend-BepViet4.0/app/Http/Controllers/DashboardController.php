<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
//use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats(Request $request)
    {
        // 1. Tổng số người dùng (loại trừ admin nếu cần)
        $totalUsers = User::count();

        // 2. Tổng số bài đăng (Công thức & Bài viết)
        $totalRecipes = Post::countRecipes();
        $totalBlogs   = Post::countBlog();

        // 3. Biểu đồ tăng trưởng bài đăng (Tùy chỉnh: date, week, month)
        $filter = $request->query('filter', 'month'); // dl truyền vào để lọc mặc định theo tháng
        $growthData = $this->getGrowthData($filter); // hàm tự định nghĩa bên dưới

        // 4. Bài viết chờ duyệt (Trạng thái status = 0 hoặc 'pending')
        $pendingPost = Post::pending();

        // // 5. Danh sách báo cáo/report mới nhất
        // $reports = Report::with(['user', 'post'])
        //     ->orderBy('created_at', 'desc')
        //     ->take(10)
        //     ->get();

        return response()->json([
            'summary' => [
                'total_users' => $totalUsers,
                'total_recipes' => $totalRecipes,
                'total_blogs' => $totalBlogs,
            ],
            'chart' => $growthData,
            'pending_posts' => $pendingPost,
            //'reports' => $reports
        ]);
    }

    // Lấy dữ liệu tăng trưởng bài đăng theo filter
    private function getGrowthData($filter)
    {
        // truy vấn để lấy số lượng bài đăng theo ngày/tuần/tháng
        $query = Post::select(
            DB::raw('COUNT(*) as count'), 
            DB::raw($this->getGroupBySql($filter)) // ham tự định nghĩa bên dưới
        )
        ->where('created_at', '>=', now()->subYear()) // Lấy dữ liệu trong 1 năm đổ lại
        ->groupBy('label')
        ->orderBy('label', 'asc');

        return $query->get();
    }

    // Trả về câu SQL để nhóm theo ngày, tuần, tháng
    private function getGroupBySql($filter)
    {
        //Trả về câu SQL tương ứng với filter
        return match ($filter) {
            'day'   => "DATE_FORMAT(created_at, '%d-%m-%Y') as label",
            'week'  => "YEARWEEK(created_at, '%d-%m) as label",
            default => "DATE_FORMAT(created_at, '%m-%Y') as label", // month
        };
    }
}
