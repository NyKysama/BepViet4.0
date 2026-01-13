import React, { useState, useEffect, useRef } from 'react';

// Dữ liệu mẫu (Cập nhật thêm trường isPrivate)
const INITIAL_COOKBOOK = {
  id: 1,
  title: "Món Ngon Cuối Tuần 🍜",
  coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  description: "Tuyển tập những công thức nấu ăn đơn giản nhưng cực kỳ bắt miệng dành cho những ngày nghỉ.",
  ownerName: "Chef Ramsey Fake",
  ownerAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=100&q=80",
  totalPosts: 8, // Số lượng sẽ tự động cập nhật theo list
  lastUpdated: "2 ngày trước",
  isPrivate: false // <--- Trường mới: Chế độ riêng tư
};

const INITIAL_POSTS = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Công thức nấu ăn số #${i + 1}`,
  image: `https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80`,
  author: "Chef Ramsey Fake",
  views: "12K",
  time: "20 phút"
}));

// 1. Component PostCard (Đã thêm nút 3 chấm và logic xóa)
const PostCard = ({ post, index, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Xử lý click ra ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-4 p-3 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors group relative">
      {/* Số thứ tự */}
      <div className="hidden md:flex items-center justify-center w-6 text-gray-500 font-medium">
        {index + 1}
      </div>

      {/* Ảnh thumbnail */}
      <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Thông tin bài viết */}
      <div className="flex flex-col justify-center flex-1 pr-8"> {/* pr-8 để tránh text đè lên nút 3 chấm */}
        <h3 className="font-semibold text-gray-800 line-clamp-2">{post.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{post.author} • {post.views} views</p>
        <span className="inline-block mt-2 text-xs bg-gray-200 w-fit px-2 py-0.5 rounded text-gray-600">
          {post.time}
        </span>
      </div>

      {/* === NÚT 3 CHẤM (DROPDOWN) === */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Ngăn chặn click vào card
            setShowMenu(!showMenu);
          }}
          className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" // Hiện khi hover card hoặc focus
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {/* Menu Dropdown */}
        {showMenu && (
          <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden">
             <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(post.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa khỏi Cookbook
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Main Page Component
export default function CookbookPage() {
  const [cookbook, setCookbook] = useState(INITIAL_COOKBOOK);
  const [posts, setPosts] = useState(INITIAL_POSTS); // State quản lý danh sách bài viết
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(INITIAL_COOKBOOK);

  // Xử lý Xóa bài viết
  const handleDeletePost = (postId) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      const newPosts = posts.filter(p => p.id !== postId);
      setPosts(newPosts);
      // Cập nhật lại số lượng trong cookbook
      setCookbook(prev => ({...prev, totalPosts: newPosts.length}));
    }
  };

  const handleEditClick = () => {
    setEditForm(cookbook);
    setIsEditing(true);
  };

  const handleSave = () => {
    setCookbook(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Giữ layout: List bên trái (desktop), Sidebar bên phải (desktop), Sidebar lên đầu (mobile) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-8">
        
        {/* === RIGHT SIDEBAR (Sticky Info) === */}
        <div className="w-full md:w-[360px] flex-shrink-0">
          <div className="md:sticky md:top-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            
            {isEditing ? (
              /* --- EDIT MODE --- */
              <div className="flex flex-col gap-4">
                
                {/* Toggle Privacy Setting */}
                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between border border-gray-200">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">Chế độ riêng tư</span>
                        <span className="text-xs text-gray-500">Chỉ mình bạn thấy</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={editForm.isPrivate} 
                            onChange={(e) => setEditForm({...editForm, isPrivate: e.target.checked})}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Ảnh bìa (URL)</label>
                    <input 
                      type="text" 
                      value={editForm.coverImage}
                      onChange={(e) => setEditForm({...editForm, coverImage: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Tên Cookbook</label>
                    <input 
                      type="text" 
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Mô tả</label>
                    <textarea 
                      rows={4}
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                </div>

                <div className="flex gap-2 mt-2">
                  <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">Lưu</button>
                  <button onClick={handleCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors">Hủy</button>
                </div>
              </div>
            ) : (
              /* --- VIEW MODE --- */
              <>
                <div className="aspect-square w-full rounded-xl overflow-hidden shadow-md mb-6 relative group">
                  <img src={cookbook.coverImage} alt={cookbook.title} className="w-full h-full object-cover"/>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  {cookbook.title}
                </h1>

                {/* Privacy Badge */}
                <div className="mb-4">
                    {cookbook.isPrivate ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Riêng tư
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            Công khai
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <img src={cookbook.ownerAvatar} alt={cookbook.ownerName} className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800 hover:underline cursor-pointer">{cookbook.ownerName}</span>
                        <div className="text-xs text-gray-500 flex gap-2">
                             <span>{posts.length} công thức</span>
                             <span>•</span>
                             <span>{cookbook.lastUpdated}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <button className="flex-1 bg-black text-white py-2 rounded-full font-medium hover:bg-gray-800 transition">Phát tất cả</button>
                    <button onClick={handleEditClick} className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>

                <div className="text-sm text-gray-600 leading-relaxed">{cookbook.description}</div>
              </>
            )}
          </div>
        </div>

        {/* === LEFT CONTENT (Post List) === */}
        <div className="flex-1 min-w-0">
            <div className="mb-4 flex justify-between items-center px-2">
                <h2 className="font-bold text-lg text-gray-800">Danh sách công thức</h2>
            </div>
            <div className="flex flex-col gap-1">
                {posts.map((post, index) => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        index={index} 
                        onDelete={handleDeletePost} // Truyền hàm xóa xuống
                    />
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}