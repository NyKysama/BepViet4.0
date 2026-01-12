import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, UtensilsCrossed } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md">
        {/* Hình ảnh minh họa vui nhộn */}
        <div className="relative mb-8">
          <div className="text-[150px] font-black text-slate-200 leading-none">404</div>          
        </div>
        {/* Nút điều hướng */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
          >
            <ArrowLeft size={20} /> Quay lại
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all"
          >
            <Home size={20} /> Trang chủ
          </button>
        </div>

        {/* Gợi ý nhỏ */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
            Bếp Việt 4.0 - Hệ thống quản lý ẩm thực
          </p>
        </div>
      </div>
    </div>
  );
}