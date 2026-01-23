import { useState, useEffect } from "react";
import { Camera, Edit2, UserPlus, Users } from 'lucide-react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMyAccount } from "../../contexts/user/MyAccountContext";

export default function ProfileSumary({setUser_Info,user, isMyAccount }) {
    const user_info = user
    const { myAccount, setMyAccount } = useMyAccount()
    const [newCap, setNewCap] = useState("chua co caption")
    const [isFollowing, setIsFollowing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate()
    var following

    //dang xuat
    const handleLogout = () => {
        localStorage.removeItem("user_data"); // hoặc access_token
        setMyAccount(null)
        navigate("/login")
        return
    };
    useEffect(() => {
        if (myAccount) {
            following = myAccount?.followings.find(p => p?.user_id == user_info?.user_id)// sai lam:following=myAccount.followings.filter(p=>{p.user_id==user_info.user_id}) co {} thi phai co return
            if (following) {
                setIsFollowing(true)
            } else (setIsFollowing(false))
            console.log(following)
        }
    }, [user_info, myAccount])
    //Folow
    async function handleFollow(){
        try {
            const res=await fetch(`http://localhost:8000/api/follow`,{
                        method:"POST",
                        headers:{"Content-Type": "application/json",},
                        body:JSON.stringify({follower_id:myAccount.user_id,
                        following_id:user_info.user_id,
                        })
                     })
            const data=await res.json()
            if(!res.ok){
                return
            }
            setMyAccount(prev=>({...prev,followings:[...prev.followings,data.following]}))
            setUser_Info(prev=>({...prev,followings:[...prev.followers,myAccount]}))
            setIsFollowing(true)
            console.log(data)
            navigate(0)
        }catch (error) {
            
        }
        setIsFollowing(true)
    }
    async function handleUnfollow() {
        try {
            const res=await fetch(`http://localhost:8000/api/unfollow`,{
                        method:"POST",
                        headers:{"Content-Type": "application/json",},
                        body:JSON.stringify({follower_id:myAccount.user_id,
                        following_id:user_info.user_id,
                        })
                     })
            const data=await res.json()
            if(!res.ok){
                return
            }
            setMyAccount(prev=>({...prev,followings:[prev.followings.filter(f=>f.user_id!=user_info.user_id)]}))
            setIsFollowing(false)
            console.log(data)
            navigate(0)
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleChangeAvatar = async(e) => {
    const file = e.target.files[0];
        if (file) {
        // Kiểm tra file có phải là ảnh không
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }

        // Kiểm tra kích thước file (ví dụ: tối đa 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Kích thước ảnh không được vượt quá 5MB!');
            return;
        }
        try {
            //Luu vao formdata
            const formData = new FormData();
            formData.append("user_id", myAccount.user_id)
            if (file) {formData.append("image_file", file)}
            const res = await fetch("http://127.0.0.1:8000/api/user/update-avatar", {
                            method: "POST",
                            body: formData,
                            headers: {
                            Accept: "application/json",
                            // Authorization: `Bearer ${token}` // nếu có login
                            },
                        })
            const data=await res.json()
            setMyAccount(prev => ({
            ...prev,
            avatar: data.user.avatar
            }));
            navigate(0)
            if(!res.ok){
                return
            }
            console.log(data)
        } catch (error) {
            
        }
        // Đọc file và chuyển thành base64 để hiển thị
        // setNewCookbook(prev=>({...prev,imageFile:file}))
        // setPreview(URL.createObjectURL(file))
        }
     }
    return (
        <>
            {/* Header Section */}
            <div className="bg-white shadow-sm rounded-xl relative">
                {isMyAccount && <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition"
                >
                    Đăng xuất
                </button>}


                <div className="max-w-5xl mx-auto px-4 py-6">
                    {/* Profile Info */}
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:justify-start">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                                <img
                                    src={"http://127.0.0.1:8000/"+user_info?.avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isMyAccount && 
                            <>
                                <label  className="absolute bottom-0 right-0 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white hover:bg-green-500 transition shadow-lg">
                                    <Camera size={20} />
                                                                    <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleChangeAvatar}
                                />
                                </label>
                            </>  
                            }
                        </div>

                        {/* Info & Actions */}
                        <div className="flex-1 text-center md:text-left w-full">
                            <div className="flex flex-col items-center md:items-start gap-4 mb-3">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user_info?.username}</h1>
                                <div className="flex gap-2 justify-center md:justify-start">
                                    {!isMyAccount &&
                                        <div>
                                            {isFollowing ? (
                                                <button
                                                    onClick={handleUnfollow}
                                                    className="px-6 py-2 rounded-full font-semibold transition
                                                bg-orange-50 text-yellow-400 hover:bg-orange-100"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Users size={18} />
                                                        Đang theo dõi
                                                    </span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleFollow}
                                                    className="px-6 py-2 rounded-full font-semibold transition
                                                bg-green-400 text-white hover:bg-green-500"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <UserPlus size={18} />
                                                        Theo dõi
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    }
                                    {isMyAccount &&
                                        <Link to="/my-info"
                                            
                                            className="p-2 rounded-full  bg-orange-50 hover:bg-orange-100 transition"
                                        >
                                            <p className="text-yellow-500 font-semibold">Thông tin cá nhân</p>{/*<Edit2 size={20} className="text-gray-600" />*/}
                                        </Link>
                                    }

                                </div>
                            </div>

                            <p className="text-gray-600 mb-4 max-w-md mx-auto md:mx-0">chua co caption</p>

                            {/* Stats */}
                            <div className="flex gap-6 text-sm justify-center md:justify-start">
                                <div className="text-center md:text-left">
                                    <div className="font-bold text-xl text-gray-800">{user?.posts.filter(r => r.type == "Công thức")?.length || 0}</div>
                                    <div className="text-gray-500">Công thức</div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="font-bold text-xl text-gray-800">{user?.followers?.length || "Nav"}</div>
                                    <div className="text-gray-500">Người theo dõi</div>
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="font-bold text-xl text-gray-800">{user?.followings?.length || "Nav"}</div>
                                    <div className="text-gray-500">Đang theo dõi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {/* {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chỉnh sửa caption</h2>
                        <textarea
                            value={newCap}
                            onChange={(e) => setNewCap(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            rows="4"
                            placeholder="Nhập caption của bạn..."
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => {
                                    setShowEditModal(false)
                                    // setUserProfile({...userProfile,caption:newCap})
                                }}
                                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}