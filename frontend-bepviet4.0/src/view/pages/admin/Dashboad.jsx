import React, { useState, useEffect } from 'react';
import {
  Users, ChefHat, FileText, AlertTriangle,
  Search, Bell, TrendingUp, Database, Server,
  Clock, CheckCircle, XCircle, ArrowUpRight
} from 'lucide-react';

export default function AdminMainContent() {
  // --- LOGIC KẾT NỐI BẰNG FETCH ---
  const [apiData, setApiData] = useState(null);
  const [liststatus, setListstatus] = useState(false);
  // gọi api lấy dữ liệu dashboard
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/dashboard/stats')
      .then(res => res.json())
      .then(data => setApiData(data));
  }, []);

  const [processingId, setProcessingId] = useState(null);
  // Xử lý hành động duyệt hoặc từ chối bài đăng
  const handleAction = async (postId, action) => {
    setProcessingId(postId); // Đang xử lý bài này nè
    // gọi api update trạng thái bài đăng
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/posts/${postId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        // Xóa bài đó ra khỏi danh sách hiển thị ngay lập tức
        setApiData(prev => ({
          ...prev,
          pending_posts: prev.pending_posts.filter(p => p.post_id !== postId)
        }));
      }
    } catch (err) {
      console.error("Lỗi rồi bro:", err);
    }
    setProcessingId(null); // Xong rồi
  };

  // --- ĐỔ DỮ LIỆU VÀO CÁC BIẾN  ---
  const statsData = [
    {
      title: "Tổng người dùng",
      value: apiData?.summary?.total_users?.toLocaleString() || "0",
      change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50"
    },
    {
      title: "Tổng bài đăng",
      value: apiData?.summary?.total_recipes?.toLocaleString() || "0",
      change: "+5%", icon: ChefHat, color: "text-orange-600", bg: "bg-orange-50"
    },
    {
      title: "Bài viết Blog",
      value: apiData?.summary?.total_blogs?.toLocaleString() || "0",
      change: "+2%", icon: FileText, color: "text-purple-600", bg: "bg-purple-50"
    },
    {
      title: "Báo cáo vi phạm",
      value: apiData?.reports?.length || "0",
      change: "Mới", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50"
    },
  ];

  const pendingRecipes = apiData?.pending_posts?.map(post => ({
    id: post.post_id,
    name: post.title,
    chef: post.user?.name || "Ẩn danh",
    time: post.created_at ? new Date(post.created_at).toLocaleTimeString('vi-VN') : "Vừa xong",
    category: post.type || "Công thức"
  })) || [];

  return (
    <main className="flex-1 bg-gray-50 p-8 overflow-y-auto h-screen">

      {/* 1. Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-500">Cập nhật lúc: {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 relative">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                {stat.change} <TrendingUp size={12} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* 3. Middle Section: Duyệt bài & Xu hướng */}
      <div className="grid grid-cols-12 gap-8 mb-8">

        {/* Bảng Duyệt Bài (Lấy từ BE) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-orange-500 w-5 h-5" />
              Bài đăng chờ duyệt
            </h3>
            {/* khi click vào xem tất cả thì hiện ra danh sách công thức chờ duyệt */}
            <button onClick={() => setListstatus(!liststatus)}
              className="text-sm text-emerald-600 font-bold hover:underline">{liststatus ? 'Thu gọn' : 'Xem tất cả'}</button>
          </div>
          <div className="w-full border border-gray-100 rounded-xl overflow-hidden bg-white">
            <div className="h-[350px] overflow-y-auto">
              <table className="w-full text-left border-collapse table-fixed min-w-[600px]">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase border-b border-gray-100 sticky top-0 bg-white z-10">
                    <th className="py-3 px-4 font-semibold w-[35%]">Tên món ăn</th>
                    <th className="py-3 px-4 font-semibold w-[25%]">Người đăng</th>
                    <th className="py-3 px-4 font-semibold w-[20%]">Thời gian</th>
                    <th className="py-3 px-4 font-semibold w-[20%] text-right">Hành động</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {/* 2. Logic: Nếu false thì slice lấy 5, nếu true thì lấy hết */}
                  {(liststatus ? pendingRecipes : pendingRecipes.slice(0, 5)).map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
                      <td className="py-4 px-4 font-bold text-gray-800 truncate">{item.name}</td>
                      <td className="py-4 px-4 text-gray-600 truncate">{item.chef}</td>
                      <td className="py-4 px-4 text-gray-500">{item.time}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button disabled={processingId === item.id}
                            onClick={() => handleAction(item.id, 'update')}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition">
                            <CheckCircle size={18} />
                          </button>
                          <button disabled={processingId === item.id}
                            onClick={() => handleAction(item.id, 'rej')}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition">
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* 3. Nếu danh sách trống hiển thị thông báo */}
                  {pendingRecipes.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-40 text-center text-gray-400 italic">
                        Hiện không có công thức nào chờ duyệt
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Cột Tăng trưởng (Mock) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="text-purple-600 w-5 h-5" />
              Tăng trưởng
            </h3>
            {/* Bộ lọc theo ngày tuần tháng */}
            <div className="flex bg-gray-50 border border-gray-100 p-1 rounded-lg">
              {['day', 'week', 'month'].map((f) => (
                <button
                  key={f}
                  className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${'hover:bg-white hover:shadow-sm uppercase text-gray-500'
                    }`}
                  onClick={() => {
                    fetch(`http://127.0.0.1:8000/api/admin/dashboard/stats?filter=${f}`) // gọi api chart theo filter
                      .then(res => res.json())
                      .then(data => setApiData(data));
                  }}
                >
                  {f === 'day' ? 'D' : f === 'week' ? 'W' : 'M'}
                </button>
              ))}
            </div>
          </div>

          {/* Khu vực hiển thị biểu đồ */}
          <div className="flex-1 overflow-x-auto">
            <div className="overflow-x-auto flex items-end justify-between h-40 gap-1 px-1 min-w-[100px]">
              {apiData?.chart?.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group relative min-w-[50px] h-full justify-end">
                  {/* Cột dữ liệu */}
                  <div
                    className="w-full bg-gradient-to-t from-orange-400 to-orange-300 rounded-t-sm transition-all duration-700 hover:from-orange-500 hover:to-orange-400 cursor-pointer"
                    style={{
                      // Tính toán chiều cao: (giá trị / max) * 100%
                      height: `${Math.max((item.count / (Math.max(...apiData.chart.map(i => i.count)) || 1)) * 100, 5)}%`
                    }}
                  >
                    {/* Tooltip hiện số lượng */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.count} bài
                    </div>
                  </div>
                  {/* Label ngày/tháng */}
                  <span className="text-[9px] text-gray-400 mt-2 truncate w-full text-center">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

