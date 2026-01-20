import React, { useEffect, useState, useRef } from 'react';
import { X, Plus, Camera, Edit2, UserPlus, Users } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
//import component
import ProfileSumary from '../../../components/users/ProfileSummary';
import CardCookbook from '../../../components/users/card/CardCookbook';
import PostCard from '../../../components/users/card/PostCard';
import { useMyAccount } from "../../../contexts/user/MyAccountContext";
import LoadingPage from '../../../components/users/LoadingPage';

export default function UserProfile() {
  const navigate = useNavigate()
  const { username } = useParams()
  const { myAccount, setMyAccount, isLogin, setIsLogin } = useMyAccount()//lay tu api/context
  const [isLoading, setIsLoading] = useState(true)
  const [preview, setPreview] = useState(null);
  //filter userdata
  const [user_info, setUser_Info] = useState()
  const [activeTab, setActiveTab] = useState('recipes');
  console.log(username)
  const [cookbooks, setCookbooks] = useState([])
  const [recipes, setRecipes] = useState([]);
  const [blogs, setBlogs] = useState([])
  //them coobbook
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCookbook, setNewCookbook] = useState({
    name: '',
    description: '',
    imageFile: null // Thêm field image
  });
  useEffect(() => {
    if (!username) {
      if (!myAccount) {
        navigate("/login")
        return
      }
      setUser_Info(myAccount)
      setCookbooks(myAccount.cookbooks)
      setRecipes(myAccount.posts.filter(p => p.type == "Công thức"))
      setBlogs(myAccount.posts.filter(p => p.type == "Blog"))
      setIsLoading(false)
      return
    };

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/user/${username}`);
        const data = await res.json();
        console.log(data.user.followers)
        //xu li loi
        if (!res.ok) {
          navigate("/not-found")
          throw new Error(data.message || "Lỗi");
        }

        setUser_Info(data.user);
        setCookbooks(data.user.cookbooks)
        setRecipes(data.user.posts.filter(p => p.type == "Công thức"))
        setBlogs(data.user.posts.filter(p => p.type == "Blog"))

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
        console.log(myAccount)
      }
    };

    fetchUser();
  }, [username]);
  //ham
  // Hàm xử lý khi chọn file ảnh
  const handleImageUpload = (e) => {
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

      // Đọc file và chuyển thành base64 để hiển thị
     setNewCookbook(prev=>({...prev,imageFile:file}))
     setPreview(URL.createObjectURL(file))
    }
  }
  const handleRemoveImage = () => {
    setNewCookbook(prev => ({ ...prev, imageFile: null }));
    setPreview(null)
  };
  async function saveCookBook(){
    //Luu vao formdata
    const formData = new FormData();
     formData.append("user_id", myAccount.user_id);
    formData.append("name", newCookbook.name);
    formData.append("description", newCookbook.description || "");
    if (newCookbook.imageFile) {
      formData.append("image_file", newCookbook.imageFile);
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/api/coobook/create", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          // Authorization: `Bearer ${token}` // nếu có login
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data.message || "Tạo cookbook thất bại");
        return;
      }
      console.log("Tạo cookbook thành công:", data.newCookbook);

      // reset form (optional)
      
      setNewCookbook({
        name: "",
        description: "",
        imageFile: null,
      });
      setCookbooks([...cookbooks,data.newCookbook])
      setMyAccount({...myAccount,cookbooks:[...cookbooks,data.newCookbook]})
      console.log("setMyAccount dc thuc hien")
    } catch (error) {
    console.error(error);
    alert("Không kết nối được server");
    }
  }

  if (isLoading) {
    return (<LoadingPage></LoadingPage>)
  }



  const handleAddCookbook = () => {
    // if (newCookbook.title.trim()) {
    //   const colors = ['f97316', 'fb923c', 'fdba74', 'ea580c', 'c2410c', '9a3412'];
    //   const randomColor = colors[Math.floor(Math.random() * colors.length)];

    //   // setCookbooks([...cookbooks, {
    //   //   id: Date.now(),
    //   //   name: newCookbook.name,
    //   //   count: 0,
    //   //   image: `https://via.placeholder.com/300x200/${randomColor}/ffffff?text=${encodeURIComponent(newCookbook.title.substring(0, 10))}`
    //   // }]);

    //   setNewCookbook({ title: '', description: '' });
      saveCookBook()
      setShowAddModal(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-2">
      {/* Profile summary section oke */}
      <ProfileSumary user={user_info} setUser_Info={setUser_Info} setMyAccount={setMyAccount} isMyAccount={username && myAccount?.username != username ? false : true}></ProfileSumary>

      {/* Cookbooks Section */}
      <div className="bg-white mt-4 py-6 rounded-xl">
        <div className="max-w-5xl mx-auto px-4 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Cookbook của {user_info?.name}
            </h2>
            {/*Nut them cookbook*/}
            {(!username||username==myAccount?.username) &&
             <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-400 text-white rounded-full hover:bg-green-500 transition font-semibold shadow-sm"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Thêm Cookbook</span>
              <span className="sm:hidden">Thêm</span>
            </button>
          }
           
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
                <CardCookbook cookbook={cookbook} isMycookbook={username && myAccount?.username != username ? false : true}
                setCookbooks={setCookbooks}
                user_info={user_info}
                ></CardCookbook>
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

              {/* Image Upload Section */}
              <div className=''>
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Ảnh bìa
                </label>
                {/* Nút Upload */}
                <div className="flex items-center gap-3 mb-3">
                  <label className='inline-flex items-center justify-center
             px-3 py-1.5 text-sm bg-emerald-500 text-white
             rounded-full shadow-lg hover:bg-emerald-600
             transition-all border-2 border-white cursor-pointer'>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />  
                    Chọn ảnh
                  </label>


                  {newCookbook.imageFile && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                    >
                      Xóa ảnh
                    </button>
                  )}
                </div>

                {/* Khung hiển thị ảnh */}
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden border border-dashed border-gray-300">
                  {newCookbook.imageFile ? (
                    <img
                      src={preview}
                      alt="Ảnh bìa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Camera size={40} className="mb-2" />
                      <p className="text-sm font-medium">Chưa có ảnh bìa</p>
                    </div>
                  )}
                </div>
              </div>


              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên Cookbook <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCookbook.name}
                  onChange={(e) => setNewCookbook({ ...newCookbook, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Ví dụ: Món Ăn Hàng Ngày"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newCookbook.name.length}/50 ký tự
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
                  setNewCookbook({ name: '', description: '' });
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCookbook}
                disabled={!newCookbook.name.trim()}
                className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${newCookbook.name.trim()
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
                  <div key={recipe.post_id}>
                    <PostCard post={recipe} card_data={recipe}></PostCard>
                  </div>
                  </>
                ))}
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <>
                  <div key={blog.post_id}>
                    <PostCard post={blog} card_data={blog}></PostCard>
                  </div>
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