import React, { useState, useEffect } from 'react';
import { Trash2, Clock, XCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PendingPosts() {
    const [posts, setPosts] = useState([]); // hiện ds post ch duyệt và đã bị từ chối
    const [isLoading, setIsLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);// lưu id của post 

    // 1. Lấy dữ liệu bài đăng
    useEffect(() => {
        fetch('http://localhost:8000/api/admin/pendingposts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setIsLoading(false);
            });
    }, []);

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

    const handleDelete = async (postId) => {
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
        setPosts(posts.filter(p => p.post_id !== postId));
      } else {
        alert("Lỗi: " + result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API xóa:", error);
    }
  };
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-slate-500 font-bold">
                Đang tải dữ liệu...
            </div>
        );
    }

    return (
        <div className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Duyệt bài đăng</h2>
                    <p className="text-slate-400 text-sm">Quản lý và kiểm duyệt nội dung cộng đồng</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-2xl text-xs font-black uppercase">
                        Đang chờ: {posts.length}
                    </span>
                    <Link to='/admin/post' className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-2xl text-xs font-bold hover:bg-slate-200 transition-all">
                        <ArrowLeft size={14} /> QUAY LẠI
                    </Link>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden border border-slate-100 rounded-3xl">
                <div className="overflow-x-auto overflow-y-auto max-h-[650px] no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-slate-50 z-10">
                            <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100">
                                <th className="p-5 font-bold">Nội dung bài viết</th>
                                <th className="p-5 font-bold">Loại</th>
                                <th className="p-5 font-bold">Người đăng</th>
                                <th className="p-5 font-bold">Danh mục</th>
                                <th className="p-5 font-bold text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post.post_id} className="hover:bg-slate-50/80 transition-all group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <img src={post.img || 'https://via.placeholder.com/150'} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                                                <div>
                                                    <div className="font-black text-slate-700 text-sm group-hover:text-emerald-600 transition-colors">{post.title}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">ID: #{post.post_id} • {post.created_at ? new Date(post.created_at).toLocaleDateString('vi-VN') : 'Vừa xong'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-[10px] px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-black uppercase tracking-tighter">
                                                {post.type}
                                            </span>
                                        </td>
                                        <td className="p-5 text-sm font-bold text-slate-600">
                                            {post.user?.name || "Ẩn danh"}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-wrap gap-1 max-w-[150px]">
                                                {post.categories?.length > 0 ? (
                                                    post.categories.map((cat) => (
                                                        <span key={cat.id} className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-bold border border-emerald-100">
                                                            {cat.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-slate-300 text-[9px]">Không có</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex justify-end gap-2">
                                                {post.status === 0 ? (<>
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
                                                </>
                                                ) : (<>
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
                                                        onClick={() => handleDelete(post.post_id)}
                                                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                                        title="Xóa"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-slate-400 font-bold italic">
                                        Mọi thứ đã sạch sẽ! Không có bài nào chờ duyệt.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}