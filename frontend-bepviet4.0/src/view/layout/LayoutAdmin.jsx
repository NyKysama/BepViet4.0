import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/layout/layoutadmin/Header";
import Sidebar from "../../components/layout/layoutadmin/Sidebar"; 
import Footer from "../../components/layout/layoutadmin/Footer";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* 1. Header luôn ở trên cùng */}
      <Header onOpenMenu={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1 pt-16 relative overflow-hidden">
      {/* 2. Sidebar điều hướng */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* 3. KHU VỰC CHÍNH (MAIN + FOOTER) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50 no-scrollbar">
            {/* Nội dung các trang con (User, Product, v.v.) sẽ hiện ở đây */}
            <Outlet />
          </main>

          {/* 4. FOOTER: Nằm dưới cùng của main content */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

// Nội dung Dashboard giả định
// function DefaultDashboard() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {[
//         { label: "Tổng doanh thu", val: "128,4M", color: "bg-blue-500" },
//         { label: "Công thức mới", val: "+24", color: "bg-orange-500" },
//         { label: "Đầu bếp mới", val: "12", color: "bg-green-500" },
//         { label: "Lượt truy cập", val: "1,240", color: "bg-purple-500" }
//       ].map((stat, i) => (
//         <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
//           <div className="flex items-end justify-between">
//             <p className="text-2xl font-black text-gray-800">{stat.val}</p>
//             <div className={`w-8 h-8 rounded-lg ${stat.color} opacity-20`}></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
//}