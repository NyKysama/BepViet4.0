import { useState,useContext,createContext,useEffect } from "react";
const MyAccountContext=createContext()
export function MyAccountProvider({children}){
    var saveUser=localStorage.getItem('user_data')
    saveUser=JSON.parse(saveUser)
    const [myAccount,setMyAccount]=useState(saveUser)
    // const [isLogin,setIsLogin]=useState(false)//ko dung gia tri nay lam logic
    useEffect(()=>{//khi myAccount thay doi se tu dong luu vao local storage
        localStorage.setItem('user_data', JSON.stringify(myAccount))
    },[myAccount])

    return(
        <MyAccountContext.Provider value={{myAccount,setMyAccount}}>
            {children}
        </MyAccountContext.Provider>
    )
}
 // Custom hook cho gọn
export const useMyAccount = () => useContext(MyAccountContext);