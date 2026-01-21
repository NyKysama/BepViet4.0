import { React, useState, useEffect } from 'react';
import {
  ArrowLeft, Edit, Lock, Trash2, Mail, Phone, Calendar,
  User, Shield, MapPin, CheckCircle, Clock, BookOpen, Save
} from 'lucide-react';
import { useParams,useNavigate } from 'react-router-dom';
import LoadingPage from '../../../components/users/LoadingPage';

export default function UserDetail() {
  const { user_id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [user_info, setUser_Info] = useState();
  const [newUserInfo, setNewUserInfo] = useState({})
  const [isEditting, setIsEditting] = useState(false)
  const nagivate=useNavigate()
  //ham goi api
  async function fetchUser_Info(user_id) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/admin/user/${user_id}`)
      const data = await res.json();
      if (!res.ok) {
        return
      }
      setUser_Info(data.user)
      setNewUserInfo({...newUserInfo,  name: data.user.name,
      username: data.user.username,
      birthday: data.user.birthday,
      phone: data.user.phone,
      sex: data.user.sex,})
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchUser_Info(user_id)
  }, [user_id])
  //dinh nghia cac ham phu
  function handleEdit(){//bat form edit
    setIsEditting(true)
  }
  function handleCancelEdit(){//tat form edit
    setIsEditting(false)
  }
  async function updateInfo(){
    //Sửa kép: sửa trên csdl sửa trên context
    console.log(newUserInfo)
    //sửa trên csdl ok-> sua tren context  
    try {
      const res= await fetch("http://localhost:8000/api/update-user",{
                        method:"POST",
                        headers:{"Content-Type": "application/json",},
                        body:JSON.stringify({
                        ...newUserInfo
                        })
                      })
      const data=res.json()
      if(!res.ok){
        throw new Error("Update failed")
      }
      //sửa trên context
      setUser_Info(data.user)//sai: setMyAccount({...myAccount,newUserInfo})
      console.log("sua thanh cong")
      setIsEditting(false)
      nagivate(0)
      }catch (error) {
            
      }finally{

      }
    }
  //load trang trc khi tai het du lieu
  if (isLoading) {
    return (<LoadingPage></LoadingPage>)
  }

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
              <img src={"http://127.0.0.1:8000/"+user_info?.avatar} className="w-32 h-32 rounded-full border-4 border-emerald-50 mx-auto object-cover" alt="" />
              <div className="absolute bottom-1 right-1 bg-emerald-500 border-4 border-white w-6 h-6 rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">{user_info?.name}</h2>
            <p className="text-emerald-600 font-medium text-sm">@{user_info?.username}</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {user_info?.role}
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {user_info?.status==1?"Hoạt động":"Khóa"}
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
          {isEditting ?
            <>
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <User className="text-emerald-500" /> Chỉnh sửa hồ sơ
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 transition-all"
                      onClick={handleCancelEdit}
                    >
                      Hủy
                    </button>
                    <button className="flex items-center gap-2 text-white bg-emerald-500 px-4 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all"
                      onClick={updateInfo}
                    >
                      <Save size={18} /> Lưu thay đổi
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Cột thông tin 1 */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Họ và tên</label>
                      <input
                        type="text"
                        value={newUserInfo?.name}
                        onChange={(e) => setNewUserInfo({ ...newUserInfo, name: e.target.value })}
                        className="w-full text-slate-700 font-medium mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">username</label>
                      <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                        <Mail size={16} className="text-slate-300" /> {user_info.username}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                      <div className="relative mt-1">
                        <Phone size={16} className="text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={newUserInfo?.phone}
                          onChange={(e) => setNewUserInfo({ ...newUserInfo, phone: e.target.value })}
                          className="w-full text-slate-700 font-medium pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cột thông tin 2 */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày sinh</label>
                      <div className="relative mt-1">
                        <Calendar size={16} className="text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={newUserInfo?.birthday}
                          onChange={(e) => setNewUserInfo({ ...newUserInfo, birthday: e.target.value })}
                          className="w-full text-slate-700 font-medium pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giới tính</label>
                      <select
                        value={newUserInfo?.sex}
                        onChange={(e) => setNewUserInfo({ ...newUserInfo, sex: e.target.value })}
                        className="w-full text-slate-700 font-medium mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </> :
            <>
              {/*Thong tin ca nhan*/}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <User className="text-emerald-500" /> Thông tin hồ sơ
                  </h3>
                  <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all"
                    onClick={() => handleEdit()}
                  >
                    <Edit size={18} /> Chỉnh sửa
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Cột thông tin 1 */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Họ và tên</label>
                      <p className="text-slate-700 font-medium mt-1">{user_info?.name}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">username</label>
                      <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                        <Mail size={16} className="text-slate-300" /> {user_info?.username}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                      <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                        <Phone size={16} className="text-slate-300" /> {user_info?.phone}
                      </p>
                    </div>
                  </div>

                  {/* Cột thông tin 2 */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày sinh</label>
                      <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                        <Calendar size={16} className="text-slate-300" />{user_info?.birthday}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giới tính</label>
                      <p className="text-slate-700 font-medium mt-1">{user_info?.sex}</p>
                    </div>
                    {/* <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug định danh</label>
                  <p className="text-slate-400 font-mono text-xs mt-1 italic">/user.slug</p>
                </div> */}
                  </div>
                </div>
              </div>
            </>}

          {/* Thống kê nhanh hoạt động */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-6 rounded-[24px] border border-emerald-100 text-center">
              <BookOpen className="text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-emerald-700">{user_info?.posts.length}</div>
              <div className="text-xs font-bold text-emerald-600/70 uppercase">Bài đăng</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-[24px] border border-blue-100 text-center">
              <CheckCircle className="text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-blue-700">45</div>
              <div className="text-xs font-bold text-blue-600/70 uppercase">Bình luận</div>
            </div>
            <div className="bg-slate-100 p-6 rounded-[24px] border border-slate-200 text-center">
              <Clock className="text-slate-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-slate-700">{Math.floor((Date.now() - new Date(user_info?.created_at)) / (1000 * 60 * 60 * 24))} ngày</div>
              <div className="text-xs font-bold text-slate-500 uppercase">Tham gia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};