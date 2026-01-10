import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import AISuggestions from "../../components/AISuggestions";
export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <>
            {/* Layout chính của ứng dụng */}
            <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
                <Header onOpenMenu={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 relative overflow-hidden">
                    {/* Đưa Sidebar ra ngoài hẳn, không bọc trong aside có w-64 nữa */}
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)} />
                    <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-100 pt-16 pb-28">
                        <div className="max-w-[680px] mx-auto py-8 px-4">
                            <Outlet />
                        </div>
                    </main>
                    <AISuggestions />
                </div>
                <Footer />
            </div>
        </>
    );
}