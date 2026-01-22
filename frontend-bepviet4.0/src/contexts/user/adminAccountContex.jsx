import { useState,useContext,createContext,useEffect } from "react";
const AdminAccountContext=createContext()
export function AdminAccountProvider({children}){
    var saveUser=localStorage.getItem('admin_data')
    saveUser=JSON.parse(saveUser)
    const [adminAccount,setAdminAccount]=useState(saveUser)
    // const [isLogin,setIsLogin]=useState(false)//ko dung gia tri nay lam logic
    useEffect(()=>{//khi adminAccount thay doi se tu dong luu vao local storage
        localStorage.setItem('admin_data', JSON.stringify(adminAccount))
    },[adminAccount])

    return(
        <AdminAccountContext.Provider value={{adminAccount,setAdminAccount}}>
            {children}
        </AdminAccountContext.Provider>
    )
}
 // Custom hook cho gọn
export const useAdminAccount = () => useContext(AdminAccountContext);