import React from 'react';
import { Edit, Trash2, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import {Link} from 'react-router-dom';

export default function PostTable() {
    const adminPosts = [
  {
    post_id: "P001",
    img: "https://images.unsplash.com/photo-1562607378-87b6d81f05e0",
    title: "Phở Bò Nam Định",
    description: "Nước dùng truyền thống...",
    type: "Công thức",
    cook_time: "120p",
    user_id: "U01",
    slug: "pho-bo-nam-dinh",
    difficulty: "Khó",
    region: "Miền Bắc",
    status: "Published"
  },
  {
    post_id: "P002",
    img: "https://images.unsplash.com/photo-1512058560366-cd242d455f70",
    title: "Bánh Xèo Miền Tây",
    description: "Vỏ bánh giòn rụm...",
    type: "Công thức",
    cook_time: "45p",
    user_id: "U02",
    slug: "banh-xeo-mien-tay",
    difficulty: "Dễ",
    region: "Miền Nam",
    status: "Pending"
  }
];
  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Quản lý bài đăng</h2>
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
          Tổng: {adminPosts.length} bài
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-sm">
              <th className="pb-4 font-medium">Bài đăng</th>
              <th className="pb-4 font-medium">Phân loại</th>
              <th className="pb-4 font-medium">Vùng miền</th>
              <th className="pb-4 font-medium">Độ khó</th>
              <th className="pb-4 font-medium">Thời gian</th>
              <th className="pb-4 font-medium">Trạng thái</th>
              <th className="pb-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {adminPosts.map((post) => (
              <tr key={post.post_id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Link to='/recipe-detail'>
                    <img src={post.img} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    
                    <div>
                      <div className="font-bold text-slate-700">{post.title}</div>
                      <div className="text-xs text-slate-400">ID: {post.post_id}</div>
                    </div>
                    </Link>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">{post.type}</span>
                </td>
                <td className="py-4 text-sm text-slate-600">{post.region}</td>
                <td className="py-4">
                  <span className={`text-xs font-medium ${post.difficulty === 'Khó' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {post.difficulty}
                  </span>
                </td>
                <td className="py-4 text-sm text-slate-500">{post.cook_time}</td>
                <td className="py-4">
                  {post.status === 'Published' ? (
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle size={14} /> Đã đăng
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Clock size={14} /> Chờ duyệt
                    </div>
                  )}
                </td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                      <Trash2 size={18} />
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