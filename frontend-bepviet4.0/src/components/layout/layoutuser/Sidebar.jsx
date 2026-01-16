import { Newspaper, BookOpen, Flame, MapPin, PlusCircle, ChefHat } from "lucide-react";
import { useState } from "react";
import {Link} from "react-router-dom";
// biên isOpen: để xác định sidebar có đang mở hay không (dùng cho mobile)
// biến onClose: hàm để đóng sidebar (dùng cho mobile)
export default function Sidebar({ isOpen, onClose }) {

  // biến activeItem: để xác định mục nào đang được chọn trong sidebar
  const [activeItem, setActiveItem] = useState("Trang chủ");

  const handleItemClick = (label) => {
    setActiveItem(label); // Cập nhật mục đang active
    console.log(`Bạn đã chuyển sang: ${label}`);
  };
  return (
    <>
      {/* thẻ div này dùng để tạo lớp phủ khi sidebar mở trên mobile làm mờ phần nội dung khi hiện menu */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] md:hidden transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={onClose} // Đóng sidebar khi click vào lớp phủ
      />
      <aside className={`
        /* MOBILE: Đã bo tròn sắn nhưng có thể tăng thêm độ mềm mại */
        fixed top-20 right-4 z-[70] w-64 bg-white rounded-[24px] shadow-2xl border border-gray-100 
        transform transition-all duration-300 ease-out p-5
        ${isOpen ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95 pointer-events-none"}

        /* DESKTOP (md:): Bo tròn các góc bên phải để tạo cảm giác tách biệt với nội dung */
        md:static md:translate-y-0 md:opacity-100 md:scale-100 md:pointer-events-auto
        md:w-64 md:h-[calc(100vh-80px)] 
        md:ml-2 md:mt-2 md:mb-2 /* Thêm margin để Sidebar "nổi" lên thay vì dính sát mép */
        md:rounded-[24px] md:border md:shadow-sm md:bg-white
      `}>

        {/* Tiêu đề thanh điều hướng */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="..." // Thay "..." bằng đường dẫn đến ảnh avatar của người dùng
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />

          <span className="font-semibold text-gray-800">
            Menu
          </span>
        </div>

        {/* Các Page chính */}
        <nav className="space-y-2">
          <SidebarItem icon={<Newspaper />} label="Bảng tin (News Feed)" active={activeItem === "Bảng tin (News Feed)"} onClick={() => handleItemClick("Bảng tin (News Feed)")} />
          <SidebarItem icon={<BookOpen />} label="Cookbook của tôi" active={activeItem === "Cookbook của tôi"} onClick={() => handleItemClick("Cookbook của tôi")} />
          <SidebarItem icon={<Flame />} label="Món ngon Trending" active={activeItem === "Món ngon Trending"} onClick={() => handleItemClick("Món ngon Trending")} />
        </nav>

        <hr className="my-4" />
        {/* Chức năng đăng bài */}
        <div>
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Chia sẻ bài viết của bạn
          </p>

          <SidebarItem icon={<PlusCircle />} label="Đăng bài viết mới" active={activeItem === "Đăng bài viết mới"} onClick={() => handleItemClick("Đăng bài viết mới")} />
          <SidebarItem icon={<ChefHat />} label="Chia sẻ công thức mới" active={activeItem === "Chia sẻ công thức mới"} onClick={() => handleItemClick("Chia sẻ công thức mới")} />
        </div>
      </aside>
    </>
  );
};

/* Component SidebarItem để hiển thị từng mục trong sidebar:
icon: icon hiển thị
label: nhãn của mục
active: để xác định mục có đang được chọn hay không
onClick: hàm xử lý khi mục được click(hàm này sẽ cập nhật lại label đang active trong Sidebar)
sau khi click sẽ gọi hàm onClick truyền từ cha để cập nhật trạng thái active sau đó cập nhật biến activeItem trong Sidebar
activeItem sẽ quyết định mục nào được tô màu khác để người dùng biết mục nào đang được chọn
*/

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
        ${active
        ? "bg-orange-100 text-yellow-400 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
      }`}>
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};


