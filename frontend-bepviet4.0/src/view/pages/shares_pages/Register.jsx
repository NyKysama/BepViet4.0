import { User, Mail, Lock, Phone, Calendar, Users, ArrowRight, Camera } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    gmail: '',
    password: '',
    password_confirmation: '',
    phone: '',
    birthday: '',
    sex: 'Nam',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (avatarFile) data.append('avatar', avatarFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      const result = await response.json();
      if (response.status === 422) {
        setErrors(result.errors);
      } else if (response.ok) {
        alert("Đăng ký thành công!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-10 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-[32px] p-6 md:p-10 shadow-2xl border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Bếp Việt 4.0</h1>
          <p className="text-slate-400 text-sm font-medium">Khám phá tinh hoa ẩm thực Việt</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">          
          
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                <img src={preview || 'http://localhost:8000/images/avatar.png'} className="w-full h-full object-cover" alt="Avatar" />
              </div>
              <label className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full cursor-pointer text-white shadow-lg hover:bg-emerald-600 transition-all border-2 border-white">
                <Camera size={16} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Họ và Tên */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Họ và Tên</label>
              <div className="relative group">
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium"
                  placeholder="Nhập họ tên" />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name[0]}</p>}
            </div>

            {/* Tên đăng nhập */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Tên đăng nhập</label>
              <div className="relative group">
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium"
                  placeholder="Username" />
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
              {errors.username && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.username[0]}</p>}
            </div>

            {/* Email - Chiếm hết 2 cột trên PC */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Địa chỉ Email</label>
              <div className="relative group">
                <input type="email" name="gmail" value={formData.gmail} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium"
                  placeholder="example@gmail.com" />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
              {errors.gmail && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.gmail[0]}</p>}
            </div>

            {/* Mật khẩu */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Mật khẩu</label>
              <div className="relative group">
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium"
                  placeholder="••••••••" />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password[0]}</p>}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Xác nhận</label>
              <div className="relative group">
                <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium"
                  placeholder="••••••••" />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
            </div>

            {/* Ngày sinh */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Ngày sinh</label>
              <div className="relative group">
                <input type="date" name="birthday" value={formData.birthday} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium" />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
            </div>

            {/* Giới tính */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Giới tính</label>
              <div className="relative">
                <select name="sex" value={formData.sex} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 px-4 text-sm font-medium appearance-none cursor-pointer">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowRight className="rotate-90 text-slate-400" size={14} />
                </div>
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">Số điện thoại</label>
              <div className="relative group">
                <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 pl-12 text-sm font-medium"
                  placeholder="09xx xxx xxx" />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500" size={18} />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone[0]}</p>}
            </div>

          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-emerald-500 text-white p-4 rounded-2xl font-bold text-lg mt-4 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-emerald-100">
            {isLoading ? "ĐANG XỬ LÝ..." : "HOÀN TẤT ĐĂNG KÝ"} <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center mt-6 text-slate-400 font-bold text-sm">
          Đã có tài khoản? <a href="/login" className="text-emerald-600 ml-1">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
}