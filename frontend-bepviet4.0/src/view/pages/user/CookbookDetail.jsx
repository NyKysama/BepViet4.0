import React, { useState, useEffect, useRef } from 'react';
import { useParams,useNavigate, data} from 'react-router-dom';
import { useMyAccount } from '../../../contexts/user/MyAccountContext';
import LoadingPage from '../../../components/users/LoadingPage';
import { Camera } from 'lucide-react';

// 1. Component PostCard (giữ nguyên)
const PostCard = ({ post, index, onDelete ,user_info}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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
      <div className="hidden md:flex items-center justify-center w-6 text-gray-500 font-medium">
        {index + 1}
      </div>

      <div className="relative w-32 md:w-40 h-20 md:h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col justify-center flex-1 pr-8">
        <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm md:text-base">{post.title}</h3>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{user_info.username} • soview views</p>
        <span className="inline-block mt-2 text-xs bg-gray-200 w-fit px-2 py-0.5 rounded text-gray-600">
          {post.cook_time}
        </span>
      </div>

      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>

        {showMenu && (
          <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post.post_id);
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
  const {username,name}=useParams()//name la name cua cookbook
  const navigate=useNavigate()
  const {myAccount,setMyAccount}=useMyAccount()
  const [user_info,setUser_Info]=useState()
  const [cookbook, setCookbook] = useState();
  const [posts, setPosts] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState();
  const [isLoading,setIsLoading]=useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(()=>{
   async function fetchData() {
    try {
      const res=await fetch(`http://127.0.0.1:8000/api/cookbook/${username}/${name}`)
       if(!res.ok){}
      const data=await res.json()
      setUser_Info(data.user)
      setCookbook(data.cookbook)
      setPosts(data.posts)
      setEditForm(data.cookbook)//chen thong tin cookbook
      console.log(data)
    } catch (error) {
      
    }finally{
    setIsLoading(false)
    }
   }
   fetchData();
  }
  ,[username,name])

  const handleDeletePost = async(post_id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      // const newPosts = posts.filter(p => p.id !== postId);
      // setPosts(newPosts);
      // setCookbook(prev => ({ ...prev, totalPosts: newPosts.length }));
      const res=await fetch(`http://127.0.0.1:8000/api/cookbook/${cookbook.cookbook_id}/detatch/${post_id}`,{
        method:"POST",
        headers:{ "Content-Type": "application/json",}
      })
      if(!res.ok){
        return
      }
      const data=await res.json()
      setPosts(prev=>(prev.filter(p=>p.post_id!=post_id)))
      
    }
  };

  const handleEditClick = () => {
    setEditForm(cookbook);
    setIsEditing(true);
  };

  const handleSave = async() => {
     //Luu vao formdata
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description || "");
    if (editForm.imageFile) {
    formData.append("image_file", editForm.imageFile);
    }
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/coobook/update/${cookbook.cookbook_id}`, {
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
        alert(data.message || "Sua cookbook thất bại");
        return;
      }
      console.log("Sua cookbook thành công:", data);

      // reset form (optional)
      
      // setEditForm({
      //   name: "",
      //   description: "",
      //   imageFile: null,
      // });
      // setCookbooks([...cookbooks,data.newCookbook])
      // setMyAccount({...myAccount,cookbooks:[...cookbooks,data.newCookbook]})
      // console.log("setMyAccount dc thuc hien")
      setCookbook(data.newCookbook);
      setIsEditing(false);
      navigate(`/user-profile/${username}/cookbook/${editForm.name}`)
    }catch (error) {
    console.error(error);
    alert("Không kết nối được server");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
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
     setEditForm(prev=>({...prev,imageFile:file}))
     setPreview(URL.createObjectURL(file))
    }
  }
  const handleRemoveImage = () => {
    setEditForm(prev => ({ ...prev, imageFile: null }));
    setPreview(null)
  };

  if(isLoading){
    return (<LoadingPage></LoadingPage>)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8">

        {/* === LEFT SIDEBAR (Cookbook Info) === */}
        <div className="w-full md:w-[320px] lg:w-[360px] flex-shrink-0">
          <div className="md:sticky md:top-8 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100">

            {isEditing ? (
              /* --- EDIT MODE --- */
              <div className="flex flex-col gap-3 md:gap-4">

                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between border border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-gray-700">Chế độ riêng tư</span>
                    <span className="text-xs text-gray-500">Chỉ mình bạn thấy</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.isPrivate}
                      onChange={(e) => setEditForm({ ...editForm, isPrivate: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="space-y-1">
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
                      onChange={e=>handleImageUpload(e)}
                      className="hidden"
                    />  
                    Chọn ảnh
                  </label>


                  {editForm.imageFile && (
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
                  {editForm.imageFile? (
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
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Tên Cookbook</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg font-bold text-gray-800 text-sm md:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Mô tả</label>
                  <textarea
                    rows={3}
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg text-xs md:text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm">Lưu</button>
                  <button onClick={handleCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors text-sm">Hủy</button>
                </div>
              </div>
            ) : (
              /* --- VIEW MODE --- */
              <>
                <div className="aspect-square w-full rounded-lg md:rounded-xl overflow-hidden shadow-md mb-4 md:mb-6 relative group">
                  <img src={"http://127.0.0.1:8000/"+cookbook?.image} alt={cookbook?.name} className="w-full h-full object-cover" />
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  {cookbook.name}
                </h1>

                <div className="mb-3 md:mb-4 flex items-center justify-between">
                  <div>
                    {/* {cookbook.isPrivate ? (
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
                    )} */}
                  </div>

                  {/* Nút sửa bên phải */}
                  <button onClick={handleEditClick} className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <img src={"http://127.0.0.1:8000/"+user_info.avatar} alt={user_info.username+" avatar"} className="w-9 h-9 md:w-10 md:h-10 rounded-full" />
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-bold text-gray-800 hover:underline cursor-pointer">{user_info.username}</span>
                    <div className="text-xs text-gray-500 flex gap-2">
                      <span>{posts.length} công thức</span>
                      <span>•</span>
                      <span>last update</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mb-3 md:mb-4">
                  {/* <button className="flex-1 bg-black text-white py-2 rounded-full font-medium hover:bg-gray-800 transition text-sm">Phát tất cả</button> */}

                </div>

                <div className="text-xs md:text-sm text-gray-600 leading-relaxed">{cookbook.description}</div>
              </>
            )}
          </div>
        </div>

        {/* === RIGHT CONTENT (Post List) === */}
        <div className="flex-1 min-w-0">
          <div className="mb-3 md:mb-4 flex justify-between items-center px-2">
            <h2 className="font-bold text-base md:text-lg text-gray-800">Danh sách công thức</h2>
          </div>
          <div className="flex flex-col gap-1 bg-white rounded-xl md:rounded-2xl p-2 md:p-4 border border-gray-100">
            {posts.map((post,index) => (
              <PostCard
                key={post.id}
                post={post}
                user_info={post.user}
                onDelete={handleDeletePost}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}