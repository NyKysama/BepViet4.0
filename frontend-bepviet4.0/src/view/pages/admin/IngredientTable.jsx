import React from 'react';
import { Plus, Edit, EyeOff, Eye, Trash2, Soup, Search, Tag } from 'lucide-react';

export default function IngredientTable() {
    const mockIngredients = [
  { ingredient_id: "ING_001", name: "Thịt ba chỉ", unit: "gram", category: "Thực phẩm tươi", status: "Visible" },
  { ingredient_id: "ING_002", name: "Nước mắm", unit: "ml", category: "Gia vị", status: "Visible" },
  { ingredient_id: "ING_003", name: "Đường thốt nốt", unit: "gram", category: "Gia vị", status: "Visible" },
  { ingredient_id: "ING_004", name: "Cà cuống", unit: "con", category: "Đặc sản", status: "Hidden" }, // Đang ẩn
  { ingredient_id: "ING_005", name: "Hành tím", unit: "gram", category: "Rau củ", status: "Visible" }
];
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
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100">
          <Plus size={20} /> Thêm Nguyên liệu
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-50">
              <th className="pb-4 px-4 font-semibold">ID</th>
              <th className="pb-4 px-4 font-semibold">Tên Nguyên liệu</th>
              <th className="pb-4 px-4 font-semibold">Trạng thái</th>
              <th className="pb-4 px-4 text-right">Thao tác Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockIngredients.map((ing) => (
              <tr key={ing.ingredient_id} className={`hover:bg-slate-50/50 transition-all ${ing.status === 'Hidden' ? 'bg-slate-50/30' : ''}`}>
                <td className="py-5 px-4 text-xs font-mono font-bold text-slate-400">
                  {ing.ingredient_id}
                </td>
                <td className="py-5 px-4 font-bold text-slate-700">
                  {ing.name}
                </td>
                <td className="py-5 px-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                    ing.status === 'Visible' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {ing.status === 'Visible' ? 'Khả dụng' : 'Đã ẩn'}
                  </span>
                </td>
                <td className="py-5 px-4">
                  <div className="flex justify-end gap-2">
                    <button title="Sửa" className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                      <Edit size={16} />
                    </button>
                    <button 
                      title={ing.status === 'Visible' ? "Ẩn nguyên liệu" : "Hiện nguyên liệu"} 
                      className={`p-2 rounded-xl transition-all ${
                        ing.status === 'Visible' ? 'bg-amber-50 text-amber-600 hover:bg-amber-600' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600'
                      } hover:text-white`}
                    >
                      {ing.status === 'Visible' ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
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