import React from 'react';
import { Edit, Trash2, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PostTable() {
  const [Posts, setPosts] = useState([]);
  const [processingId, setProcessingId] = useState(null);// lưu id của post 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:8000/api/admin/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);
  // hàm dùng để xóa
  const handleDelete = async (postId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài này không?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/delete-post/${postId}`, {
        method: 'DELETE', // Khai báo phương thức DELETE ở đây
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // Nếu có token thì thêm vào đây: 'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setPosts(Posts.filter(p => p.post_id !== postId));
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa:", error);
    }
  };
  // 2. Hàm xử lý Duyệt/Từ chối
  const handleAction = async (postId, action) => {
    setProcessingId(postId);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/posts/${postId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        // FIX: Vì posts là mảng, nên ta chỉ cần filter trực tiếp trên mảng đó
        setPosts(prev => prev.filter(p => p.post_id !== postId));
      } else {
        alert("Cập nhật thất bại, thử lại sau!");
      }
    } catch (err) {
      console.error("Lỗi rồi bro:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleForceDelete = async (postId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài này không?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/admin/forcedestroy-post/${postId}`, {
        method: 'DELETE', // Khai báo phương thức DELETE ở đây
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // Nếu có token thì thêm vào đây: 'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setPosts(Posts.filter(p => p.post_id !== postId));
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Quản lý bài đăng</h2>
        <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">
          Tổng: {Posts.length} bài
        </span>
      </div>
      <Link to='/admin/pendingposts' className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium">Xem bài đăng chưa duyệt</Link>

      <div className="overflow-x-auto w-full max-h-[600px] overflow-auto border border-slate-100 rounded-2xl no-scrollbar">
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
            {Posts.map((post) => (
              <tr key={post.post_id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Link to={post.type === "Blog" ? `blog-detail/${post.post_id}` : `recipe-detail/${post.post_id}`}>
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
                  {post.status === 1 ? (
                    <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle size={14} /> Đã đăng
                    </div>
                  ) : (post.status === 0 ? (
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Clock size={14} /> Chờ duyệt
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600 text-xs font-bold">
                      <Trash2 size={14} /> Bị từ chối
                    </div>
                  ))}
                </td>
                <td className="py-4">
                  <div className="flex justify-end gap-2">
                    {post.status === 1 ? (<>
                      <Link to={`/${post.type === "Công thức" ? 'update-recipe' : 'update-blog'}/${post.post_id}`} className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(post.post_id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </>) : (post.status === 0 ? (<>
                      <button
                        disabled={processingId === post.post_id}
                        onClick={() => handleAction(post.post_id, 'update')}
                        className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                        title="Duyệt bài"
                      >
                        {processingId === post.post_id ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <CheckCircle size={20} />}
                      </button>
                      <button
                        disabled={processingId === post.post_id}
                        onClick={() => handleAction(post.post_id, 'rej')}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        title="Từ chối"
                      >
                        <XCircle size={20} />
                      </button>
                    </>) : (
                      <>
                        <button
                          disabled={processingId === post.post_id}
                          onClick={() => handleAction(post.post_id, 'update')}
                          className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50"
                          title="Duyệt bài"
                        >
                          {processingId === post.post_id ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <CheckCircle size={20} />}
                        </button>
                        <button
                          disabled={processingId === post.post_id}
                          onClick={() => handleForceDelete(post.post_id)}
                          className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                          title="Xóa"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    ))}

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