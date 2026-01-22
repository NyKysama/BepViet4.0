import { useState, useEffect } from "react";
import { Trash2, Plus, ImagePlus, Send, FileText, X } from "lucide-react";
import { useMyAccount } from "../../../contexts/user/MyAccountContext";

// cau truc du lieu du gui di 
// {
//   "title": "Tên món ăn",
//   "description": "Mô tả món ăn...",
//   "img": (file ảnh món ăn)
//   "category_ids": [1, 5], Danh sách id Danh mục
//   "type": "Công thức"
//   "cook_time": "thoi gian (phút)"
//   "slug": "slug tìm kiếm thân thiện"
//   "difficulty": "Độ khó"
//   "region": "Miền"
//   "Status": "1"
//   "ingredients": [
//     { "ing_id": "0", "amount": "500", "unit": "gram" },
//     { "ing_ii": "0", "amount": "500", "unit": "gram" },  
//   ],
//   "steps": [
//     { "step": "0", "content": "Hướng dẫn","img": (file ảnh từng bước) },
//     { "step": "0", "content": "Hướng dẫn","img": (file ảnh từng bước) },
//   ]
// }

export default function CreateRecipe() {
  const {myAccount}=useMyAccount()
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

  //Cong thuc
  const [recipe, setRecipe] = useState(
    {
      title: '',
      description: '',
      img: null,
      category_ids: [1],
      type: 'Công thức',
      cook_time: 1,
      difficulty: 'Dễ',
      region: 'Miền bắc',
      status: 1,
      ingredients: [
        { ing_id: 0, amount: 0, unit: '' },
      ],
      steps: [
        { step: 1, content: '', img: null },
      ]
    }
  )

  //kiem tra du lieu cong thuc
  const validateRecipe = (recipe) => {
    const errors = {};

    if (!recipe.title || recipe.title.trim() === "") {
      errors.title = "Tên món ăn không được để trống";
    }

    if (!recipe.cook_time || recipe.cook_time <= 0) {
      errors.cook_time = "Thời gian nấu phải > 0";
    }

    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      errors.ingredients = "Phải có ít nhất 1 nguyên liệu";
    } else {
      recipe.ingredients.forEach((ing, index) => {
        if (!ing.ing_id || ing.ing_id === 0) {
          errors[`ingredients_${index}`] = "Chưa chọn nguyên liệu";
        }
        if (!ing.amount || ing.amount <= 0) {
          errors[`amount_${index}`] = "Số lượng phải > 0";
        }
        if (!ing.unit || ing.unit.trim() === "") {
          errors[`unit_${index}`] = "Thiếu đơn vị";
        }
      });
    }

    if (!recipe.steps || recipe.steps.length === 0) {
      errors.steps = "Phải có ít nhất 1 bước";
    } else {
      recipe.steps.forEach((step, index) => {
        if (!step.content || step.content.trim() === "") {
          errors[`steps_${index}`] = "Nội dung bước không được rỗng";
        }
      });
    }

    return errors;
  };


  //ham gan gia tri cac truong don gian trong useState cong thuc kieu string
  const handleInputStringChange = (e) => {
    // e.target đại diện cho thẻ input đang được gõ
    // name: là giá trị của thuộc tính name="" trên thẻ
    // value: là nội dung người dùng vừa nhập vào
    const { name, value } = e.target;
    setRecipe({
      ...recipe, // Copy lại toàn bộ dữ liệu cũ của recipe
      [name]: value // Chỉ ghi đè duy nhất trường có tên trùng với biến 'name'
    });
  };

  //ham gan gia tri cac truong don gian trong useState cong thuc kieu number
  const handleInputNumberChange = (e) => {
    const { name, value } = e.target;

    setRecipe({
      ...recipe,
      [name]: value === '' ? 0 : Number(value)
    });
  };

  //Thao tac voi anh
  //luu tru anh tam de hien thi tren giao dien
  const [previewImg, setPreviewImg] = useState(null);
  //ham xu li khi chon anh
  const handleImageChange = (e) => {
    //lay file dau tien nguoi dung chon
    const selectedImg = e.target.files[0];

    //xu ly khi co anh
    if (selectedImg) {
      //luu tru anh
      setRecipe({ ...recipe, img: selectedImg })

      //tao duong dan ao de hien thi anh tren giao dien
      const objectUrl = URL.createObjectURL(selectedImg);
      setPreviewImg(objectUrl);
    }
  }
  //ham xoa anh
  const handleRemoveImage = () => {
    setPreviewImg(null)
    setRecipe({ ...recipe, img: null })

    if (previewImg) {
      URL.revokeObjectURL(previewImg);
    }
  }

  //ham them nguyen lieu moi
  const handleAddIngredient = () => {
    const newIngs = { ing_id: 0, amount: 0, unit: '' }
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngs] })
  };
  //ham thay doi doi tuong nguyen lieu
  const handleUpdateIngredient = (index, field, value) => {
    //index: vi tri nguyen lieu trong danh sach
    //field: ten truong du lieu can sua
    //value: gia tri can sua

    //tao danh sach cac buoc moi dua tren danh sach hien co 
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    };
    //cap nhat lai danh sach nguyen lieu moi
    setRecipe({
      ...recipe,
      ingredients: newIngredients
    });
  }
  //ham huy o nhap nguyen lieu duoi cung
  const handleRemoveLastIngredient = () => {
    //chi xoa duoc khi co nhieu hon mot nguyen lieu
    if (recipe.ingredients.length > 1) {
      // Tao mang moi bang mang cu bo phan tu cuoi
      const newIngs = recipe.ingredients.slice(0, -1);
      //gan danh sach nguyen lieu  moi cho cong thuc
      setRecipe({ ...recipe, ingredients: [...newIngs] })
    }
  };

  //thao tac voi cac buoc
  //luy anh hien thi buoc tren giao dien
  const [previewImgSteps, setPreviewImgSteps] = useState([null])
  //Them mot buoc moi
  const handleAddStep = () => {
    const lastStep = recipe.steps.at(-1).step
    const newStep = { step: lastStep + 1, content: '', img: null }
    setRecipe({ ...recipe, steps: [...recipe.steps, newStep] })
    setPreviewImgSteps([...previewImgSteps, null]);
  }
  const handleStepImgChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;
    //luu file vao cong thuc
    const newSteps = [...recipe.steps];
    newSteps[index] = { ...newSteps[index], img: file }
    setRecipe({ ...recipe, steps: newSteps })

    //luu dia chi hien thi
    const newPreImgSteps = [...previewImgSteps];
    newPreImgSteps[index] = URL.createObjectURL(file);
    setPreviewImgSteps(newPreImgSteps)
  }
  const handleRemoveStepImage = (index) => {
    // revoke URL cũ để tránh leak memory
    if (previewImgSteps[index]) {
      URL.revokeObjectURL(previewImgSteps[index]);
    }

    const newSteps = [...recipe.steps];
    newSteps[index] = {
      ...newSteps[index],
      img: null
    };

    const newPreviews = [...previewImgSteps];
    newPreviews[index] = null;

    setRecipe({ ...recipe, steps: newSteps });
    setPreviewImgSteps(newPreviews);
  };
  //ham cap nhat danh sach cac buoc lam
  const handleUpdateStep = (index, field, value) => {
    //index: vi tri buoc trong danh sach
    //field: ten truong du lieu can sua
    //value: gia tri can sua

    //tao danh sach cac buoc moi dua tren danh sach hien co 
    const newSteps = [...recipe.steps]
    // chinh sua gia tri
    newSteps[index] = {
      ...newSteps[index], [field]: value
    };

    //cap nhat lai danh sach buoc moi
    setRecipe({ ...recipe, steps: newSteps })
  }
  //xoa buoc duoi cung
  const handleRemoveLastStep = () => {
    //chi xoa duoc khi co nhieu hon mot buoc
    if (recipe.steps.length > 1) {
      //tao danh sach buoc moi da xoa phan tu cuoi cung
      const newSteps = recipe.steps.slice(0, -1)
      //gan danh sach buoc moi cho cong thuc
      setRecipe({ ...recipe, steps: [...newSteps] });
      setPreviewImgSteps(previewImgSteps.slice(0, -1));
    }
  }

  //Them o chon danh muc tren giao dien
  const handleAddCategory = () => {
    setRecipe({ ...recipe, category_ids: [...recipe.category_ids, 0] })
  }
  const handleUpdateCategory = (index, value) => {
    const newCats = [...recipe.category_ids];

    // ép kiểu number
    const categoryId = Number(value);

    newCats[index] = categoryId;

    setRecipe({
      ...recipe,
      category_ids: newCats
    });
  };
  //Huy o nhap danh muc
  const handleRemoveLastCategory = () => {
    if (recipe.category_ids.length > 1) {
      setRecipe({ ...recipe, category_ids: [...recipe.category_ids.slice(0, -1)] })
    }
  }

  //Thong bao gui du lieu
  const [notify, setNotify] = useState(null);
  //ham gui du lieu ve backend
  const handleSubmitRecipe = async () => {
    const errors = validateRecipe(recipe);

    if (Object.keys(errors).length > 0) {
      console.error("Dữ liệu không hợp lệ:", errors);
      const errorsMessege = Object.values(errors).join("\n");
      alert(`Dữ liệu không hợp lệ:\n${errorsMessege}`);
      return;
    }

    const formData = new FormData();

    // field don 
    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("type", recipe.type);
    formData.append("cook_time", recipe.cook_time);
    formData.append("difficulty", recipe.difficulty);
    formData.append("region", recipe.region);
    formData.append("status", recipe.status);
    formData.append("user_id", myAccount.user_id);

    // anh cong thuc
    if (recipe.img) {
      formData.append("img", recipe.img);
    }

    // category_ids[]
     formData.append("category_ids", recipe.category_ids);

    //ingredients
    const ingredients =  recipe.ingredients.map(ingredient => ({
      ing_id: ingredient.ing_id,
      amount: ingredient.amount,
      unit: ingredient.unit
    }));
    formData.append("ingredients",JSON.stringify(ingredients));

    //steps
      const steps = recipe.steps.map(step => ({
      step: step.step,
      content: step.content
    }));
    formData.append('steps', JSON.stringify(steps));
    // ảnh giữ riêng
    recipe.steps.forEach((step, index) => {
      if (step.img) {
        formData.append(`step_imgs[${index}]`, step.img);
      }
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/create-recipe", {
         headers:{
                            'Accept': 'application/json',
                    },
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(recipe.category_ids)
      //Kiem tra respose
      if (res.ok && data.success) {
        //thanh cong
        setNotify({
          type: "success",
          message: data.message || "Gửi dữ liệu thành công",
        });
        console.log(data);
      }
      // loi tu backend
      else {
        setNotify({
          type: "error",
          message: data.message || "Gửi dữ liệu thất bại",
        });
      }
    }
    //loi ket noi 
    catch (err) {
      setNotify({
        type: "error",
        message: "Không thể kết nối tới server",
      });
      console.error("ERROR:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 mt-10 px-4">
      {/* HEADER TRANG */}
      {/* thong bao gui du lieu */}
      {notify && (
        <div
          className={`mb-4 p-3 rounded-xl text-sm font-semibold ${notify.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
            }`}
        >
          {notify.message}
        </div>
      )}
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
                <input
                  name="title"
                  onChange={handleInputStringChange}
                  type="text"
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Ví dụ: Cá kho tộ miền Tây" />
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
                <textarea
                  name="description"
                  onChange={handleInputStringChange}
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl h-24 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Viết vài dòng giới thiệu về món ăn này..." />
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
              {recipe.ingredients.map((ing, index) => (
                <div className="grid grid-cols-12 gap-3 items-center" >
                  <div className="col-span-6">
                    <select className="w-full h-10 p-2.5 bg-gray-50 border rounded-lg text-sm outline-none focus:border-green-500 transition-all"
                      value={ing.ing_id}
                      onChange={(e) =>
                        handleUpdateIngredient(index, "ing_id", Number(e.target.value))
                      }
                    >
                      <option value={0}>-- Chọn nguyên liệu --</option>
                      {
                        ingredients.map(
                          ingredient => (
                            <option key={ingredient.ing_id} value={ingredient.ing_id}> {ingredient.name}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  <div className="col-span-3 flex items-center bg-gray-50 border rounded-lg overflow-hidden" >
                    <input
                      type="number"
                      className="w-full h-[40px] text-center bg-transparent text-sm outline-none "
                      min={0}
                      step={0.1}
                      value={ing.amount}
                      onChange={(e) =>
                        handleUpdateIngredient(index, "amount", Number(e.target.value))
                      }
                    />
                  </div>

                  {/* 3. Đơn vị */}
                  < input
                    type="text"
                    className="col-span-3 p-2.5 bg-gray-100 border rounded-lg text-sm text-gray-500 text-center font-medium focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Đơn vị tính"
                    value={ing.unit}
                    onChange={(e) =>
                      handleUpdateIngredient(index, "unit", e.target.value)
                    }
                  />
                </div>
              ))}


              {/* 4. Nút xóa */}
              {recipe.ingredients.length > 1 ?
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

              {recipe.steps.map((step, index) => (
                <div className="relative pl-8 border-l-2 border-dashed border-gray-200">
                  <div className="absolute -left-[11px] top-0 w-5 h-5 bg-green-600 rounded-full text-white text-[10px] flex items-center justify-center font-bold">{step.step}</div>
                  <textarea
                    onChange={(e) => handleUpdateStep(index, "content", e.target.value)}
                    className="w-full p-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" placeholder="Nhập bước tiến hành" />
                  <label className="text-xs font-bold text-gray-400 uppercase">Ảnh mô tả bước
                    {
                      (previewImgSteps[index] === null) ? (
                        //khong co anh
                        <div className="mt-2 w-32 h-24 bg-gray-100 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-200">
                          <ImagePlus size={20} />
                          <span className="text-[10px] mt-1 text-center px-2">Thêm ảnh bước này</span>
                        </div>) : (
                        //co anh
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={previewImgSteps[index]}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          {/* Nút X để xóa ảnh */}
                          <button
                            onClick={() => handleRemoveStepImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                            type="button"
                          >
                            <X size={20} />
                          </button>
                        </div>)
                    }
                    <input onChange={(e) => handleStepImgChange(e, index)} type="file" className="hidden" accept="image/*" />
                  </label>
                </div>))}

              {/* nut xoa buoc */}
              {(recipe.steps.length > 1) ? (
                <button
                  onClick={handleRemoveLastStep}
                  className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"
                >
                  <Trash2 size={18} />
                </button>) : (
                <div></div>
              )}
              {/* nut them buoc */}
              <button
                onClick={handleAddStep}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-medium hover:bg-gray-50 transition-colors">
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
                <select
                  name="difficulty"
                  onChange={handleInputStringChange}
                  className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="Dễ">Dễ</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Khó">Khó</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Vùng miền</label>
                <select
                  name="region"
                  onClick={handleInputStringChange}
                  className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="Miền Bắc">Miền Bắc</option>
                  <option value="Miền Trung">Miền Trung</option>
                  <option value="Miền Nam">Miền Nam</option>
                </select>
              </div>
              <div>
                <label className="space-y-3 text-xs font-bold text-gray-400 uppercase">Danh mục</label>
                {recipe.category_ids.map((categories_id, index) => (
                  <select
                    onChange={(e) => handleUpdateCategory(index, e.target.value)}
                    className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none">
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
                {recipe.category_ids.length > 1 ?
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
                <input
                  name="cook_time"
                  type="number"
                  onChange={handleInputNumberChange}
                  className="w-full mt-1 p-2.5 bg-gray-50 border rounded-xl text-sm outline-none" placeholder="45" />
              </div>
              <hr />
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleSubmitRecipe}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                <Send size={18} /> Đăng công thức
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}