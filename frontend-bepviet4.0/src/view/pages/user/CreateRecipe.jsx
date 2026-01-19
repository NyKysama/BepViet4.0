import { useState, useEffect } from "react";
import { Trash2, Plus, ImagePlus, Send, FileText, X } from "lucide-react";



export default function CreateRecipe() {
  //Lay danh sach nguyen lieu tu backend
  const [ingredients, setIngredients] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ingredient")
      .then(res => res.json())
      .then(data => {
        console.log("Nguyen lieu:")
        console.log(data)
        setIngredients(data)
      })
  }, [])
  //Lay danh sach danh muc tu backend
  // danh sach danh muc
  const [categories, setCategories] = useState([])
  //goi api lay danh sach danh muc
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category")
      .then(res => res.json())
      .then(data => {
        console.log("Danh muc:")
        console.log(data)
        setCategories(data)
      })
  }, [])

  //danh sach cac nguyen lieu cua cong thuc tren giao dien
  const [ing, setIng] = useState([
    { ing_id: 0, name: '', amount: 0, unit: '' }
  ]);
  //ham them nguyen lieu moi
  const handleAddIngredient = () => {
    const newIngs = { ing_id: 0, name: '', amount: 0, unit: '' }
    setIng([...ing, newIngs])
  };
  //ham huy o nhap nguyen lieu duoi cung
  const handleRemoveLastIngredient = () => {
    if (ing.length > 1) {
      // Tao mang moi bang mang cu bo phan tu cuoi
      const newIngredients = ing.slice(0, -1);
      setIng(newIngredients);
    }
  };

  //danh sach cac danh muc tren giao dien
  const [cat, setCat] = useState([
    { cat_id: 0, name: '' }
  ])
  //Them o chon danh muc tren giao dien
  const handleAddCategory = () => {
    const newCategory = { cat_id: 0, name: '' }
    setCat([...cat, newCategory])
  }
  //Huy o nhap danh muc
  const handleRemoveLastCategory = () => {
    if (cat.length > 1) {
      const newCategory = cat.slice(0, -1)
      setCat(newCategory)
    }
  }

  //Thao tac voi anh
  //Luu tru anh 
  const [file, setImg] = useState(null);
  //luu tru anh tam de hien thi tren giao dien
  const [previewImg, setPreviewImg] = useState(null);
  //trang thai dang tai cua anh
  const [uploading, setUploading] = useState(false);
  //ham xu li khi chon anh
  const handleImageChange = (e) => {
    //lay file dau tien nguoi dung chon
    const selectedImg = e.target.files[0];

    //xu ly khi co anh
    if (selectedImg) {
      //luu tru anh
      setImg(selectedImg);

      //tao duong dan ao de hien thi anh tren giao dien
      const objectUrl = URL.createObjectURL(selectedImg);
      setPreviewImg(objectUrl);
    }
  }
  //ham xoa anh
  const handleRemoveImage = () => {
    setImg(null);
    setPreviewImg(null)

    if (previewImg) {
      URL.revokeObjectURL(previewImg);
    }
  }
  // ham gui anh len serve

  return (
    <div className="max-w-5xl mx-auto pb-20 mt-10 px-4">
      {/* HEADER TRANG */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <FileText className="text-green-500" size={32} />
            Tạo công thức
          </h1>
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
              Công thức
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Tên món ăn</label>
                <input type="text" className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ví dụ: Cá kho tộ miền Tây" />
              </div>

              {/* Upload anh */}
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Ảnh bìa công thức
                {
                  !previewImg ?
                    // khong co anh
                    (<div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
                      <ImagePlus size={24} />
                      <span className="mt-2 font-medium">Click để chọn ảnh</span>
                      
                    </div>) : (
                      //co anh
                      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={previewImg}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        {/* Nút X để xóa ảnh */}
                        <button
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                          type="button"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )
                  }
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Mô tả ngắn</label>
                <textarea className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl h-24 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Viết vài dòng giới thiệu về món ăn này..." />
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
              {ing.map(() => (
                <div className="grid grid-cols-12 gap-3 items-center" >
                  <div className="col-span-6">
                    <select className="w-full h-10 p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:border-green-500 transition-all">
                      {
                        ingredients.map(
                          ingredients => (
                            <option key={ingredients.ing_id} value={ingredients.ing_id}> {ingredients.name}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  <div className="col-span-3 flex items-center bg-gray-50 border rounded-lg overflow-hidden" >
                    <input
                      type="number"
                      className="w-full h-[40px] text-center bg-transparent text-sm outline-none "
                      defaultValue="1"
                    />
                  </div>

                  {/* 3. Đơn vị */}
                  < input
                    type="text"
                    className="col-span-3 p-2.5 bg-gray-100 border rounded-lg text-sm text-gray-500 text-center font-medium focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Đơn vị tính"
                  />
                </div>
              ))}


              {/* 4. Nút xóa */}
              {ing.length > 1 ?
                (<button
                  onClick={handleRemoveLastIngredient}
                  className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"
                >
                  <Trash2 size={18} />
                </button>)
                : (<div></div>)
              }

              {/* Nút thêm mới */}
              <button
                onClick={handleAddIngredient}
                className="text-sm font-bold text-green-600 flex items-center gap-1 hover:underline pt-2"
              >
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
                <textarea className="w-full p-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" placeholder="Bước 1: Sơ chế nguyên liệu..." />
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
                <select className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Dễ</option>
                  <option>Trung bình</option>
                  <option>Khó</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Vùng miền</label>
                <select className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Miền Bắc</option>
                  <option>Miền Trung</option>
                  <option>Miền Nam</option>
                </select>
              </div>
              <div>
                <label className="space-y-3 text-xs font-bold text-gray-400 uppercase">Danh mục</label>
                {cat.map(() => (
                  <select className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
                    {
                      categories.map(
                        categories => (
                          <option key={categories.category_id} value={categories.category_id}> {categories.name}</option>
                        )
                      )
                    }
                  </select>
                ))}

                {/* Nut xoa danh muc */}
                {cat.length > 1 ?
                  (<button
                    onClick={handleRemoveLastCategory}
                    className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"
                  >
                    <Trash2 size={18} />
                  </button>)
                  :
                  (<div></div>)
                }


                {/* Nut them o chon danh muc */}
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="text-sm font-bold text-green-600 flex items-center gap-1 hover:underline pt-2"
                >
                  <Plus size={16} /> Thêm danh mục
                </button>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Thời gian nấu (phút)</label>
                <input type="number" className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none" placeholder="45" />
              </div>
              <hr />
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                <Send size={18} /> Đăng công thức
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}