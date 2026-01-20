import { React, useState } from 'react';
import {
    ArrowLeft, Edit, Lock, Trash2, Mail, Phone, Calendar,
    User, Shield, MapPin, CheckCircle, Clock, BookOpen, Save,
} from 'lucide-react';
import { useMyAccount } from '../../../contexts/user/MyAccountContext';
import { data,Link } from 'react-router-dom';

export default function UserInfo() {
    //khai bao bien
    const {myAccount,setMyAccount} = useMyAccount()
    const [isEditting, setIsEditting] = useState(false)
    const [newUserInfo,setNewUserInfo]=useState({
        name:myAccount.name,
        username:myAccount.username,
        birthday:myAccount.birthday,
        phone:myAccount.phone,
        sex:myAccount.sex,
    })
    //ham
    function handleEdit(){
        setIsEditting(true)
    }
    async function updateInfo(){
        //Sửa kép: sửa trên csdl sửa trên context
        console.log(newUserInfo,myAccount)
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
            setMyAccount({...myAccount,...newUserInfo})//sai: setMyAccount({...myAccount,newUserInfo})
            console.log("sua thanh cong")
            setIsEditting(false)

        } catch (error) {
            
        }
    }
    function handleCancelEdit(){
        setIsEditting(false)
    }
    return (
        <div className="p-8 bg-[#F8FAFC] min-h-screen">
            {/* Thanh điều hướng quay lại */}
            <Link to="/user-profile/my-account" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all mb-6 font-medium">
                <ArrowLeft size={20} /> Quay lại trang cá nhân
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* CỘT TRÁI: Thẻ Profile chính */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 text-center">
                        <div className="relative inline-block">
                            <img src={myAccount?.avatar_url} className="w-32 h-32 rounded-full border-4 border-emerald-50 mx-auto object-cover" alt="" />
                            <div className="absolute bottom-1 right-1 bg-emerald-500 border-4 border-white w-6 h-6 rounded-full"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mt-4">{myAccount?.name}</h2>
                        <p className="text-emerald-600 font-medium text-sm">@{myAccount?.username}</p>
                        {/* <div className="mt-4 flex justify-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                user.role
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                user.status
              </span>
            </div> */}

                        {/* Các nút hành động Admin */}
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            {/* <button className="flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-2xl font-bold hover:bg-slate-700 transition-all">
                <Lock size={18} /> Khóa
              </button>
              <button className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all text-sm">
                <Trash2 size={18} /> Xóa
              </button> */}
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
                                                onChange={(e)=>setNewUserInfo({...newUserInfo,name:e.target.value})}
                                                className="w-full text-slate-700 font-medium mt-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">username</label>
                                                 <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                                                <Mail size={16} className="text-slate-300" /> {myAccount.username}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                                            <div className="relative mt-1">
                                                <Phone size={16} className="text-slate-300 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="tel"
                                                    value={newUserInfo?.phone}
                                                    onChange={(e)=>setNewUserInfo({...newUserInfo,phone:e.target.value})}
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
                                                    onChange={(e)=>setNewUserInfo({...newUserInfo,birthday:e.target.value})}
                                                    className="w-full text-slate-700 font-medium pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giới tính</label>
                                            <select
                                                value={newUserInfo?.sex}
                                                onChange={(e)=>setNewUserInfo({...newUserInfo,sex:e.target.value})}
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
                                    onClick={()=>handleEdit()}
                                    >
                                        <Edit size={18} /> Chỉnh sửa
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Cột thông tin 1 */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Họ và tên</label>
                                            <p className="text-slate-700 font-medium mt-1">{myAccount?.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">username</label>
                                            <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                                                <Mail size={16} className="text-slate-300" /> {myAccount.username}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Số điện thoại</label>
                                            <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                                                <Phone size={16} className="text-slate-300" /> {myAccount.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Cột thông tin 2 */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ngày sinh</label>
                                            <p className="text-slate-700 font-medium mt-1 flex items-center gap-2">
                                                <Calendar size={16} className="text-slate-300" />{myAccount.birthday}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giới tính</label>
                                            <p className="text-slate-700 font-medium mt-1">{myAccount.sex}</p>
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
                            <div className="text-2xl font-black text-emerald-700">{myAccount.posts.length}</div>
                            <div className="text-xs font-bold text-emerald-600/70 uppercase">Bài đăng</div>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-[24px] border border-blue-100 text-center">
                            <CheckCircle className="text-blue-600 mx-auto mb-2" />
                            <div className="text-2xl font-black text-blue-700">45</div>
                            <div className="text-xs font-bold text-blue-600/70 uppercase">Bình luận</div>
                        </div>
                        <div className="bg-slate-100 p-6 rounded-[24px] border border-slate-200 text-center">
                            <Clock className="text-slate-600 mx-auto mb-2" />
                            <div className="text-2xl font-black text-slate-700">{Math.floor((Date.now() - new Date(myAccount.created_at)) / (1000 * 60 * 60 * 24))} ngày</div>
                            <div className="text-xs font-bold text-slate-500 uppercase">Tham gia </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};