import { Clock, BarChart, MapPin, ChevronLeft, CheckCircle2, UtensilsCrossed, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import StarRating from '../../../components/users/StarRating';
import CommentSection from '../../../components/users/CommentSection';
import { useParams } from 'react-router-dom';
export default function RecipeDetail() {
  const [recipe, setRecipe] = useState({});
  const {id} = useParams();
  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/recipe-detail/${id}`)
        .then(res => res.json())
        .then(data => setRecipe(data));
  },[id]);
  const [userRating, setUserRating] = useState(0);
  // Hàm tính toán đơn giản
  const ratings = [5, 4, 5, 3, 5, 1]; // Dữ liệu mẫu từ DB

  const totalReviews = ratings.length; // Tổng số lượt: 5
  const averageRating = totalReviews > 0
    ? (ratings.reduce((sum, r) => sum + r, 0) / totalReviews).toFixed(1)
    : 0; // Kết quả: 4.4
  // Hàm xử lý đơn giản
  const handleSendRating = (star) => {
    setUserRating(star); // Lưu vào state để hiển thị feedback
    // Xử lý logic tại đây
    console.log(`Đã nhận đánh giá ${star} sao cho bài viết: ${recipe.post?.title}`);
    alert(`Cảm ơn bạn đã đánh giá ${star} sao!`);
  };
  return (
    <div className="max-w-[1000px] mx-auto bg-gray-50 min-h-screen pb-20">
      <div className="relative h-[400px] w-full">
        <img src={recipe.post?.img} className="w-full h-full object-cover" alt={recipe.post?.title} />
        <div className="absolute inset-0 bg-black/20" />
        <button className="absolute top-6 left-6 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="px-6 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 max-w-[800px] mx-auto">

          {/* 1. Thông tin chung & Stats */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="..." // Thay "..." bằng đường dẫn đến ảnh avatar của người dùng
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-2xl font-semibold text-gray-800">
              Nguyễn Văn A
            </span>
          </div>
          <div className="border-b border-slate-50 pb-8 mb-8">
            <h1 className="text-3xl font-black text-slate-800 mb-4">{recipe.post?.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <Star size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-black text-yellow-700">{averageRating}</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-500 font-medium">{totalReviews} lượt đánh giá</span>
            </div>

            <p className="text-slate-500 italic mb-8 border-l-4 border-emerald-500 pl-4">{recipe.post?.description}</p>

            {/* Stats Bar dạng 1 hàng ngang */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-4">
              <div className="text-center">
                <Clock className="mx-auto text-orange-500 mb-1" size={20} />
                <p className="text-[10px] uppercase font-bold text-slate-400">Thời gian</p>
                <p className="font-bold text-slate-700 text-sm">{recipe.post?.cook_time}</p>
              </div>
              <div className="text-center border-x border-slate-200">
                <BarChart className="mx-auto text-emerald-500 mb-1" size={20} />
                <p className="text-[10px] uppercase font-bold text-slate-400">Độ khó</p>
                <p className="font-bold text-slate-700 text-sm">{recipe.post?.difficulty}</p>
              </div>
              <div className="text-center">
                <MapPin className="mx-auto text-rose-500 mb-1" size={20} />
                <p className="text-[10px] uppercase font-bold text-slate-400">Vùng miền</p>
                <p className="font-bold text-slate-700 text-sm">{recipe.post?.region}</p>
              </div>
            </div>
          </div>

          {/* 2. Phần Nguyên liệu (Full Width) */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <UtensilsCrossed className="text-emerald-500" size={22} />
              <h3 className="text-xl font-black text-slate-800">Nguyên liệu cần chuẩn bị</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Chia 2 cột nhẹ cho nguyên liệu nếu màn hình rộng */}
              {recipe.post?.ingredients?.map((ing, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
                  <span className="text-slate-700 font-bold">{ing.name}</span>
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black">
                    {ing.pivot?.amount} {ing.pivot?.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Các bước thực hiện (Full Width) */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle2 className="text-emerald-500" size={22} />
              <h3 className="text-xl font-black text-slate-800">Các bước thực hiện</h3>
            </div>
            <div className="space-y-10">
              {recipe.steps?.map((step) => (
                <div key={step.step_id} className="group">
                  <div className="flex gap-4 mb-4">
                    <span className="flex-none w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg group-hover:bg-emerald-500 transition-colors">
                      {step.steps}
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium pt-1 text-lg">
                      {step.content}
                    </p>
                  </div>
                  {step.img && (
                    <div className="ml-12 overflow-hidden rounded-[20px] border border-slate-100 shadow-sm w-[280px] sm:w-[320px]">
                      {/* w-[280px] giúp ảnh nhỏ gọn, không lấn át văn bản */}
                      <img
                        src={step.img}
                        className="w-full h-[180px] object-cover hover:scale-105 transition-transform duration-500"
                        alt={`Bước ${step.steps}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Đánh giá & Bình luận (Xếp cuối bài) */}
          <div className="border-t border-slate-100 pt-12 space-y-10">
            <div className="bg-orange-50/50 rounded-[32px] p-8 text-center border border-orange-100">
              <h3 className="font-black text-slate-800 mb-2 text-xl">Bạn thấy công thức này thế nào?</h3>
              <p className="text-slate-500 text-sm mb-6">Đánh giá của bạn giúp cộng đồng nấu ăn ngon hơn mỗi ngày</p>
              <div className="flex justify-center mb-4">
                <StarRating onSelect={handleSendRating} />
              </div>
              {userRating > 0 && (
                <p className="text-emerald-600 font-black animate-bounce">
                  🎉 Cảm ơn bạn đã tặng {userRating} sao!
                </p>
              )}
            </div>

            <div className="bg-slate-50 rounded-[32px] p-6">
              <h3 className="font-black text-slate-800 mb-6 text-xl px-2">Bình luận từ cộng đồng</h3>
              <CommentSection id={recipe.post?.post_id}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}