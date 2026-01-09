import { Newspaper, BookOpen, Flame, MapPin} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {

  const [activeItem, setActiveItem] = useState("Bảng tin (News Feed)");

  const handleItemClick = (label) => {
    setActiveItem(label);
    console.log(`Bạn đã chuyển sang: ${label}`);
    // Tại đây bạn có thể dùng thêm useNavigate() của react-router-dom để chuyển trang
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-gray-50 p-4 border-r border-gray-200 ">
      
      {/* USER INFO */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="..." // Thay "..." bằng đường dẫn đến ảnh avatar của người dùng
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold text-gray-800">
          Nguyễn Văn A
        </span>
      </div>

      {/* MENU */}
      <nav className="space-y-2">
        <SidebarItem icon={<Newspaper />} label="Bảng tin (News Feed)" active={activeItem === "Bảng tin (News Feed)"} onClick={() => handleItemClick("Bảng tin (News Feed)")} />
        <SidebarItem icon={<BookOpen />} label="Bộ sưu tập của tôi" active={activeItem === "Bộ sưu tập của tôi"} onClick={() => handleItemClick("Bộ sưu tập của tôi")}/>
        <SidebarItem icon={<Flame />} label="Món ngon Trending" active={activeItem === "Món ngon Trending"} onClick={() => handleItemClick("Món ngon Trending")} />
      </nav>

      <hr className="my-4" />

      {/* REGION */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">
          Khám phá vùng miền
        </p>

        <SidebarItem icon={<MapPin />} label="Ẩm thực Miền Bắc" active={activeItem === "Ẩm thực Miền Bắc"} onClick={() => handleItemClick("Ẩm thực Miền Bắc")}/>
        <SidebarItem icon={<MapPin />} label="Ẩm thực Miền Trung" active={activeItem === "Ẩm thực Miền Trung"} onClick={() => handleItemClick("Ẩm thực Miền Trung")}/>
        <SidebarItem icon={<MapPin />} label="Ẩm thực Miền Nam" active={activeItem === "Ẩm thực Miền Nam"} onClick={() => handleItemClick("Ẩm thực Miền Nam")} />
      </div>
    </aside>
  );
};

/* Component SidebarItem để hiển thị từng mục trong sidebar:
icon: icon hiển thị
label: nhãn của mục
active: để xác định mục có đang được chọn hay không
onClick: hàm xử lý khi mục được click
sau khi click sẽ gọi hàm onClick truyền từ cha để cập nhật trạng thái active sau đó cập nhật biến activeItem trong Sidebar
activeItem sẽ quyết định mục nào được tô màu khác để người dùng biết mục nào đang được chọn
*/

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
        ${
          active
            ? "bg-orange-100 text-yellow-400 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`}>
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};


