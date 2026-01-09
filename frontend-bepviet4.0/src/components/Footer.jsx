import { PlusSquare, BookOpen, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-40 border-t shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-2">

        {/* Tạo bài đăng */}
        <button className="flex flex-col items-center text-gray-600 hover:text-orange-500">
          <PlusSquare className="w-6 h-6" />
          <span className="text-xs mt-1">Tạo bài</span>
        </button>

        {/* Tạo công thức (nút chính) */}
        <button className="flex flex-col items-center bg-yellow-400 text-white px-4 py-2 rounded-xl shadow-md -translate-y-4">
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1">Công thức</span>
        </button>

        {/* Chat AI */}
        <button className="flex flex-col items-center text-gray-600 hover:text-orange-500">
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Chat AI</span>
        </button>

      </div>
    </div>
  );
};


