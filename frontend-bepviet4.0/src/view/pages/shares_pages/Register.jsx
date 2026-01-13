import { User, Mail, Lock, Phone, Calendar, Users, ArrowRight } from "lucide-react";

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/60">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Tham gia Bếp Việt 4.0</h1>
          <p className="text-slate-400 mt-2 font-medium">Vui lòng điền đầy đủ thông tin để tiếp tục</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Họ tên */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Họ và Tên</label>
            <div className="mt-1 relative">
              <input type="text" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="Nguyễn Văn A" />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Username */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Tên đăng nhập</label>
            <div className="mt-1 relative">
              <input type="text" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="user123" />
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Địa chỉ Email (Gmail)</label>
            <div className="mt-1 relative">
              <input type="email" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="example@gmail.com" />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Mật khẩu</label>
            <div className="mt-1 relative">
              <input type="password" virtual className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="••••••••" />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Xác nhận mật khẩu</label>
            <div className="mt-1 relative">
              <input type="password" virtual className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="••••••••" />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Ngày sinh */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Ngày sinh</label>
            <div className="mt-1 relative">
              <input type="date" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11 text-slate-500" />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Giới tính */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Giới tính</label>
            <select className="w-full mt-1 p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-500 font-medium">
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </div>

          {/* Số điện thoại */}
          <div className="col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Số điện thoại</label>
            <div className="mt-1 relative">
              <input type="text" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="0xxx xxx xxx" />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
          </div>

          {/* Button Đăng ký */}
          <div className="col-span-2 pt-4">
            <button className="w-full bg-emerald-500 text-white p-4 rounded-2xl font-black text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
              HOÀN TẤT ĐĂNG KÝ <ArrowRight size={20} />
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-slate-500 font-medium text-sm">
          Đã có tài khoản? <a href="/login" className="text-emerald-600 font-black">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
}