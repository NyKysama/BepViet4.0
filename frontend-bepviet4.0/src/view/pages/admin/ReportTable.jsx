import React, { useEffect, useState } from 'react';
import { Trash2, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReportTable() {
    // Khởi tạo là null hoặc object có mảng reports để tránh lỗi render lần đầu
    const [data, setData] = useState({ reports: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard/stats', {
                headers: { 'Accept': 'application/json' }
            });
            const result = await response.json();
            setData(result); // Giả sử result có dạng { reports: [...] }
        } catch (error) {
            console.error("Lỗi lấy danh sách báo cáo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 1. Hành động Xóa bài viết (Xóa sạch các báo cáo liên quan bài đó)
    const handleDeletePost = async (postId) => {
        if (!window.confirm("Xóa bài viết này sẽ đồng nghĩa với việc bác bỏ các báo cáo liên quan. Tiếp tục?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/delete-post/${postId}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert("Đã xóa bài viết thành công");
                // Cập nhật UI: Lọc bỏ tất cả report có post_id này
                setData(prev => ({
                    ...prev,
                    reports: prev.reports.filter(r => r.post_id !== postId)
                }));
            }
        } catch (error) {
            console.error("Lỗi khi xóa bài:", error);
        }
    };

    // 2. Hành động Bác bỏ báo cáo (Chỉ xóa 1 dòng báo cáo đó)
    const handleDismissReport = async (reportId) => {
        if (!window.confirm("Bạn muốn bác bỏ báo cáo này?")) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/delete-report/${reportId}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert("Đã bác bỏ báo cáo");
                setData(prev => ({
                    ...prev,
                    reports: prev.reports.filter(r => r.id_report !== reportId)
                }));
            }
        } catch (error) {
            console.error("Lỗi khi bác bỏ:", error);
        }
    };

    if (isLoading) return <div className="p-10 text-center font-medium">Đang tải dữ liệu báo cáo...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-8">
                <AlertTriangle className="text-rose-500" size={32} />
                <h2 className="text-2xl font-black text-slate-800">Danh sách báo cáo vi phạm</h2>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-4 text-sm font-bold text-slate-600">ID</th>
                            <th className="p-4 text-sm font-bold text-slate-600">Người báo cáo</th>
                            <th className="p-4 text-sm font-bold text-slate-600">Bài viết bị báo cáo</th>
                            <th className="p-4 text-sm font-bold text-slate-600">Ngày gửi</th>
                            <th className="p-4 text-sm font-bold text-slate-600 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.reports?.map((report) => (
                            <tr key={report.id_report} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 text-sm text-slate-500">#{report.id_report}</td>
                                <td className="p-4">
                                    <Link to={`/admin/user/${report.user?.user_id}`} className="flex items-center gap-3 group">
                                        <img 
                                            src={report.user?.avatar ? `http://127.0.0.1:8000/${report.user.avatar}` : '/default-avatar.png'} 
                                            alt="avatar" 
                                            className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                                        />
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-600">
                                            {report.user?.name || "Nguời dùng ẩn"}
                                        </span>
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800 line-clamp-1">
                                            {report.post?.title || "Bài viết không tồn tại"}
                                        </span>
                                        <Link 
                                            to={report.post?.type === "Blog" ? `/admin/post/blog-detail/${report.post_id}` : `/admin/post/recipe-detail/${report.post_id}`} 
                                            className="text-[11px] text-emerald-600 flex items-center gap-1 hover:underline mt-1"
                                        >
                                            Xem chi tiết <ExternalLink size={10} />
                                        </Link>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-500">
                                    {new Date(report.created_at).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <button 
                                            onClick={() => handleDismissReport(report.id_report)}
                                            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                                            title="Bác bỏ báo cáo"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeletePost(report.post_id)}
                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                            title="Xóa bài viết vi phạm"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {(!data.reports || data.reports.length === 0) && (
                    <div className="p-20 text-center text-slate-400">
                        <p className="italic text-lg">Làm việc tốt lắm! Không có báo cáo nào cần xử lý.</p>
                    </div>
                )}
            </div>
        </div>
    );
}