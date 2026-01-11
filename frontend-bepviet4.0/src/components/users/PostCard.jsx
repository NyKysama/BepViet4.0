import { Heart, ThumbsUp, Share2, MoreHorizontal, Globe, MessageSquareQuote } from 'lucide-react';
import CommentSection from './CommentSection';  
import { useState } from 'react';
import {Link} from 'react-router-dom';

export default function PostCard() {
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
      <div className="px-4 pb-3">
        <p className="text-slate-700 text-[15px] leading-relaxed">
          Sáng nay vừa thử làm món <b>Bún Chả Hà Nội</b> theo công thức mới. Nước chấm đậm đà, thịt nướng thơm lừng cả xóm. Mọi người có muốn mình chia sẻ công thức không nhỉ? 🍲✨
        </p>
      </div>

      {/* 3. Media: Hình ảnh/Video (Tràn viền nhẹ) */}
      <div className="bg-slate-100 w-full overflow-hidden">
        <Link to="/recipe">
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" 
          className="w-full h-auto max-h-[320px] object-cover"
          alt="post-media"
        /></Link>
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