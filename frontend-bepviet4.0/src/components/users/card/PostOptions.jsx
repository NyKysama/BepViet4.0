import { MoreHorizontal, Heart, Bookmark, EyeOff, Edit3, Trash2, Pin, Info, } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {  useNavigate } from "react-router-dom";

export default function PostOptions({ post, isOwner, onAction }) {
  const [isOpen, setIsOpen] = useState(false);
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
                <button onClick={() => { onAction('pin'); setIsOpen(false); }} className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50">
                  <Pin className="mr-3 h-4 w-4 text-slate-500" /> Ghim bài viết
                </button>
                <button onClick={() => {navigate(`/update-blog/${post.post_id}`)}} className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 font-semibold hover:bg-slate-50">
                  <Edit3 className="mr-3 h-4 w-4 text-blue-500" /> Chỉnh sửa bài viết
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { onAction('interest'); setIsOpen(false); }} className="flex w-full items-start rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left">
                  <Heart className="mr-3 h-5 w-5 text-rose-500 mt-0.5" /> 
                  <div>
                    <p className="font-bold">Quan tâm</p>
                    <p className="text-[11px] text-slate-400 font-normal leading-tight">Gợi ý nhiều bài viết tương tự hơn.</p>
                  </div>
                </button>
                <button onClick={() => { onAction('not-interest'); setIsOpen(false); }} className="flex w-full items-start rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 text-left">
                  <EyeOff className="mr-3 h-5 w-5 text-slate-500 mt-0.5" /> 
                  <div>
                    <p className="font-bold">Không quan tâm</p>
                    <p className="text-[11px] text-slate-400 font-normal leading-tight">Ẩn bài viết này khỏi Newsfeed.</p>
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