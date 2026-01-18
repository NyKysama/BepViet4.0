import { ImagePlus, Send, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State này dùng để lưu dl của form để sau nì đưa dl qua server = hàm FormData cảu react
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
  });

  const [categoryList, setCategoryList] = useState([]);// lưu ds danh mục
  const [imgFile, setImgFile] = useState(null);//lưu lại thay đổi của ảnh trên form
  const [preview, setPreview] = useState(null);// biến để gán ảnh vào dùng để hiển thị
  const [isLoading, setIsLoading] = useState(false);

  // 1. Lấy danh sách Category 
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/category')
      .then(res => res.json())
      .then(data => setCategoryList(data));
  }, []);

  // 2. Nếu có ID -> Lấy dữ liệu cũ để Edit biến id này dự vào cái useParam á nếu mà ng dùng gửi id cho nó thì id sẽ tồn tại mà id tồn tại thì đơn nhiên sẽ là chức năng sửa :))
  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/admin/update-blog/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({ // nì là dùng để lưu lại danh sách củ ý ds mà ms hiện ra
            title: data.title || '',
            description: data.description || '',
            category_id: data.categories?.map(c => c.category_id).join(', ') || ''
          });
          if (data.img) setPreview(`http://127.0.0.1:8000/${data.img}`);
        });
    }
  }, [id]);
  // hàm dùng để thay đổi dl cập nhật cho set dự trên dl của input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // hàm xl sự thay đổi của ảnh ý
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  // hàm quan trọng nì
  const handleSubmit = async (e) => {
    e.preventDefault(); // ko bx này là j nhưng đại khái có nó ms gửi dl đi đc
    setIsLoading(true);

    const data = new FormData();// đây dl sẽ đc đưa vào hàm nì để đc đưa lên server 
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category_id', formData.category_id);
    if (imgFile) data.append('img', imgFile);

    // Trick: Laravel kén PUT với FormData, dùng POST + _method PUT
    if (id) data.append('_method', 'PUT'); // cái nì là dùng để báo cho hệ thống là mk đang cập nhật 
    //cái try nì dùng để kiểm tra hôi
    try {
      // nì là dùng để xem hệ thống gửi qua đâu thực hiện chức năng j. hàm tạo ch có viết 
      const url = id
        ? `http://127.0.0.1:8000/api/admin/update-blog/${id}`
        : `http://127.0.0.1:8000/api/user/blog`;//thay đổi api từ api/admin/create-blog -> api/user/blog - 18/01/2026
      //gửi dữ liệu tạo blog lên api
      //<-18/01/2026
     const response = await fetch('http://127.0.0.1:8000/api/user/blog',{
      method: 'POST',
      body: data,
      headers: {
      'Accept': 'application/json',//trả dữ liệu dạng json
      'Authorization': `Bearer ${localStorage.getItem('token')}`//Gửi token đăng nhập của user lên server tạm để đó
        }
      }
      //->
  );

      if (response.ok) {
        alert(id ? "Cập nhật thành công!" : "Đăng bài thành công!");
        navigate('/admin/post'); // Chuyển hướng sau khi xong
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fadeIn mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
          <FileText className="text-green-500" size={32} />
          {id ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}
        </h1>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100">
            <div className="space-y-6">
              {/* Tiêu đề */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Tiêu đề bài viết</label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mt-2 p-4 bg-slate-50 border-2 border-transparent focus:border-green-400 rounded-2xl text-xl font-bold outline-none transition-all"
                  placeholder="Tiêu đề..."
                />
              </div>

              {/* Upload Ảnh */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 block mb-2">Ảnh bìa</label>
                <label className="relative w-full h-64 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer overflow-hidden transition-all">
                  {preview ? (
                    <img src={preview || 'http://localhost:8000/images/no_img.png'} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <ImagePlus size={32} />
                      <span className="mt-2 font-medium">Click để chọn ảnh</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>

              {/* Nội dung */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase ml-1 block mb-2">Nội dung bài viết</label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-green-400 rounded-2xl text-lg min-h-[300px] outline-none transition-all"
                  placeholder="Nội dung chi tiết..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full xl:w-[320px]">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-[24px] shadow-md border border-slate-100">
              <h3 className="font-bold text-slate-800 border-b pb-4 mb-4">Thiết lập</h3>
              {/* thay đổi cách chọn danh mục 1 tý vì cái củ chỉ chọn đc 1 thôi */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase">Danh mục (Chọn nhiều)</label>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 max-h-60 overflow-y-auto space-y-2">
                  {categoryList.map((c) => {
                    // Kiểm tra xem ID này đã có trong mảng chọn chưa
                    // Lưu ý: ép kiểu string/number để so sánh cho chuẩn
                    // cái nì là để xem chọn cái nào r để lấy id cái đó 
                    const isChecked = formData.category_id.toString().split(',').includes(c.category_id.toString());

                    return (
                      <label key={c.category_id} className="flex items-center gap-3 p-2 hover:bg-white rounded-xl cursor-pointer transition-all border border-transparent hover:border-slate-200">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-green-500 cursor-pointer"
                          checked={isChecked}
                          onChange={(e) => {
                            // Chuyển chuỗi hiện tại thành mảng để xử lý                          
                            let currentIds = formData.category_id ? formData.category_id.toString().split(',') : [];

                            if (e.target.checked) {
                              // Nếu tích vào -> thêm ID vào mảng
                              currentIds.push(c.category_id.toString());
                            } else {
                              // Nếu bỏ tích -> xóa ID khỏi mảng
                              currentIds = currentIds.filter(id => id !== c.category_id.toString());
                            }

                            // Cập nhật lại formData dưới dạng chuỗi "1,2,3" (để dễ gửi qua FormData)
                            setFormData({ ...formData, category_id: currentIds.join(',') });
                          }}
                        />
                        <span className="text-sm text-slate-600 font-medium">{c.name}</span>
                      </label>
                    );
                  })}
                </div>
{/* tui đã bắt đầu hoa mắt */}
                {/* Hiện thị tóm tắt cho user thấy đã chọn bao nhiêu cái */}
                <p className="text-[10px] text-slate-400 italic ml-1">
                  Đã chọn: {formData.category_id ? formData.category_id.toString().split(',').length : 0} danh mục
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 bg-green-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                {id ? 'CẬP NHẬT' : 'ĐĂNG BÀI'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}