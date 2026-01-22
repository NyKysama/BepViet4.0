import { Newspaper, PlusCircle, ChefHat, UserCircle, Soup } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

export default function Sidebar({ isOpen, onClose }) {
  // Lấy thông tin đường dẫn hiện tại từ URL
  const location = useLocation();

  const menuItems = [
    { icon: <Newspaper />, label: "Trang chủ", path: "/" }, 
    { icon: <UserCircle />, label: "Trang cá nhân", path: "/user-profile/my-account" },
    { icon: <Soup />, label: "Hôm nay ăn gì?", path: "/food-suggestion" },
  ];

  const shareItems = [
    { icon: <PlusCircle />, label: "Đăng bài viết mới", path: "/create-blog" },
    { icon: <ChefHat />, label: "Chia sẻ công thức mới", path: "/create-recipe" },
  ];

  return (
    <>
      {/* Overlay cho mobile */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] md:hidden transition-all ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside className={`
        fixed top-20 right-4 z-[70] w-64 bg-yellow-50 rounded-[24px] shadow-2xl border border-gray-100 
        transform transition-all duration-300 ease-out p-5
        ${isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95 pointer-events-none"}

        md:static md:translate-y-0 md:opacity-100 md:scale-100 md:pointer-events-auto
        md:w-64 md:h-[calc(100vh-80px)] 
        md:ml-2 md:mt-2 md:mb-2 
        md:rounded-[24px] md:border md:shadow-sm md:bg-yellow-50
      `}>

        {/* MENU */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={onClose}>
              <SidebarItem 
                icon={item.icon} 
                label={item.label} 
                // Kiểm tra active dựa trên URL hiện tại
                active={location.pathname === item.path} 
              />
            </Link>
          ))}
        </nav>

        <hr className="my-4" />

        {/* REGION */}
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Chia sẻ bài viết của bạn
          </p>
          {shareItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={onClose}>
              <SidebarItem 
                icon={item.icon} 
                label={item.label} 
                active={location.pathname === item.path} 
              />
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
        ${active
        ? "bg-green-200 text-green-700 font-semibold" // Đã chỉnh màu text cho dễ nhìn hơn trên nền xanh
        : "text-gray-700 hover:bg-white"
      }`}>
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};