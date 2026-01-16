import { LogOut, Menu } from "lucide-react";
// thư viện mới lucide-react có các icon như sau để tối ưu hơn
/* Home, Bell, Search, User, Heart, MessageCircle, Settings, LogOut 
cách dùng: 
    <LogOut className="w-5 h-5"/>
    className="w-5 h-5" để chỉnh kích thước icon
*/
/* biến onOpenMenu dùng để mở menu sidebar */
export default function Header({ onOpenMenu }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white z-50 shadow-sm flex justify-between items-center px-6">
      
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 text-green-600 text-lg font-bold whitespace-nowrap">
          <img src="/logo_BepViet.png"
          alt="logo"
          className="w-9 h-9 rounded-full cursor-pointer"></img>Bếp Việt 4.0
        </span>
      </div>

      {/* RIGHT - ICONS */}
      <div className="flex items-center gap-4">
         {/*<img
          src="..." // Thay "..." bằng đường dẫn đến ảnh avatar của người dùng
          alt="avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
        <LogOut className="w-5 h-5"/>
        */}
        <button 
          onClick={onOpenMenu} 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg bg-gray-50 active:scale-90 transition-all"
        >
          <Menu size={24} className="text-gray-800" />
        </button>
      </div> 
    </nav>
  );
};
