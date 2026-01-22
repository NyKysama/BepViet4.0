import React, { useEffect, useState } from 'react';
import { Heart, Reply, MoreHorizontal, X } from 'lucide-react';
import { useMyAccount } from '../../contexts/user/MyAccountContext';
import {Link} from 'react-router-dom'

const CommentItem = ({ comment, onReply, level = 1 }) => {
  return (
    <div className="flex gap-3 mb-4">
      <Link to={`/user-profile/${comment?.user?.username}`}>
        <img 
          src={`http://127.0.0.1:8000/${comment.user?.avatar}`}
          alt={comment.user?.name} 
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
      </Link>
      <div className="flex-1">
        <div className="bg-slate-50 px-4 py-2.5 rounded-[20px] inline-block max-w-full">
          <Link to={`/user-profile/${comment?.user?.username}`}>
            <h5 className="text-[13px] font-bold text-slate-800">{comment.user?.name}</h5>
          </Link>
          <p className="text-[14px] text-slate-700 leading-snug">{comment.content}</p>
        </div>

        <div className="flex items-center gap-4 mt-1.5 ml-2">
          <span className="text-[12px] text-slate-400">
            {new Date(comment.created_at).toLocaleDateString('vi-VN')}
          </span>
          {/* Khi bấm nút này, truyền comment lên cha để xử lý reply */}
          {level < 3 && (
          <button 
            onClick={() => onReply(comment)}
            className="text-[12px] font-bold text-slate-500 hover:text-emerald-500"
          >
            Phản hồi
          </button>
          )}
        </div>

        {/* Đệ quy hiển thị reply với đường kẻ dọc 
        replies: bình luận con
        */}
        {comment.replies && comment.replies.length > 0 && ( 
          <div className="mt-3 ml-4 border-l-2 border-slate-100 pl-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.comment_id} comment={reply} onReply={onReply}  level={level + 1}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function CommentSection({ id }) {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ content: '' });
  const [replyingTo, setReplyingTo] = useState(null); // Lưu comment đang được reply
  const [isLoading, setIsLoading] = useState(false);
  const {myAccount}=useMyAccount()
  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    fetch(`http://127.0.0.1:8000/api/post/comments/${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;
    setIsLoading(true);

    try {
      // Nếu có replyingTo thì dùng ID của nó làm parent_id
      const url = replyingTo 
        ? `http://127.0.0.1:8000/api/post/create-comments/${id}/${replyingTo.comment_id}`
        : `http://127.0.0.1:8000/api/post/create-comments/${id}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`//gọi token để lấy thông tin user
        },
        body: JSON.stringify({ content: formData.content,
                               user_id: myAccount.user_id })// truyền dl sang server
      });

      // khi mà api đã có và hoạt động thì ms gửi dl đi
      if (response.ok) {
        setFormData({ content: '' });
        setReplyingTo(null);
        fetchComments(); // Load lại để hiện cmt mới
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm mt-6">
      <h3 className="text-lg font-black text-slate-800 mb-6">Bình luận ({comments.length})</h3>
      
      {/* Thông báo đang trả lời ai đó */}
      {replyingTo && (
        <div className="flex items-center justify-between bg-emerald-50 px-4 py-2 rounded-lg mb-2">
          <span className="text-xs text-emerald-700">
            Đang trả lời <b>{replyingTo.user?.name}</b>
          </span>
          <button onClick={() => setReplyingTo(null)}><X size={14} /></button>
        </div>
      )}

      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <input 
            name='content'
            value={formData.content}
            onChange={(e) => setFormData({content: e.target.value})}
            type="text" 
            placeholder={replyingTo ? "Viết phản hồi..." : "Viết bình luận..."}
            className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button 
            disabled={isLoading}
            onClick={handleSubmit} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 font-bold text-sm"
          >
            {isLoading ? "..." : "Gửi"}
          </button>
        </div>
      </div>
      {/* hiển thị ds bình luận có trong post*/}
      <div className="space-y-4">
        {comments.map(c => (
          <CommentItem 
            key={c.comment_id} 
            comment={c} 
            onReply={(cmt) => setReplyingTo(cmt)} // lấy id của bình luận đc chọn            
          />
        ))}
      </div>
    </div>
  );
}