import { useState } from "react";
import { Camera, Edit2, UserPlus, Users } from 'lucide-react';

export default function ProfileSumary({user}){
    const user_info=user
    const [newCap,setNewCap]=useState("chua co caption")
    const [isFollowing, setIsFollowing] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    return (
        <>
            {/* Header Section */}
            <div className="bg-white shadow-sm rounded-xl">
                <div className="max-w-5xl mx-auto px-4 py-6">
                {/* Profile Info */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:justify-start">
                    {/* Avatar */}
                    <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-bold overflow-hidden">
                        <img 
                        src={user_info.avatar_url}
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                        />
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white hover:bg-green-500 transition shadow-lg">
                        <Camera size={20} />
                    </button>
                    </div>

                    {/* Info & Actions */}
                    <div className="flex-1 text-center md:text-left w-full">
                    <div className="flex flex-col items-center md:items-start gap-4 mb-3">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{user_info.username}</h1>
                        <div className="flex gap-2 justify-center md:justify-start">
                        <button 
                            onClick={() => setIsFollowing(!isFollowing)}
                            className={`px-6 py-2 rounded-full font-semibold transition ${
                            isFollowing 
                                ? 'bg-orange-50 text-yellow-400 hover:bg-orange-100' 
                                : 'bg-green-400 text-white hover:bg-green-500'
                            }`}
                        >
                            {isFollowing ? (
                            <span className="flex items-center gap-2 ">
                                <Users size={18} />
                                Đang theo dõi
                            </span>
                            ) : (
                            <span className="flex items-center gap-2  ">
                                <UserPlus size={18} />
                                Theo dõi
                            </span>
                            )}
                        </button>
                        <button 
                            onClick={() => setShowEditModal(true)}
                            className="p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <Edit2 size={20} className="text-gray-600" />
                        </button>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 max-w-md mx-auto md:mx-0">chua co caption</p>
                    
                    {/* Stats */}
                    <div className="flex gap-6 text-sm justify-center md:justify-start">
                        <div className="text-center md:text-left">
                        <div className="font-bold text-xl text-gray-800">{user?.posts.filter(r=>r.type=="Công thức")?.length||0}</div>
                        <div className="text-gray-500">Công thức</div>
                        </div>
                        <div className="text-center md:text-left">
                        <div className="font-bold text-xl text-gray-800">{user?.followers?.length||"Nav"}</div>
                        <div className="text-gray-500">Người theo dõi</div>
                        </div>
                        <div className="text-center md:text-left">
                        <div className="font-bold text-xl text-gray-800">{user?.followings?.length||"Nav"}</div>
                        <div className="text-gray-500">Đang theo dõi</div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
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
                        onClick={() => {setShowEditModal(false)
                           // setUserProfile({...userProfile,caption:newCap})
                        }}
                        className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                        Lưu
                    </button>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}