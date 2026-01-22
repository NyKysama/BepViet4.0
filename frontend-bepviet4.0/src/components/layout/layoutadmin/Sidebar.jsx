import { useState } from "react";
import { LayoutDashboard, Users, FileText, List, Settings, LogOut, ChevronRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAdminAccount } from '../../../contexts/user/adminAccountContex'; 

export default function Sidebar({ isOpen, onClose }) {
  const { adminAccount, setAdminAccount } = useAdminAccount();
  const navigate = useNavigate();
  const location = useLocation();

  // Tự động xác định menu active dựa trên URL hiện tại
  const getActiveLabel = () => {
    if (location.pathname.includes("/admin/user")) return "Người dùng";
    if (location.pathname.includes("/admin/post")) return "Bài viết";
    if (location.pathname.includes("/admin/category")) return "Danh mục";
    if (location.pathname.includes("/admin/ingredient")) return "Nguyên liệu";
    return "Tổng quan";
  };

  const handleItemClick = (label) => {
    if (window.innerWidth < 1024) onClose();
  };

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("admin_data"); // Xóa token/data tùy vào cách bạn lưu
      setAdminAccount(null); // Reset context về null -> ProtectedRoute sẽ tự đẩy về /login
      navigate("/login-admin");
    }
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
        {/* Mobile Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b lg:hidden">
          <span className="text-xl text-green-600 font-bold">Menu Quản Lý</span>
          <button onClick={onClose} className="p-2 text-gray-400">✕</button>
        </div>

        <nav className="p-4 space-y-1">
          <Link to="/admin">
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Tổng quan" 
              active={getActiveLabel() === "Tổng quan"} 
              onClick={() => handleItemClick("Tổng quan")} 
            />
          </Link>

          <Link to="/admin/user">
            <NavItem 
              icon={<Users size={20} />} 
              label="Người dùng" 
              active={getActiveLabel() === "Người dùng"} 
              onClick={() => handleItemClick("Người dùng")} 
            />
          </Link>

          <Link to="/admin/post">
            <NavItem 
              icon={<FileText size={20} />} 
              label="Bài viết" 
              active={getActiveLabel() === "Bài viết"} 
              onClick={() => handleItemClick("Bài viết")} 
            />
          </Link>

          <Link to="/admin/category">
            <NavItem 
              icon={<List size={20} />} 
              label="Danh mục" 
              active={getActiveLabel() === "Danh mục"} 
              onClick={() => handleItemClick("Danh mục")} 
            />
          </Link>

          <Link to="/admin/ingredient">
            <NavItem 
              icon={<List size={20} />} 
              label="Nguyên liệu" 
              active={getActiveLabel() === "Nguyên liệu"} 
              onClick={() => handleItemClick("Nguyên liệu")} 
            />
          </Link>

          <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Hệ thống
          </div>

          <NavItem 
            icon={<Settings size={20} />} 
            label="Cài đặt" 
            active={getActiveLabel() === "Cài đặt"} 
            onClick={() => handleItemClick("Cài đặt")} 
          />
          
          <NavItem 
            icon={<LogOut size={20} />} 
            label="Đăng xuất" 
            color="text-red-500 hover:bg-red-50" 
            onClick={handleLogout}
          />
        </nav>
      </aside>
    </>
  );
}

function NavItem({ icon, label, active, onClick, color = "text-gray-700" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
        ${active 
          ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" 
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