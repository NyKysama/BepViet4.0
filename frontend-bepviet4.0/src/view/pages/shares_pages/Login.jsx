import React from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-200 mb-4">
            <span className="text-white text-3xl font-black">B</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800">Chào mừng trở lại!</h1>
          <p className="text-slate-400 font-medium mt-1">Đăng nhập để quản lý bếp của bạn</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email</label>
            <div className="mt-1.5 relative">
              <input 
                type="email" 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all pl-12"
                placeholder="email@vidu.com"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mật khẩu</label>
            <div className="mt-1.5 relative">
              <input 
                type="password" 
                className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all pl-12"
                placeholder="••••••••"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Quên mật khẩu?</a>
          </div>

          <button className="w-full bg-emerald-500 text-white p-4 rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4">
            ĐĂNG NHẬP <LogIn size={20} />
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 font-medium">
          Chưa có tài khoản? <a href="/register" className="text-emerald-600 font-bold">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}