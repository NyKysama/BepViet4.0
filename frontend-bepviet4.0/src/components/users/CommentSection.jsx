import React, { useState } from 'react';
import { Heart, Reply, MoreHorizontal } from 'lucide-react';

// Thành phần hiển thị một bình luận đơn lẻ, có thể bao gồm cả bình luận con (replies)
const CommentItem = ({ comment = false }) => {
  return (
    <div className={`flex gap-3 `}>
      {/* Avatar người bình luận */}
      <img 
        src={comment.user.avatar} 
        alt={comment.user.name} 
        className={`w-10 h-10 rounded-full object-cover shrink-0`}
      />

      <div className="flex-1">
        {/* Khối nội dung bình luận */}
        <div className="bg-slate-50 px-4 py-2.5 rounded-[20px] inline-block max-w-full">
          <h5 className="text-[13px] font-bold text-slate-800 hover:underline cursor-pointer">
            {comment.user.name}
          </h5>
          <p className="text-[14px] text-slate-700 leading-snug">
            {comment.content}
          </p>
        </div>

        {/* Các nút chức năng & Thời gian */}
        <div className="flex items-center gap-4 mt-1.5 ml-2">
          <span className="text-[12px] font-medium text-slate-400">
            {comment.time}
          </span>
          <button className="text-[12px] font-bold text-slate-500 hover:text-slate-800">
            Phản hồi
          </button>
        </div>
        {/* replies là bình luận con , sau nì có dữ liệu sẽ thany hàm kiểm tra khác
            hàm này chủ yếu dùng để đệ quy hiển thị bình luận con bên trong bình luận cha
            nó kiểm tra nếu comment có replies và độ dài lớn hơn 0 thì sẽ map qua từng reply và gọi lại CommentItem để hiển thị
        */}
        
        {comment.replies && comment.replies.length > 0 && ( 
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function CommentSection() {
  // Dữ liệu mẫu (Gồm bình luận cha và con)
  const [comments] = useState([
    {
      id: 1,
      user: { name: "Thanh Tùng", avatar: "https://ui-avatars.com/api/?name=TT&bg=emerald" },
      content: "Món này dùng mắm tôm hay nước mắm thì ngon hơn hả chủ thớt?",
      time: "2 giờ trước",
      replies: [
        {
          id: 101,
          user: { name: "Admin Bếp Việt", avatar: "https://ui-avatars.com/api/?name=AD&bg=slate" },
          content: "Theo mình dùng mắm tôm sẽ chuẩn vị Bắc hơn bạn nhé!",
          time: "1 giờ trước",
          replies: []
        }
      ]
    }
  ]);

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm mt-6">
      <h3 className="text-lg font-black text-slate-800 mb-6">Bình luận (12)</h3>
      
      {/* Ô nhập bình luận mới */}
      <div className="flex gap-3 mb-8">
        <img src="..." className="w-10 h-10 rounded-full" alt="me" /> {/* Thay "..." bằng avatar người dùng hiện tại */}
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Viết phản hồi của bạn..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10"
          />
          {/* Nút gửi bình luận */}
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-600 font-bold text-sm">
            Gửi
          </button>
        </div>
      </div>

      {/* Danh sách bình luận */}
      <div className="space-y-2">
        {comments.map(c => <CommentItem key={c.id} comment={c} />)} {/* Hiển thị từng bình luận bằng cách gọi lại CommentItem */}
      </div>
    </div>
  );
}