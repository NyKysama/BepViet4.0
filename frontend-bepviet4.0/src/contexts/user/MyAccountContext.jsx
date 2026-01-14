import { useState,useContext,createContext } from "react";
const MyAccountContext=createContext()
export function MyAccountProvider({children}){
    const [myAccount,setMyAccount]=useState({})
    const [isLogin,setIsLogin]=useState(false)

    return(
        <MyAccountContext.Provider value={{myAccount,setMyAccount,isLogin,setIsLogin}}>
            {children}
        </MyAccountContext.Provider>
    )
}
 // Custom hook cho gọn
export const useMyAccount = () => useContext(MyAccountContext);