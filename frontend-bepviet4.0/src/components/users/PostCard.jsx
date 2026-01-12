import { MoreHorizontal, Globe, MessageSquareQuote, UtensilsCrossed, BookOpenText } from 'lucide-react';
import CommentSection from './CommentSection';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ postType = "recipe" }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 mb-6 w-full max-w-[680px] mx-auto">
      {/* 1. Header: Thông tin tác giả */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=random"
              className="w-full h-full rounded-full object-cover"
              alt="avatar"
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm hover:underline cursor-pointer">Admin Bếp Việt</h4>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <span>12 giờ trước</span>
              <span>•</span>
              <Globe size={12} />
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-slate-400" />
        </button>
      </div>

      {/* 2. Content: Nội dung chữ */}
      <div className="px-4 pb-3 space-y-2">
        {/* TAG PHÂN BIỆT LOẠI BÀI ĐĂNG - Phiên bản nhỏ gọn, tinh tế */}
        <div className="flex">
          {postType === "recipe" ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-tighter">
              <UtensilsCrossed size={10} /> Công thức
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-tighter">
              <BookOpenText size={10} /> Blog Review
            </span>
          )}
        </div>

        <p className="text-slate-700 text-[15px] leading-relaxed mt-1">
          Sáng nay vừa thử làm món <b>Bún Chả Hà Nội</b> theo công thức mới. Nước chấm đậm đà, thịt nướng thơm lừng cả xóm. Mọi người có muốn mình chia sẻ công thức không nhỉ? 🍲✨
        </p>
      </div>
      {/* 3. Media: Hình ảnh/Video (Tràn viền nhẹ) */}
      {/* 3. Media: Hình ảnh/Video */}
      <div className="relative bg-slate-100 w-full overflow-hidden group">
        <Link to={postType === "recipe" ? "/recipe" : "/blog-detail"}>
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
            className="w-full h-auto max-h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
            alt="post-media"
          />

          {/* THẺ ĐÈ TRÊN ẢNH - Phong cách tối giản, mờ đục */}
          <div className="absolute top-3 right-3">
            <div className="backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 shadow-sm">
              {postType === 'recipe' ? (
                <UtensilsCrossed size={12} className="text-white" />
              ) : (
                <BookOpenText size={12} className="text-white" />
              )}
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                {postType === 'recipe' ? 'Công thức' : 'Blog'}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* 4. Statistics: Thống kê tương tác */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-50">
        <div className="text-xs text-slate-400 font-medium hover:underline cursor-pointer">
          89 bình luận
        </div>
      </div>

      {/* 5. Actions: Nút tương tác (Like, Comment) */}
      <div className="px-2 py-1 flex items-center justify-between">
        {/* <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-all">
          <Heart size={20} /> Thích
        </button> */}
        {/* sự kiện click để mở/đóng bình luận */}
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-all"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquareQuote size={20} /> Bình luận
        </button>
      </div>
      {showComments && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <CommentSection />
        </div>
      )}
    </div>
  );
}