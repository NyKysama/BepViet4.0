import React from 'react';
import { EyeOff, Eye, Trash2, MessageSquare, User, Hash } from 'lucide-react';

export default function CommentTable() {
    const mockComments = [
  {
    comment_id: "CMT_001",
    description: "Món Bún Chả Hà Nội này nhìn hấp dẫn quá, lưu lại cuối tuần làm thử!",
    user_id: "U002", // Trần Toàn Phước
    post_id: "P001", // Bún Chả Hà Nội
    parent_id: null, // Bình luận gốc
    status: "Visible"
  },
  {
    comment_id: "CMT_002",
    description: "Nước chấm cho thêm chút tinh dầu cà cuống sẽ chuẩn vị hơn đó ạ.",
    user_id: "U003",
    post_id: "P001",
    parent_id: "CMT_001", // Phản hồi cho CMT_001
    status: "Visible"
  },
  {
    comment_id: "CMT_003",
    description: "Nội dung quảng cáo không phù hợp.",
    user_id: "U009",
    post_id: "P002",
    parent_id: null,
    status: "Hidden" // Admin đã ẩn bài này
  }
];
  return (
    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Quản lý Bình luận</h2>
        <p className="text-slate-500 text-sm">Kiểm duyệt nội dung trao đổi từ cộng đồng</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-50">
              <th className="pb-4 px-2">ID & Nội dung</th>
              <th className="pb-4 px-2">Người đăng / Bài viết</th>
              <th className="pb-4 px-2">Loại</th>
              <th className="pb-4 px-2">Trạng thái</th>
              <th className="pb-4 px-2 text-right">Thao tác Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockComments.map((cmt) => (
              <tr key={cmt.comment_id} className={`hover:bg-slate-50/50 transition-all ${cmt.status === 'Hidden' ? 'opacity-60' : ''}`}>
                <td className="py-4 px-2 max-w-[300px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash size={12} className="text-slate-400" />
                    <span className="text-[10px] font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{cmt.comment_id}</span>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">{cmt.description}</p>
                </td>
                <td className="py-4 px-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <User size={12} className="text-emerald-500"/> ID User: {cmt.user_id}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">ID Post: {cmt.post_id}</div>
                </td>
                <td className="py-4 px-2 text-center">
                  {cmt.parent_id ? (
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-bold">Phản hồi</span>
                  ) : (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-lg font-bold">Gốc</span>
                  )}
                </td>
                <td className="py-4 px-2">
                   <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    cmt.status === 'Visible' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {cmt.status === 'Visible' ? 'Công khai' : 'Đã ẩn'}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex justify-end gap-2">
                    {/* Nút Ẩn/Hiện đặc trưng của Admin */}
                    {cmt.status === 'Visible' ? (
                      <button title="Ẩn bình luận" className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all">
                        <EyeOff size={16} />
                      </button>
                    ) : (
                      <button title="Hiện bình luận" className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                        <Eye size={16} />
                      </button>
                    )}
                    <button title="Xóa vĩnh viễn" className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};