import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/layout/layoutuser/Header";
import Footer from "../../components/layout/layoutuser/Footer";
import Sidebar from "../../components/layout/layoutuser/Sidebar";
import AISuggestions from "../../components/layout/layoutuser/AISuggestions";
export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();// Lấy thông tin về đường dẫn hiện tại
    const isHomePage = location.pathname === "/";  // Kiểm tra nếu đang ở trang chủ
    return (
        <>
            {/* Layout chính của ứng dụng */}
            <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
                <Header onOpenMenu={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 pt-16 relative overflow-hidden">    
                    {/* Truyền isOpen và onClose vào Sidebar */}        
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)} />
                    <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-100">
                        <div className={`mx-auto pt-0 pb-10 px-4 ${isHomePage ? "max-w-[680px]" : "max-w-[1000px]"}`}>
                            <Outlet />
                        </div>
                    </main>
                    {isHomePage && <AISuggestions />} {/* Chỉ hiển thị AISuggestions trên trang chủ */}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
}