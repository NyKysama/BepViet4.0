import React from 'react';
import { 
  Users, ChefHat, FileText, AlertTriangle, 
  Search, Bell, TrendingUp, Database, Server, 
  Clock, CheckCircle, XCircle, ArrowUpRight
} from 'lucide-react';

// --- MOCK DATA (Dữ liệu giả lập) ---

const statsData = [
  { title: "Tổng người dùng", value: "12,340", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Công thức món ăn", value: "8,540", change: "+5%", icon: ChefHat, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Bài viết Blog", value: "1,203", change: "+2%", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Báo cáo vi phạm", value: "15", change: "-5%", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
];

const pendingRecipes = [
  { id: 101, name: "Phở Bò Gia Truyền", chef: "Bếp Cô Ba", time: "10 phút trước", category: "Món nước" },
  { id: 102, name: "Gỏi Cuốn Tôm Thịt", chef: "Minh Foodie", time: "35 phút trước", category: "Khai vị" },
  { id: 103, name: "Canh Chua Cá Lóc", chef: "User Mới", time: "1 giờ trước", category: "Món chính" },
  { id: 104, name: "Chè Trôi Nước", chef: "SweetHome", time: "2 giờ trước", category: "Tráng miệng" },
];

const trendingRecipes = [
  { name: "Cơm Tấm Sài Gòn", views: 95, color: "bg-orange-500" },
  { name: "Bún Bò Huế", views: 82, color: "bg-orange-400" },
  { name: "Bánh Mì Chảo", views: 65, color: "bg-orange-300" },
  { name: "Nem Nướng", views: 45, color: "bg-orange-200" },
];

const mongoLogs = [
  { id: 1, action: "SEARCH: 'thịt heo kho'", user: "User #882", time: "Just now" },
  { id: 2, action: "AI: Generated Menu Plan", user: "User #99", time: "15s ago" },
  { id: 3, action: "SYSTEM: Backup Shopping List", user: "System", time: "1m ago" },
  { id: 4, action: "LOGIN: New device detected", user: "User #102", time: "5m ago" },
];

// --- MAIN COMPONENT ---

export default function AdminMainContent() {
  return (
    <main className="flex-1 bg-gray-50 p-8 overflow-y-auto h-screen">
      
      {/* 1. Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-500">Cập nhật lúc: {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-3">
            {/* Thanh tìm kiếm */}
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            {/* Nút thông báo */}
            <button className="bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 relative">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
        </div>
      </header>

      {/* 2. Stats Grid (Thống kê 4 thẻ) */}
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
        
        {/* Bảng Duyệt Bài (Chiếm 8 phần) */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="text-orange-500 w-5 h-5" />
              Công thức chờ duyệt
            </h3>
            <button className="text-sm text-emerald-600 font-bold hover:underline">Xem tất cả</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b border-gray-100">
                  <th className="py-3 font-semibold">Tên món ăn</th>
                  <th className="py-3 font-semibold">Đầu bếp</th>
                  <th className="py-3 font-semibold">Thời gian</th>
                  <th className="py-3 font-semibold text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {pendingRecipes.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50 transition">
                    <td className="py-4 font-bold text-gray-800">
                        {item.name} 
                        <span className="block text-xs text-gray-400 font-normal mt-0.5">{item.category}</span>
                    </td>
                    <td className="py-4 text-gray-600">{item.chef}</td>
                    <td className="py-4 text-gray-500">
                        <div className="flex items-center gap-1"><Clock size={14} /> {item.time}</div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition" title="Duyệt">
                          <CheckCircle size={18} />
                        </button>
                        <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition" title="Từ chối">
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cột Xu Hướng (Chiếm 4 phần) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="text-purple-600 w-5 h-5" />
                Xu hướng tìm kiếm
            </h3>
            <div className="space-y-6">
                {trendingRecipes.map((item, idx) => (
                <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-gray-700">{item.name}</span>
                    <span className="text-gray-500 text-xs">{item.views}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                        className={`${item.color} h-full rounded-full transition-all duration-1000`} 
                        style={{ width: `${item.views}%` }}
                    ></div>
                    </div>
                </div>
                ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-center justify-between border border-blue-100">
             <div>
                <p className="text-xs text-blue-800 font-bold mb-0.5">Người dùng mới</p>
                <p className="text-lg font-bold text-blue-600">+120</p>
             </div>
             <ArrowUpRight className="text-blue-600" />
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: MongoDB Logs & Server Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        
        {/* MongoDB Logs (Giao diện Terminal) */}
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-xl text-gray-300">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Database className="text-emerald-500 w-5 h-5" />
              MongoDB Live Logs
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-mono border border-emerald-500/30">CONNECTED</span>
          </div>
          <div className="font-mono text-sm space-y-3">
            {mongoLogs.map((log) => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 hover:bg-gray-800 p-2 rounded transition border-l-2 border-transparent hover:border-emerald-500">
                <span className="text-gray-500 text-xs min-w-[60px]">{log.time}</span>
                <span className="text-emerald-400 font-bold min-w-[80px]">[{log.user}]</span>
                <span className="text-gray-300 flex-1 break-all"> {log.action}</span>
              </div>
            ))}
            <div className="text-xs text-emerald-500/50 pt-2 animate-pulse pl-2">_ Waiting for data stream...</div>
          </div>
        </div>

        {/* Server Health */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Server className="text-gray-600 w-5 h-5" />
            Trạng thái Server
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500 font-medium">CPU Usage</span>
                <span className="text-gray-800 font-bold">45%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500 font-medium">Memory (RAM)</span>
                <span className="text-gray-800 font-bold">72%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full w-[72%]"></div>
              </div>
            </div>

            <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500 font-medium">Storage</span>
                  <span className="text-gray-800 font-bold">28%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[28%]"></div>
                </div>
              </div>
          </div>
        </div>

      </div>

    </main>
  );
}