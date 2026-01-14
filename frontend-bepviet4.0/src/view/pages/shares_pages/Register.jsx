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
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 py-12 font-sans text-slate-900">
      <div className="w-full max-w-2xl bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Đăng ký thành viên
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">Bếp Việt 4.0</h1>
          <p className="text-slate-400 font-medium">Khám phá tinh hoa ẩm thực Việt cùng chúng tôi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Avatar Upload */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 ring-2 ring-emerald-500/10 transition-all group-hover:ring-emerald-500/30">
                <img
                  src={preview || 'http://localhost:8000/images/avatar.png'}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              </div>
              <label className="absolute bottom-1 right-1 bg-emerald-500 p-2.5 rounded-full cursor-pointer text-white shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all border-2 border-white">
                <Camera size={18} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            {errors.avatar && <p className="text-red-500 text-[11px] mt-2 font-bold italic">{errors.avatar[0]}</p>}
            <p className="text-[11px] font-bold text-slate-400 uppercase mt-3 tracking-widest">Ảnh đại diện</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* Field: Name */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Họ và Tên</label>
              <div className="relative group">
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium"
                  placeholder="Họ và tên" 
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.name[0]}</p>}
            </div>

            {/* Field: Username */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Tên đăng nhập</label>
              <div className="relative group">
                <input 
                  type="text" name="username" value={formData.username} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium"
                  placeholder="Tên đăng nhập" 
                />
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
              {errors.username && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.username[0]}</p>}
            </div>

            {/* Field: Email */}
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Địa chỉ Email</label>
              <div className="relative group">
                <input 
                  type="email" name="gmail" value={formData.gmail} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium"
                  placeholder="example@gmail.com" 
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
              {errors.gmail && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.gmail[0]}</p>}
            </div>

            {/* Field: Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Mật khẩu</label>
              <div className="relative group">
                <input 
                  type="password" name="password" value={formData.password} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium"
                  placeholder="••••••••" 
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
              {errors.password && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.password[0]}</p>}
            </div>

            {/* Field: Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Xác nhận</label>
              <div className="relative group">
                <input 
                  type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium"
                  placeholder="••••••••" 
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            {/* Field: Birthday */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Ngày sinh</label>
              <div className="relative group">
                <input 
                  type="date" name="birthday" value={formData.birthday} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium text-slate-500"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            {/* Field: Sex */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Giới tính</label>
              <div className="relative">
                <select 
                  name="sex" value={formData.sex} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-sm font-medium text-slate-600 appearance-none cursor-pointer"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowRight className="rotate-90 text-slate-400" size={16} />
                </div>
              </div>
            </div>

            {/* Field: Phone */}
            <div className="col-span-2 space-y-1.5">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1 tracking-wider">Số điện thoại</label>
              <div className="relative group">
                <input 
                  type="text" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all pl-12 text-sm font-medium"
                  placeholder="09xx xxx xxx" 
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
              {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone[0]}</p>}
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-emerald-500 text-white p-5 rounded-[24px] font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>HOÀN TẤT ĐĂNG KÝ <ArrowRight size={22} /></>
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-8 text-slate-400 font-bold text-sm">
          Đã có tài khoản? <a href="/login" className="text-emerald-600 hover:text-emerald-700 transition-colors ml-1">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
}