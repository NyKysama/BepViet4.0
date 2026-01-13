// import { useState,useContext,createContext } from "react";
// const CookbookInfoContext=createContext()
// export function CookbookInfoProvider({children}){
//     const [cookbook_info, setCookbook_Info] = useState({
//         id: 1,
//         title: "Món Ngon Cuối Tuần 🍜",
//         coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
//         description: "Tuyển tập những công thức nấu ăn đơn giản nhưng cực kỳ bắt miệng dành cho những ngày nghỉ.",
//         ownerName: "Chef Ramsey Fake",
//         ownerAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=100&q=80",
//         totalPosts: 8, // Số lượng sẽ tự động cập nhật theo list
//         lastUpdated: "2 ngày trước",
//         isPrivate: false // <--- Trường mới: Chế độ riêng tư
//     })

//     return(
//         <CookbookInfoContext.Provider value={{cookbook_info, setCookbook_Info}}>
//             {children}
//         </CookbookInfoContext.Provider>
//     )
// }
//  // Custom hook cho gọn
// export const useCookbook_Info = () => useContext(CookbookInfoContext);