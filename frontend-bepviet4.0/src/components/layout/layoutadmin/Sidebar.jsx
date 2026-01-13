import { useState, useEffect } from "react";
import { LayoutDashboard, Users, FileText, List, Settings, LogOut, ChevronRight } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const [activeItem, setActiveItem] = useState("Tổng quan");

  const handleItemClick = (label) => {
    setActiveItem(label);
    // Trên mobile, chọn xong thì tự đóng menu cho thoáng
    if (window.innerWidth < 1024) onClose(); 
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-40 lg:border-r
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Mobile Header Inside Sidebar */}
        <div className="h-16 flex items-center justify-between px-6 border-b lg:hidden">
          <span className="text-xl text-green-600 font-bold">Menu Quản Lý</span>
          <button onClick={onClose} className="p-2 text-gray-400">✕</button>
        </div>

        <nav className="p-4 space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Tổng quan" 
            active={activeItem === "Tổng quan"} 
            onClick={() => handleItemClick("Tổng quan")} 
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Người dùng" 
            active={activeItem === "Người dùng"} 
            onClick={() => handleItemClick("Người dùng")} 
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="Bài viết" 
            active={activeItem === "Bài viết"} 
            onClick={() => handleItemClick("Bài viết")} 
          />
          <NavItem 
            icon={<List size={20} />} 
            label="Danh mục" 
            active={activeItem === "Danh mục"} 
            onClick={() => handleItemClick("Danh mục")} 
          />

          <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Hệ thống
          </div>

          <NavItem 
            icon={<Settings size={20} />} 
            label="Cài đặt" 
            active={activeItem === "Cài đặt"} 
            onClick={() => handleItemClick("Cài đặt")} 
          />
          
          {/* Cần thêm onClick cho Đăng xuất hoặc dùng thẻ <a> / <Link> */}
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Đăng xuất" 
            color="text-red-500 hover:bg-red-50" 
            onClick={() => console.log("Logout logic...")}
          />
        </nav>
      </aside>
    </>
  );
}

// Đừng quên cập nhật Component NavItem để nhận prop onClick
function NavItem({ icon, label, active, onClick, color = "text-gray-700" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
        ${active 
          ? "bg-yellow-400 text-white shadow-md shadow-yellow-200" 
          : `hover:bg-gray-100 ${color}`}
      `}
    >
      <div className="flex items-center gap-3 text-sm font-medium">
        {icon}
        <span>{label}</span>
      </div>
      {active && <ChevronRight size={14} />}
    </button>
  );
}