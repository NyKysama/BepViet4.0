import React, { useState } from 'react';
import { Camera, Edit2, UserPlus, Users } from 'lucide-react';
//import component
import ProfileSumary from '../../../components/users/ProfileSummary';
import CardCookbook from '../../../components/users/CardCookbook';
import PostCard from '../../../components/users/PostCard';

export default function UserProfile() {
  const [user,setUser]=useState({//lay tu api/context
    username:"nguyenvana",
    caption:"Yêu thích nấu ăn và chia sẻ công thức với mọi người 👨‍🍳",
  })
  const [activeTab, setActiveTab] = useState('recipes');



  const cookbooks = [
    { id: 1, title: 'Món Ăn Hàng Ngày', count: 24, image: 'https://via.placeholder.com/300x200/f97316/ffffff?text=Món+Ngày' },
    { id: 2, title: 'Ăn Chay Healthy', count: 15, image: 'https://via.placeholder.com/300x200/fb923c/ffffff?text=Ăn+Chay' },
    { id: 3, title: 'Món Tráng Miệng', count: 32, image: 'https://via.placeholder.com/300x200/fdba74/333333?text=Tráng+Miệng' },
    { id: 4, title: 'Món Âu', count: 18, image: 'https://via.placeholder.com/300x200/ea580c/ffffff?text=Món+Âu' },
    { id: 5, title: 'Bữa Sáng Nhanh', count: 28, image: 'https://via.placeholder.com/300x200/c2410c/ffffff?text=Bữa+Sáng' },
  ];

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

  return (
    <div className="min-h-screen bg-sky-800 mt-2">
      {/* Profile summary section oke */}
      <ProfileSumary user={user}></ProfileSumary>

      {/* Cookbooks Section */}
      <div className="bg-white mt-4 py-6 rounded-xl">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookbook của tôi</h2>
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

      {/* Tabs Section */}
      <div className="bg-white mt-4 rounded-xl">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('recipes')}
                className={`flex-1 py-4 text-center font-semibold transition ${
                  activeTab === 'recipes'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Công thức ({recipes.length})
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`flex-1 py-4 text-center font-semibold transition ${
                  activeTab === 'blogs'
                    ? 'text-orange-500 border-b-2 border-orange-500'
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