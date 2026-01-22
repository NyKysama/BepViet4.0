import {React, useState, useEffect} from 'react';
import {X, Plus, Edit, EyeOff, Eye, Trash2, Soup, Search, Tag } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

export default function IngredientTable() {
  const [formData, setFormData] = useState({
    name:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ing, setIng] = useState([]);

  const {id} = useParams();

  useEffect(()=>{
    fetchIng();
  },[]);

  const fetchIng = ()=>{
    fetch('http://127.0.0.1:8000/api/ingredient')
      .then(res=>res.json())
      .then(data=>setIng(data))
  };

  useEffect(()=>{
    if(id){
      fetch(`http://127.0.0.1:8000/api/admin/update-ingredient/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({ // nì là dùng để lưu lại danh sách củ ý ds mà ms hiện ra
            name: data.name || ''            
          });          
        })
    }},[id])
    // hàm dùng để thay đổi dl cập nhật cho set dự trên dl của input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ko bx này là j nhưng đại khái có nó ms gửi dl đi đc
    setIsLoading(true);

    const data = new FormData();// đây dl sẽ đc đưa vào hàm nì để đc đưa lên server 
    data.append('name', formData.name);    

    // Trick: Laravel kén PUT với FormData, dùng POST + _method PUT
    if (id) data.append('_method', 'PUT'); // cái nì là dùng để báo cho hệ thống là mk đang cập nhật 
    //cái try nì dùng để kiểm tra hôi
    try {
      // nì là dùng để xem hệ thống gửi qua đâu thực hiện chức năng j. hàm tạo ch có viết 
      const url = id
        ? `http://127.0.0.1:8000/api/admin/update-ingredient/${id}`
        : `http://127.0.0.1:8000/api/admin/create-ingredient`;

      const response = await fetch(url, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert(id ? "Cập nhật thành công!" : "Tạo nguyên liệu thành công!");     
        fetchIng();   
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (ingId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài này không?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/admin/delete-ingredient/${ingId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',                
            }
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            setIng(ing.filter(p => p.ing_id !== ingId)); 
        } else {
            alert("Lỗi: " + result.message);
        }
    } catch (error) {
        console.error("Lỗi khi gọi API xóa:", error);
    }
};

 const [searchTerm, setSearchTerm] = useState('');
 const filteredIngredients = ing.filter(cat =>
    cat?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl">
      {/* Header với chức năng Thêm */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Soup className="text-emerald-500" /> Quản lý Nguyên liệu
          </h2>
          <p className="text-slate-500 text-sm">Quản lý danh mục nguyên liệu dùng trong các công thức nấu ăn</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-400 uppercase">Tên Danh Mục:</label>
          <input            
            type="text"
            placeholder="Ví dụ: Món kho"
            className="flex-1 px-3 py-2 border rounded"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 text-sm">
            {id ? <Edit size={16} /> : <Plus size={20} />}
          </button>
        </div>
      </div>

       {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm nguyên liệu theo tên hoặc ID..."
              className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none transition text-slate-700"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition"
              >
                <X size={18} className="text-slate-400" />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-xs text-slate-500 mt-2 ml-1">
              Tìm thấy <span className="font-bold text-emerald-600">{filteredIngredients.length}</span> kết quả
            </p>
          )}
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-50">
              <th className="pb-4 px-4 font-semibold">ID</th>
              <th className="pb-4 px-4 font-semibold">Tên Nguyên liệu</th>
              <th className="pb-4 px-4 text-right">Thao tác Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredIngredients.map((ing) => (
              <tr key={ing.ing_id} className={`hover:bg-slate-50/50 transition-all ${ing.status === 'Hidden' ? 'bg-slate-50/30' : ''}`}>
                <td className="py-5 px-4 text-xs font-mono font-bold text-slate-400">
                  {ing.ing_id}
                </td>
                <td className="py-5 px-4 font-bold text-slate-700">
                  {ing.name}
                </td>                
                <td className="py-5 px-4">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/ingredient/${ing.ing_id}`} title="Sửa" className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                      <Edit size={16} />
                    </Link>                                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};