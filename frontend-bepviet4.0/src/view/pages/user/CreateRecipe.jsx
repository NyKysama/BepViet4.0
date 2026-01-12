import { Plus, Trash2, ImagePlus, Send } from "lucide-react";
export default function CreateRecipe() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* HEADER TRANG */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tạo công thức mới</h1>
          <p className="text-sm text-gray-500">Chia sẻ tinh hoa ẩm thực của bạn với cộng đồng.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI: NỘI DUNG CHÍNH */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Thông tin chung */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-green-600 rounded-full"></span>
              Thông tin cơ bản
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Tên món ăn</label>
                <input type="text" className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ví dụ: Cá kho tộ miền Tây" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Ảnh bìa công thức</label>
                <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
                  <ImagePlus size={24} />
                  <span className="mt-2 font-medium">Click để chọn ảnh</span>
                </div>
              </div>
              <div>            
                <label className="text-xs font-bold text-gray-400 uppercase">Mô tả ngắn</label>
                <textarea className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl h-24 outline-none" placeholder="Viết vài dòng giới thiệu về món ăn này..." />
              </div>
            </div>
          </div>

          {/* Section 2: Nguyên liệu */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-green-600 rounded-full"></span>
              Nguyên liệu
            </h2>
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-3 items-center">
                <input className="col-span-6 p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="Tên nguyên liệu" />
                <input className="col-span-3 p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="SL" />
                <input className="col-span-2 p-2.5 bg-gray-50 border rounded-lg text-sm" placeholder="Đơn vị" />
                <button className="col-span-1 text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
              </div>
              <button className="text-sm font-bold text-green-600 flex items-center gap-1 hover:underline">
                <Plus size={16} /> Thêm nguyên liệu
              </button>
            </div>
          </div>

          {/* Section 3: Các bước thực hiện */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-green-600 rounded-full"></span>
              Cách chế biến
            </h2>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-dashed border-gray-200">
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-green-600 rounded-full text-white text-[10px] flex items-center justify-center font-bold">1</div>
                <textarea className="w-full p-3 bg-gray-50 border rounded-xl text-sm outline-none" placeholder="Bước 1: Sơ chế nguyên liệu..." />
                <div className="mt-2 w-32 h-24 bg-gray-100 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200">
                  <ImagePlus size={20} />
                  <span className="text-[10px] mt-1 text-center px-2">Thêm ảnh bước này</span>
                </div>
              </div>
              <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-medium hover:bg-gray-50 transition-colors">
                + Thêm bước thực hiện
              </button>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: THIẾT LẬP PHỤ */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-bold mb-4">Cài đặt công thức</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Độ khó</label>
                <select className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none">
                  <option>Dễ</option>
                  <option>Trung bình</option>
                  <option>Khó</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Vùng miền</label>
                <select className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none">
                  <option>Miền Bắc</option>
                  <option>Miền Trung</option>
                  <option>Miền Nam</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Danh mục</label>
                <select className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none">
                  <option>Món kho</option>
                  <option>Món canh</option>
                  <option>Món xào</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Thời gian nấu (phút)</label>
                <input type="number" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none" placeholder="45" />
              </div>
              <hr />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trạng thái</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-lg uppercase">Nháp</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
               <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                 <Send size={18} /> Đăng công thức
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}