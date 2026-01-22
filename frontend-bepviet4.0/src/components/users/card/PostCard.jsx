import { MoreHorizontal, Globe, MessageSquareQuote, UtensilsCrossed, BookOpenText, HelpCircle } from 'lucide-react';
import CommentSection from '../CommentSection';
import { useState,useEffect } from 'react';
import { data, Link } from 'react-router-dom';
import PostOptions from './PostOptions';
import { useMyAccount } from '../../../contexts/user/MyAccountContext';


export default function PostCard({ post, card_data }) {
  const [showComments, setShowComments] = useState(false);  
  const [cmtCount, setCmtCount] = useState(0);
  const {myAccount} = useMyAccount();
  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/cmt-count/${post.post_id}`)
      .then(res=>res.json())
      .then(data=>setCmtCount(data))
      //console.log(myAccount)
  }, [post.post_id]);

  // Người dùng hiện tại token cố định
  //const authUser = myAccount; 

  // Bảo vệ Component: Nếu dữ liệu chưa tới thì hiện skeleton đơn giản
  if (!post && !card_data) {
    return <div className="bg-white rounded-[24px] h-64 animate-pulse mb-6 w-full max-w-[680px] mx-auto" />;
  }

  // Ưu tiên lấy type từ card_data hoặc post
  const currentType = card_data?.type || post?.type;

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 mb-6 w-full max-w-[680px] mx-auto overflow-hidden">
      {/* 1. Header: Thông tin tác giả động */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500 p-0.5">
            <Link to={`/user-profile/${post?.user?.username}`}>
              <img
                src={`http://127.0.0.1:8000/${post?.user?.avatar}`}
                className="w-full h-full rounded-full object-cover"
                alt="avatar"
              />
            </Link>
          </div>
          <div>
            <Link to={`/user-profile/${post?.user?.username}`}>
              <h4 className="font-bold text-slate-800 text-sm hover:underline cursor-pointer">
                {post?.user?.name || "Người dùng"}
              </h4> 
            </Link>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <span>{post?.created_at ? new Date(post.created_at).toLocaleDateString() : "Vừa xong"}</span>
              <span>•</span>
              <Globe size={12} />
            </div>
          </div>
        </div>
        
        <PostOptions
          post={post}
          isOwner={post?.user_id === myAccount?.user_id}
          onAction={(type) => console.log("Hành động:", type)}
        />
      </div>

      {/* 2. Content: Nội dung chữ */}
      <div className="px-4 pb-3 space-y-2">
        <div className="flex">
          {currentType === "Công thức" ? (
            <Link to={currentType === "Công thức" ? `/recipe-detail/${post?.post_id}` : `/blog-detail/${post?.post_id}`}>
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-tighter">
                <UtensilsCrossed size={10} /> Công thức
              </span>
            </Link>
          ) : currentType === "Blog" ? (
            <Link to={currentType === "Công thức" ? `/recipe-detail/${post?.post_id}` : `/blog-detail/${post?.post_id}`}>
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-tighter">
                <BookOpenText size={10} /> Blog Review
              </span>
            </Link>
          ) : (            
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-100 uppercase tracking-tighter">
              <HelpCircle size={10} /> Hỏi đáp
            </span>
          )}
        </div>

        <p className="text-slate-700 text-[15px] leading-relaxed mt-1">
          {card_data?.description || post?.description || post?.title}
        </p>
      </div>

      {/* 3. Media: Ẩn nếu không có ảnh (Tránh lỗi vỡ layout) */}
      {(card_data?.img || post?.img) && (
        <div className="relative bg-slate-100 w-full overflow-hidden group">
          <Link to={currentType === "Công thức" ? `/recipe-detail/${post?.post_id}` : `/blog-detail/${post?.post_id}`}>
            <img
              src={`http://127.0.0.1:8000/${card_data?.img || post?.img}`}
              className="w-full h-auto max-h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
              alt="post-media"
            />
            {/* Thẻ đè trên ảnh */}
            <div className="absolute top-3 right-3">
              <div className="backdrop-blur-md bg-black/20 px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 shadow-sm">
                {currentType === "Công thức" ? <UtensilsCrossed size={12} className="text-white" /> : <BookOpenText size={12} className="text-white" />}
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">{currentType}</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* 4. Statistics */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-slate-50">
        <div className="text-xs text-slate-400 font-medium hover:underline cursor-pointer">
          {cmtCount} bình luận
        </div>
      </div>

      {/* 5. Actions */}
      <div className="px-2 py-1 flex items-center justify-between">
        <button 
          className="flex-1 flex items-center justify-center gap-2 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-all"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquareQuote size={20} /> 
          {showComments ? "Đóng bình luận" : "Bình luận"}
        </button>
      </div>

      {showComments && (
        <div className="animate-in fade-in duration-300">
          <CommentSection id={post?.post_id} />
        </div>
      )}
    </div>
  );
}