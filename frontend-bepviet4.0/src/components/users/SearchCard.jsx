import { Search } from "lucide-react";

export default function SearchCard() {
  return (
    <>
      {/* Tại Home.jsx - Phần ô tìm kiếm */}
      <div className="w-full max-w-[680px] mx-auto mb-6"> {/* Đảm bảo max-w khớp với bài đăng */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Tìm công thức, món ăn, nguyên liệu..."
            className="w-full py-4 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-[15px]"
          />
        </div>
      </div>
    </>
  );
}