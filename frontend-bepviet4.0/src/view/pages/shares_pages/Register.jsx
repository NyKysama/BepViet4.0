import { User, Mail, Lock, Phone, Calendar, Users, ArrowRight, Camera } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    gmail: '',
    password: '',
    phone: '',
    birthday: '',
    sex: 'Nam',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // 1. Xử lý thay đổi input văn bản
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Xử lý chọn ảnh và tạo Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file)); // Tạo link tạm để hiện ảnh
    }
  };

  // 3. Gửi dữ liệu lên Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // BẮT BUỘC dùng FormData khi có gửi file
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (avatarFile) {
      data.append('avatar', avatarFile);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        body: data, // Không để Content-Type, trình duyệt sẽ tự hiểu là multipart/form-data
      });

      const result = await response.json();

      if (response.status === 422) {
        setErrors(result.errors);
      } else if (response.ok) {
        alert("Đăng ký thành công!");
        // Reset form hoặc chuyển hướng ở đây
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/60">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Tham gia Bếp Việt 4.0</h1>
          <p className="text-slate-400 mt-2 font-medium">Vui lòng điền đầy đủ thông tin để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative w-24 h-24 group">
              <img
                src={preview || 'https://via.placeholder.com/150'}
                className="w-full h-full rounded-full object-cover border-4 border-orange-100 group-hover:border-orange-200 transition-all"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer text-white shadow-lg hover:scale-110 transition-transform">
                <Camera size={16} />
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            </div>
            {errors.avatar && <p className="text-red-500 text-[10px] mt-2">{errors.avatar[0]}</p>}

            <p className="text-xs text-gray-500">Chọn ảnh đại diện của bạn</p>
          </div>
          {/* Họ tên */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Họ và Tên</label>
            <div className="mt-1 relative">
              <input type="text" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="Họ và tên" name="name" value={formData.name} onChange={handleChange} />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            {errors.name && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.name[0]}</p>}
            </div>
          </div>

          {/* Username */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Tên đăng nhập</label>
            <div className="mt-1 relative">
              <input type="text" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="Tên đăng nhập" name="username" value={formData.username} onChange={handleChange} />
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            </div>
            {errors.username && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.username[0]}</p>}
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Địa chỉ Email (Gmail)</label>
            <div className="mt-1 relative">
              <input name="gmail" value={formData.gmail} onChange={handleChange} type="email" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="example@gmail.com" />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              {errors.gmail && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.gmail[0]}</p>}
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Mật khẩu</label>
            <div className="mt-1 relative">
              <input type="password" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="••••••••" name="password" value={formData.password} onChange={handleChange} />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              {errors.password && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.password[0]}</p>}
            </div>
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Xác nhận mật khẩu</label>
            <div className="mt-1 relative">
              <input type="password" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="••••••••" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              {errors.password_confirmation && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.password_confirmation[0]}</p>}
            </div>
          </div>

          {/* Ngày sinh */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Ngày sinh</label>
            <div className="mt-1 relative">
              <input type="date" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11 text-slate-500" name="birthday" value={formData.birthday} onChange={handleChange} />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              {errors.birthday && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.birthday[0]}</p>}
            </div>
          </div>

          {/* Giới tính */}
          <div className="col-span-2 md:col-span-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Giới tính</label>
            <select className="w-full mt-1 p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-500 font-medium" name="sex" value={formData.sex} onChange={handleChange}>
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
            {errors.sex && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.sex[0]}</p>}
          </div>

          {/* Số điện thoại */}
          <div className="col-span-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Số điện thoại</label>
            <div className="mt-1 relative">
              <input type="text" className="w-full p-3.5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/20 pl-11" placeholder="0xxx xxx xxx" name="phone" value={formData.phone} onChange={handleChange} />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              {errors.phone && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium italic">*{errors.phone[0]}</p>}
            </div>
          </div>

          {/* Button Đăng ký */}
          <div className="col-span-2 pt-4">
            <button type="submit" className="w-full bg-emerald-500 text-white p-4 rounded-2xl font-black text-lg shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
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