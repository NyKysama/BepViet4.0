import { ChevronLeft } from 'lucide-react';
import CommentSection from '../../../components/users/CommentSection';

export default function BlogDetail({ post }) {
    return (
        <div className="max-w-[1000px] mx-auto bg-gray-50 min-h-screen pb-20">
            <div className="relative h-[400px] w-full">
                <img src={post.img} className="w-full h-full object-cover" alt={post.title} />
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
                            Nguyễn Văn A
                        </span>
                    </div>
                    <div className="border-b border-slate-50 pb-8 mb-8">
                        <h1 className="text-3xl font-black text-slate-800 mb-4">{post.title}</h1>
                        <p className="text-base leading-relaxed text-slate-600 mt-2">
                            {post.description}
                        </p>
                    </div>
                    {/* 4. Đánh giá & Bình luận (Xếp cuối bài) */}
                    <div className="bg-slate-50 rounded-[32px] p-6">
                        <h3 className="font-black text-slate-800 mb-6 text-xl px-2">Bình luận từ cộng đồng</h3>
                        <CommentSection />
                    </div>
                </div>
            </div>
        </div>
    );
}