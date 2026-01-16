import { useState } from 'react';
import { X, Plus, Edit, EyeOff, Eye, Trash2, FolderTree, Search } from 'lucide-react';

export default function CategoryTable() {
  const mockCategories = [
    { category_id: "CAT_001", name: "Món ngon Trending", status: "Visible" },
    { category_id: "CAT_002", name: "Ẩm thực Miền Bắc", status: "Visible" },
    { category_id: "CAT_003", name: "Ẩm thực Miền Trung", status: "Visible" },
    { category_id: "CAT_004", name: "Ẩm thực Miền Nam", status: "Visible" },
    { category_id: "CAT_005", name: "Món Chay", status: "Hidden" } // Admin đang ẩn danh mục này
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const filteredCategories = mockCategories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.category_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl">
      {/* Header với chức năng Thêm */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FolderTree className="text-emerald-500" /> Quản lý Danh mục
          </h2>
          <p className="text-slate-500 text-sm">Quản lý các nhóm món ăn và vùng miền trên hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-400 uppercase">Tên Danh Mục:</label>
          <input
            type="text"
            placeholder="Ví dụ: Món kho"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 text-sm">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm danh mục theo tên hoặc ID..."
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
              Tìm thấy <span className="font-bold text-emerald-600">{filteredCategories.length}</span> kết quả
            </p>
          )}
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-50">
              <th className="pb-4 px-4 font-semibold">ID Danh mục</th>
              <th className="pb-4 px-4 font-semibold">Tên Danh mục</th>
              <th className="pb-4 px-4 font-semibold">Trạng thái</th>
              <th className="pb-4 px-4 text-right">Thao tác Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredCategories.map((cat) => (
              <tr key={cat.category_id} className={`hover:bg-slate-50/50 transition-all ${cat.status === 'Hidden' ? 'bg-slate-50/30' : ''}`}>
                <td className="py-5 px-4">
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    {cat.category_id}
                  </span>
                </td>
                <td className="py-5 px-4 font-bold text-slate-700">
                  {cat.name}
                </td>
                <td className="py-5 px-4">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${cat.status === 'Visible' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                    {cat.status === 'Visible' ? 'Đang hiển thị' : 'Đang ẩn'}
                  </span>
                </td>
                <td className="py-5 px-4">
                  <div className="flex justify-end gap-2">
                    {/* Quyền Sửa */}
                    <button title="Sửa tên" className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                      <Edit size={16} />
                    </button>
                    {/* Quyền Ẩn/Hiện */}
                    <button
                      title={cat.status === 'Visible' ? "Ẩn danh mục" : "Hiện danh mục"}
                      className={`p-2 rounded-xl transition-all ${cat.status === 'Visible' ? 'bg-amber-50 text-amber-600 hover:bg-amber-600' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600'
                        } hover:text-white`}
                    >
                      {cat.status === 'Visible' ? <EyeOff size={16} /> : <Eye size={16} />}
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