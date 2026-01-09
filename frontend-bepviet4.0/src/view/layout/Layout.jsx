import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
export default function Layout() {
    return (
        <>
        {/* Layout chính của ứng dụng */}
        <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
            <Header />
            <div className="flex flex-1">
                {/* Sidebar - Cố định bên trái */}
                <aside className="w-64 bg-white border-r sticky top-16 h-[calc(100vh-64px)] overflow-y-auto z-40 no-scrollbar">
                    <Sidebar />
                </aside>
                <main className="pt-16 pb-28 min-h-screen bg-gray-100">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
        </>
    );
}