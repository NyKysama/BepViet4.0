// import { useState } from "react"
// import { useCookbook_Info } from "../../contexts/user/CookbookInfoContext";
// export default function CookbookInfo(){
//     const [isEditing, setIsEditing] = useState(false);
//     const {cookbook_info,setCookbook_Info}=useCookbook_Info()
//     const [editForm, setEditForm] = useState(cookbook_info);
    
//         const handleEditClick = () => {
//         // setEditForm(cookbook);
//         setIsEditing(true);
//     };

//     const handleSave = () => {
//         // setCookbook(editForm);
//         setIsEditing(false);
//     };

//     const handleCancel = () => {
//         setIsEditing(false);
//     };

//     return(
//         <>
//         <div className="w-full md:w-[360px] flex-shrink-0">
//           <div className="md:sticky md:top-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            
//             {isEditing ? (
//               /* --- EDIT MODE --- */
//               <div className="flex flex-col gap-4">
                
//                 {/* Toggle Privacy Setting */}
//                 <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between border border-gray-200">
//                     <div className="flex flex-col">
//                         <span className="text-sm font-bold text-gray-700">Chế độ riêng tư</span>
//                         <span className="text-xs text-gray-500">Chỉ mình bạn thấy</span>
//                     </div>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                         <input 
//                             type="checkbox" 
//                             checked={editForm.isPrivate} 
//                             onChange={(e) => setEditForm({...editForm, isPrivate: e.target.checked})}
//                             className="sr-only peer" 
//                         />
//                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                     </label>
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Ảnh bìa (URL)</label>
//                     <input 
//                       type="text" 
//                       value={editForm.coverImage}
//                       onChange={(e) => setEditForm({...editForm, coverImage: e.target.value})}
//                       className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Tên Cookbook</label>
//                     <input 
//                       type="text" 
//                       value={editForm.title}
//                       onChange={(e) => setEditForm({...editForm, title: e.target.value})}
//                       className="w-full p-2 border border-gray-300 rounded-lg font-bold text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Mô tả</label>
//                     <textarea 
//                       rows={4}
//                       value={editForm.description}
//                       onChange={(e) => setEditForm({...editForm, description: e.target.value})}
//                       className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                     />
//                 </div>

//                 <div className="flex gap-2 mt-2">
//                   <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">Lưu</button>
//                   <button onClick={handleCancel} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors">Hủy</button>
//                 </div>
//               </div>
//             ) : (
//               /* --- VIEW MODE --- */
//               <>
//                 <div className="aspect-square w-full rounded-xl overflow-hidden shadow-md mb-6 relative group">
//                   <img src={cookbook_info.coverImage} alt={cookbook_info.title} className="w-full h-full object-cover"/>
//                 </div>

//                 <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
//                   {cookbook_info.title}
//                 </h1>

//                 {/* Privacy Badge */}
//                 <div className="mb-4">
//                     {cookbook_info.isPrivate ? (
//                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                             </svg>
//                             Riêng tư
//                         </span>
//                     ) : (
//                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium border border-green-200">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
//                                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                 <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                             </svg>
//                             Công khai
//                         </span>
//                     )}
//                 </div>

//                 <div className="flex items-center gap-3 mb-6">
//                     <img src={cookbook_info.ownerAvatar} alt={cookbook_info.ownerName} className="w-10 h-10 rounded-full" />
//                     <div className="flex flex-col">
//                         <span className="text-sm font-bold text-gray-800 hover:underline cursor-pointer">{cookbook_info.ownerName}</span>
//                         <div className="text-xs text-gray-500 flex gap-2">
//                              <span>{11} công thức</span>
//                              <span>•</span>
//                              <span>{cookbook_info.lastUpdated}</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex gap-2 mb-4">
//                     <button className="flex-1 bg-black text-white py-2 rounded-full font-medium hover:bg-gray-800 transition">Phát tất cả</button>
//                     <button onClick={handleEditClick} className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                         </svg>
//                     </button>
//                 </div>

//                 <div className="text-sm text-gray-600 leading-relaxed">{cookbook_info.description}</div>
//               </>
//             )}
//           </div>
//         </div>
//         </>
//     )
// }