import React, { useState } from 'react';
import { X,Plus, Camera, Edit2, UserPlus, Users } from 'lucide-react';
//import component
import ProfileSumary from '../../../components/users/ProfileSummary';
import CardCookbook from '../../../components/users/card/CardCookbook';
import PostCard from '../../../components/users/card/PostCard';

export default function UserTable() {
  const [user, setUser] = useState({//lay tu api/context
    username: "nguyenvana",
    caption: "Yêu thích nấu ăn và chia sẻ công thức với mọi người 👨‍🍳",
  })
  const [activeTab, setActiveTab] = useState('recipes');



  const [cookbooks, setCookbooks] = useState([
    { id: 1, title: 'Món Ăn Hàng Ngày', count: 24, image: 'https://via.placeholder.com/300x200/f97316/ffffff?text=Món+Ngày' },
    { id: 2, title: 'Ăn Chay Healthy', count: 15, image: 'https://via.placeholder.com/300x200/fb923c/ffffff?text=Ăn+Chay' },
    { id: 3, title: 'Món Tráng Miệng', count: 32, image: 'https://via.placeholder.com/300x200/fdba74/333333?text=Tráng+Miệng' },
    { id: 4, title: 'Món Âu', count: 18, image: 'https://via.placeholder.com/300x200/ea580c/ffffff?text=Món+Âu' },
    { id: 5, title: 'Bữa Sáng Nhanh', count: 28, image: 'https://via.placeholder.com/300x200/c2410c/ffffff?text=Bữa+Sáng' },
  ]);

  const recipes = [
    {
      id: 1,
      title: 'Phở Bò Truyền Thống',
      image: 'https://via.placeholder.com/600x400/f97316/ffffff?text=Phở+Bò',
      views: 1234,
      likes: 234,
      time: '2 giờ trước'
    },
    {
      id: 2,
      title: 'Bánh Mì Thịt Nguội',
      image: 'https://via.placeholder.com/600x400/fb923c/ffffff?text=Bánh+Mì',
      views: 856,
      likes: 178,
      time: '5 giờ trước'
    },
  ];

  const blogs = [
    {
      id: 1,
      title: '10 Mẹo Nấu Ăn Tiết Kiệm Thời Gian',
      excerpt: 'Chia sẻ những mẹo nhỏ giúp bạn tiết kiệm thời gian khi vào bếp mà vẫn có món ngon...',
      image: 'https://via.placeholder.com/600x400/ea580c/ffffff?text=Blog+1',
      time: '1 ngày trước',
      readTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Cách Chọn Nguyên Liệu Tươi Ngon',
      excerpt: 'Hướng dẫn chi tiết cách nhận biết và chọn nguyên liệu tươi ngon tại chợ...',
      image: 'https://via.placeholder.com/600x400/c2410c/ffffff?text=Blog+2',
      time: '3 ngày trước',
      readTime: '7 phút đọc'
    },
  ];
  //them coobbook
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCookbook, setNewCookbook] = useState({
    title: '',
    description: ''
  });

  const handleAddCookbook = () => {
    if (newCookbook.title.trim()) {
      const colors = ['f97316', 'fb923c', 'fdba74', 'ea580c', 'c2410c', '9a3412'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setCookbooks([...cookbooks, {
        id: Date.now(),
        title: newCookbook.title,
        count: 0,
        image: `https://via.placeholder.com/300x200/${randomColor}/ffffff?text=${encodeURIComponent(newCookbook.title.substring(0, 10))}`
      }]);

      setNewCookbook({ title: '', description: '' });
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-2">
      {/* Profile summary section oke */}
      <ProfileSumary user={user}></ProfileSumary>

      {/* Cookbooks Section */}
      <div className="bg-white mt-4 py-6 rounded-xl">
        <div className="max-w-5xl mx-auto px-4 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Cookbook của tôi
            </h2>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-400 text-white rounded-full hover:bg-green-500 transition font-semibold shadow-sm"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Thêm Cookbook</span>
              <span className="sm:hidden">Thêm</span>
            </button>
          </div>
          <div
            className="overflow-x-auto -mx-4 px-4 pb-4 cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              const slider = e.currentTarget;
              let isDown = true;
              let startX = e.pageX - slider.offsetLeft;
              let scrollLeft = slider.scrollLeft;

              const handleMouseMove = (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
              };

              const handleMouseUp = () => {
                isDown = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
              {/*card cookbok*/}
              {cookbooks.map((cookbook) => (
                <CardCookbook cookbook={cookbook}></CardCookbook>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Add Cookbook Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tạo Cookbook Mới</h2>
            
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Cookbook <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCookbook.title}
                  onChange={(e) => setNewCookbook({ ...newCookbook, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ví dụ: Món Ăn Hàng Ngày"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newCookbook.title.length}/50 ký tự
                </p>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả (tùy chọn)
                </label>
                <textarea
                  value={newCookbook.description}
                  onChange={(e) => setNewCookbook({ ...newCookbook, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Thêm mô tả cho cookbook của bạn..."
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newCookbook.description.length}/200 ký tự
                </p>
              </div>

              {/* Privacy Option */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <label htmlFor="isPrivate" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Riêng tư
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Chỉ bạn có thể xem cookbook này
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewCookbook({ title: '', description: '' });
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCookbook}
                disabled={!newCookbook.title.trim()}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                  newCookbook.title.trim()
                    ? 'bg-green-400 text-white hover:bg-green-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Tạo Cookbook
              </button>
            </div>
          </div>
        </div>
      )}
    
  


      {/* Tabs Section */}
      <div className="bg-white mt-4 rounded-xl">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`flex-1 py-4 text-center font-semibold transition ${activeTab === 'recipes'
                    ? 'text-green-500 border-b-2 border-green-500'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Công thức ({recipes.length})
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`flex-1 py-4 text-center font-semibold transition ${activeTab === 'blogs'
                    ? 'text-green-500 border-b-2 border-green-500'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Blog ({blogs.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            {activeTab === 'recipes' && (
              <div className="space-y-6">
                {recipes.map((recipe) => (
                  <>
                    <PostCard></PostCard>
                  </>
                ))}
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <>
                    <PostCard></PostCard>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}