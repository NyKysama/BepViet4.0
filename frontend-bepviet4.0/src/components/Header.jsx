import { LogOut } from "lucide-react";
// thư viện mới lucide-react có các icon như sau để tối ưu hơn
/* Home, Bell, Search, User, Heart, MessageCircle, Settings, LogOut 
cách dùng: 
    <LogOut className="w-5 h-5"/>
    className="w-5 h-5" để chỉnh kích thước icon
*/
export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white z-50 shadow-sm flex justify-between items-center px-6">
      
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 text-green-600 text-lg font-bold whitespace-nowrap">
          <img src="./logo_BepViet.png"
          alt="logo"
          className="w-9 h-9 rounded-full cursor-pointer"></img>Bếp Việt 4.0
        </span>
      </div>

      {/* RIGHT - ICONS */}
      <div className="flex items-center gap-4">
        <img
          src="..." // Thay "..." bằng đường dẫn đến ảnh avatar của người dùng
          alt="avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
        <LogOut className="w-5 h-5"/>
      </div>
    </nav>
  );
};

;
