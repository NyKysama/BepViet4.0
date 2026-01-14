import { ImagePlus, Send, FileText } from "lucide-react";

export default function CreateBlog() {
  return (
    <div className="w-full animate-fadeIn mt-10">
      {/* Header trang - Giữ nguyên style với trang Công thức */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <FileText className="text-green-500" size={32} />
          Tạo bài viết
        </h1>
        <p className="text-slate-500 mt-1">Chia sẻ kiến thức ẩm thực và mẹo nhà bếp của bạn.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* CỘT TRÁI: SOẠN THẢO (To vừa phải, không bị thô) */}
        <div className="flex-1 space-y-6">
          
          <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
            <div className="space-y-6">
              {/* Tiêu đề bài viết */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Tiêu đề bài viết</label>
                <input 
                  className="w-full mt-2 p-4 bg-slate-50 border-2 border-transparent focus:border-green-400 rounded-2xl text-xl font-bold outline-none transition-all"
                  placeholder="Ví dụ: 5 bí quyết để nước dùng phở luôn trong..."
                />
              </div>

              {/* Khu vực Upload Ảnh bìa (Gọn gàng hơn) */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 block mb-2">Ảnh bìa bài viết</label>
                <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
                  <ImagePlus size={24} />
                  <span className="mt-2 font-medium">Click để chọn ảnh</span>
                </div>
              </div>

              {/* Nội dung Blog */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 block mb-2">Nội dung</label>
                {/* Thay bằng Editor của bạn, textarea này đã được chỉnh kích thước hợp lý */}
                <textarea 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-green-400 rounded-2xl text-lg min-h-[300px] outline-none transition-all"
                  placeholder="Bắt đầu viết nội dung tại đây..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: THIẾT LẬP (Giống hệt cột phải trang Công thức) */}
        <div className="w-full xl:w-[320px]">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-[24px] shadow-md border border-slate-100">
              <h3 className="font-bold text-slate-800 border-b pb-4 mb-4">Danh mục</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase block mb-1">Chủ đề</label>
                  <select className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm font-bold outline-none">
                    <option>Mẹo nhà bếp</option>
                    <option>Review quán ăn</option>
                    <option>Kiến thức ẩm thực</option>
                  </select>
                </div>

                {/* <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-bold text-slate-600">Hiển thị công khai</span>
                  <input type="checkbox" className="w-5 h-5 accent-green-500" defaultChecked />
                </div> */}
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-100 hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                  <Send size={20} /> ĐĂNG BÀI
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}