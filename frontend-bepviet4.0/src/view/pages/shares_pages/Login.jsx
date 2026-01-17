import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight,Eye, EyeOff } from 'lucide-react';
import LoginSuccessPopup from '../../../components/users/LoginSuccessPopup';
import { useMyAccount } from '../../../contexts/user/MyAccountContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login_info, setLogin_Info] = useState({
    "username": "",
    "password": "",
  });
  const { myAccount, setMyAccount } = useMyAccount()
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate();
  function closePopup() {
    if (myAccount) {
      setShowPopup(false)
      navigate("/")
    }
    else {
      setShowPopup(false)
      navigate("/login")
      return
    }

  }

  async function handleLogin(e) {
    e.preventDefault();
    // // Reset lại trạng thái trước khi bắt đầu
    // setIsLogin(false); 

    try {
      const res = await fetch("http://localhost:8000/api/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login_info.username, // Nên dùng state thay vì fix cứng
          password: login_info.password,
        }),
      });

      const data = await res.json();

      // KIỂM TRA LỖI Ở ĐÂY
      if (!res.ok) {
        // Nếu không ok (ví dụ 401), ném lỗi để nhảy xuống catch
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // Nếu ok thì mới gán thành công
      setMyAccount(data.user);
      // BẮT BUỘC: Chuyển Object thành String bằng JSON.stringify
      localStorage.setItem('user_data', JSON.stringify(data.user));
      // setIsLogin(true);
      // localStorage.setItem('isLogin',"true")
      console.log("Thành công:", data);

    } catch (error) {
      // Luồng code sẽ nhảy vào đây nếu ném Error ở trên hoặc lỗi mạng
      // setIsLogin(false);
      console.log("Lỗi đăng nhập:", error.message);
    } finally {
      // Dù thành công hay lỗi đều hiện Popup
      setShowPopup(true);
    }
  }
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50">

        {/*LoginSuccessPopup*/}
        {showPopup && <LoginSuccessPopup onClose={closePopup} success={myAccount?true:false}></LoginSuccessPopup>}

        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center ">
            <img alt="logo" class="w-9 h-9 rounded-full cursor-pointer" src="/logo_BepViet.png" className="avatar-img"></img>
          </div>
          <h1 className="text-2xl font-black text-slate-800">Chào mừng trở lại!</h1>
          <p className="text-slate-400 font-medium mt-1">Đăng nhập trải nghiệm đầy đủ chức năng</p>
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
                onChange={(e) => setLogin_Info({ ...login_info, username: e.target.value })}
                value={login_info.username}
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
                onChange={(e) => setLogin_Info({ ...login_info, password: e.target.value })}
                value={login_info.password}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/3 text-gray-500"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          {/* <div className="text-right">
            <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Quên mật khẩu?</a>
          </div> */}

          <button className="w-full bg-emerald-500 text-white p-4 rounded-2xl font-black text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4"
            onClick={(e) => {
              handleLogin(e)

            }}
          >
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