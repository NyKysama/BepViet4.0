import React from 'react';
import { UserPlus, Edit, Lock, Trash2, Shield, Calendar, Phone, Mail } from 'lucide-react';
import { Link} from 'react-router-dom';

export default function UserTable() {
    const mockUsers = [
  {
    user_id: "U001",
    name: "Nguyễn Văn A", //
    avatar: "https://i.pravatar.cc/150?u=u001",
    username: "van_a_chef",
    password: "hashed_password_123",
    birthday: "1998-05-20",
    sex: "Nam",
    phone: "0901234567",
    gmail: "vana@bepviet.vn",
    role: "Admin",
    slug: "nguyen-van-a",
    status: "Active"
  },
  {
    user_id: "U002",
    name: "Trần Van A", //
    avatar: "https://i.pravatar.cc/150?u=u002",
    username: "tran_a",
    password: "hashed_password_456",
    birthday: "2002-11-15",
    sex: "Nam",
    phone: "0987654321",
    gmail: "tran@gmail.com",
    role: "User",
    slug: "tran-van-a",
    status: "Active"
  }
];
  return (
    <div className="p-6 bg-white rounded-[32px] border border-slate-100 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Quản lý User 4.0</h2>
        <button className="bg-emerald-500 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all">
          <UserPlus size={18} /> Tạo mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[1200px]">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase border-b border-slate-100">
              <th className="pb-3 px-2">ID & Ảnh</th>
              <th className="pb-3 px-2">Thông tin cơ bản</th>
              <th className="pb-3 px-2">Liên hệ (Gmail/Phone)</th>
              <th className="pb-3 px-2">Cá nhân (B-day/Sex)</th>
              <th className="pb-3 px-2">Phân quyền</th>
              <th className="pb-3 px-2 text-center">Trạng thái</th>
              <th className="pb-3 px-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockUsers.map((u) => (
              <tr key={u.user_id} className="hover:bg-slate-50/80 transition-all group">
                {/* 1. user_id & avatar */}
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 p-1 rounded">{u.user_id}</span>
                    <Link to={`/admin/user-detail/${u.user_id}`}>
                      <img src={u.avatar} className="w-10 h-10 rounded-full border-2 border-emerald-500/20" alt="" />
                    </Link>
                  </div>
                </td>
                
                {/* 2. name, username, slug */}
                <td className="py-4 px-2">
                  <div className="font-bold text-slate-800 text-sm">{u.name}</div>
                  <div className="text-[11px] text-emerald-600 font-medium">@{u.username}</div>
                  <div className="text-[10px] text-slate-400 italic">/{u.slug}</div>
                </td>

                {/* 3. gmail, phone */}
                <td className="py-4 px-2">
                  <div className="flex flex-col gap-1 text-[12px] text-slate-600">
                    <span className="flex items-center gap-1"><Mail size={12}/> {u.gmail}</span>
                    <span className="flex items-center gap-1 font-mono"><Phone size={12}/> {u.phone}</span>
                  </div>
                </td>

                {/* 4. birthday, sex */}
                <td className="py-4 px-2 text-[12px] text-slate-600">
                  <div className="flex items-center gap-1"><Calendar size={12}/> {u.birthday}</div>
                  <div className="mt-1 font-semibold">{u.sex}</div>
                </td>

                {/* 5. role (Phân quyền) */}
                <td className="py-4 px-2">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${
                    u.role === 'Admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    <Shield size={12} /> {u.role}
                  </div>
                </td>

                {/* 6. status */}
                <td className="py-4 px-2 text-center">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                    u.status === 'Active' ? 'border-emerald-500 text-emerald-600' : 'border-red-500 text-red-600'
                  }`}>
                    {u.status.toUpperCase()}
                  </span>
                </td>

                {/* 7. Action: Sửa, Khóa, Xóa */}
                <td className="py-4 px-2">
                  <div className="flex justify-end gap-1.5">
                    <button className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg"><Edit size={16}/></button>
                    <button className="p-2 hover:bg-amber-50 text-amber-500 rounded-lg"><Lock size={16}/></button>
                    <button className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={16}/></button>
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