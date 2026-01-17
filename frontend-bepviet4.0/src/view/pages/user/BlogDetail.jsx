import { ChevronLeft } from 'lucide-react';
import CommentSection from '../../../components/users/CommentSection';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function BlogDetail() {
    const [blog, setBlog] = useState({});
    const {id} = useParams();
    useEffect(() =>{ 
      fetch(`http://127.0.0.1:8000/api/blog-detail/${id}`)
        .then(res => res.json())
        .then(data => setBlog(data));
    }, [id]);
    return (
        <div className="max-w-[1000px] mx-auto bg-gray-50 min-h-screen pb-20">
            <div className="relative h-[400px] w-full">
                <img src={`http://127.0.0.1:8000/${blog.img}`} className="w-full h-full object-cover" alt={blog.title} />
                <div className="absolute inset-0 bg-black/20" />
                <button className="absolute top-6 left-6 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <ChevronLeft size={24} />
                </button>
            </div>

            <div className="px-6 -mt-16 relative z-10 pb-20">
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 max-w-[800px] mx-auto">

                    {/* 1. Thông tin chung & Stats */}
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src="..." // Thay "..." bằng đường dẫn đến ảnh avatar của người dùng
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="text-2xl font-semibold text-gray-800">
                            {blog.user?.name}
                        </span>
                    </div>
                    <div className="border-b border-slate-50 pb-8 mb-8">
                        <h1 className="text-3xl font-black text-slate-800 mb-4">{blog.title}</h1>
                        <p className="text-base leading-relaxed text-slate-600 mt-2">
                            {blog.description}
                        </p>
                    </div>
                    {/* 4. Đánh giá & Bình luận (Xếp cuối bài) */}
                    <div className="bg-slate-50 rounded-[32px] p-6">
                        <h3 className="font-black text-slate-800 mb-6 text-xl px-2">Bình luận từ cộng đồng</h3>
                        <CommentSection id={blog.post_id} />
                    </div>
                </div>
            </div>
        </div>
    );
}