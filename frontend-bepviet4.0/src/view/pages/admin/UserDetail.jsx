import React from 'react';
import { 
  ArrowLeft, Edit, Lock, Trash2, Mail, Phone, Calendar, 
  User, Shield, MapPin, CheckCircle, Clock, BookOpen 
} from 'lucide-react';
import { useParams} from 'react-router-dom';

export default function UserDetail () {
    const { id } = useParams();

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* Thanh điều hướng quay lại */}
      <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all mb-6 font-medium">
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI: Thẻ Profile chính */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 text-center">
            <div className="relative inline-block">
              <img src="user.avatar" className="w-32 h-32 rounded-full border-4 border-emerald-50 mx-auto object-cover" alt="" />
              <div className="absolute bottom-1 right-1 bg-emerald-500 border-4 border-white w-6 h-6 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">user.name</h2>
            <p className="text-emerald-600 font-medium text-sm">@user.username</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                user.role
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                user.status
              </span>
            </div>

            {/* Các nút hành động Admin */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-2xl font-bold hover:bg-slate-700 transition-all">
                <Lock size={18} /> Khóa
              </button>
              <button className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all text-sm">
                <Trash2 size={18} /> Xóa
              </button>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Thông tin chi tiết */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <User className="text-emerald-500" /> Thông tin hồ sơ
              </h3>
              <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
                <Edit size={18} /> Chỉnh sửa
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cột thông tin 1 */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Họ và tên</label>
                  <p className="text-slate-700 font-medium mt-1">user.name</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                    <Mail size={16} className="text-slate-300" /> user.gmail
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                  <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                    <Phone size={16} className="text-slate-300" /> user.phone
                  </p>
                </div>
              </div>

              {/* Cột thông tin 2 */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày sinh</label>
                  <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-300" /> user.birthday
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giới tính</label>
                  <p className="text-slate-700 font-medium mt-1">user.sex</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug định danh</label>
                  <p className="text-slate-400 font-mono text-xs mt-1 italic">/user.slug</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thống kê nhanh hoạt động */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-6 rounded-[24px] border border-emerald-100 text-center">
              <BookOpen className="text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-emerald-700">12</div>
              <div className="text-xs font-bold text-emerald-600/70 uppercase">Bài đăng</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-[24px] border border-blue-100 text-center">
              <CheckCircle className="text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-blue-700">45</div>
              <div className="text-xs font-bold text-blue-600/70 uppercase">Bình luận</div>
            </div>
            <div className="bg-slate-100 p-6 rounded-[24px] border border-slate-200 text-center">
              <Clock className="text-slate-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-700">6th</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Thành viên</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};