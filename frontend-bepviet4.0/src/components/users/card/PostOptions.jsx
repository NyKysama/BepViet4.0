import { MoreHorizontal, Bookmark, Flag, Edit3, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {  useNavigate } from "react-router-dom";
import { useMyAccount} from '../../../contexts/user/MyAccountContext';

export default function PostOptions({ post, isOwner, onAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [report, setReport] = useState({});
  const {myAccount} = useMyAccount();
  const menuRef = useRef(null); // Dùng để bắt sự kiện click ra ngoài thì đóng menu
  const navigate = useNavigate();

  // Xử lý khi click ra ngoài menu thì tự đóng
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

    const handleSubmit = async (e) => {
    if (e) e.preventDefault();
  
    if (!myAccount) {
      alert("Vui lòng đăng nhập để báo cáo!");
      return;
    }

    try {
      // Nếu có replyingTo thì dùng ID của nó làm parent_id
      const response = await fetch(`http://127.0.0.1:8000/api/report`, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: post.post_id,
                               user_id: myAccount.user_id })// truyền dl sang server
      });
      const result = await response.json();
      // khi mà api đã có và hoạt động thì ms gửi dl đi
      if (response.ok) {
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Nút 3 chấm */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-all ${isOpen ? 'bg-slate-100 text-slate-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
      >
        <MoreHorizontal size={20} />
      </button>

      {/* Menu nội dung */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-100">
          
          {/* NHÓM 1: CÁC HÀNH ĐỘNG CHÍNH */}
          <div className="p-1 border-b border-slate-50">
            {/* kiểm tra chủ bài viết */}
            {isOwner ? (
              <>                
                <button onClick={() => {navigate(`/update-blog/${post.post_id}`)}} className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50">
                  <Edit3 className="mr-3 h-4 w-4 text-blue-500" /> Chỉnh sửa bài viết
                </button>
              </>
            ) : (
              <>                
                <button onClick={(e) => { handleSubmit(e); setIsOpen(false); }} className="flex w-full items-start rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left">
                  <Flag className="mr-3 h-5 w-5 text-slate-500 mt-0.5" /> 
                  <div>
                    <p className="font-bold">Báo cáo</p>
                    <p className="text-[11px] text-slate-400 font-normal leading-tight">Báo cáo bài viết này.</p>
                  </div>
                </button>
              </>
            )}
          </div>

          {/* NHÓM 2: LƯU & THÔNG TIN */}
          <div className="p-1 border-b border-slate-50">
            <button onClick={() => { onAction('save'); setIsOpen(false); }} className="flex w-full items-start rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left">
              <Bookmark className="mr-3 h-5 w-5 text-amber-500 mt-0.5" /> 
              <div>
                <p className="font-bold">Lưu bài viết</p>
                <p className="text-[11px] text-slate-400 font-normal leading-tight">Thêm vào Cookbook nấu ăn của bạn.</p>
              </div>
            </button>
          </div>

          {/* NHÓM 3: XÓA (Chỉ cho chủ bài) */}
          {isOwner && (
            <div className="p-1">
              <button onClick={() => { onAction('delete'); setIsOpen(false); }} className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50">
                <Trash2 className="mr-3 h-4 w-4" /> Xóa bài viết
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}