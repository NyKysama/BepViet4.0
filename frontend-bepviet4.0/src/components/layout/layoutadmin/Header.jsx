import { Menu, Bell, Search } from "lucide-react";

export default function Header({ onOpenMenu }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 z-50">
      {/* TRÁI: Logo & Mobile Menu Button */}
      <div className="flex items-center gap-4">
        <button onClick={onOpenMenu} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">
                <img src="./logo_BepViet.png" alt="logo" className="w-9 h-9 rounded-full cursor-pointer"></img>
            </span>
          </div>
          <span className="text-xl text-green-600 font-bold hidden md:block tracking-tight">
            Bếp Việt 4.0
          </span>
        </div>
      </div>

      {/* GIỮA: Search Bar (Chỉ hiện từ Tablet trở lên) */}
      <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-xl w-64 lg:w-80">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm nhanh..."
          className="bg-transparent text-sm outline-none w-full"
        />
      </div>

      {/* PHẢI: Notifications & Profile */}
      <div className="flex items-center gap-3 lg:gap-5">
        <div className="h-8 w-[1px] bg-gray-200 hidden sm:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold group-hover:text-green-600">Admin Bếp Việt</p>
            <p className="text-[10px] text-gray-400 font-medium uppercase">Quản trị viên</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center overflow-hidden">
             {/* Thay bằng <img> thật của bạn */}
             <span className="text-green-700 font-bold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
}