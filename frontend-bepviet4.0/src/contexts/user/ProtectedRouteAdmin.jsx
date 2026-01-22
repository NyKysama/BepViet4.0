// // ProtectedRouteAdmin.jsx
// import { Navigate } from 'react-router-dom';
// import { useAdminAccount } from '../contexts/user/adminAccountContex';

// export default function ProtectedRouteAdmin ({ children }) {
//     const { adminAccount } = useAdminAccount();
    
//     // Lấy dữ liệu từ localStorage để tránh bị mất khi F5 trang
//     const localAdmin = JSON.parse(localStorage.getItem('admin_data'));
//     const currentAdmin = adminAccount || localAdmin;

//     // Nếu không có tài khoản HOẶC tài khoản đó không phải là admin
//     if (!currentAdmin || currentAdmin.role !== 'admin') {
//         alert("Bạn không có quyền truy cập vào trang quản trị!");
//         return <Navigate to="/login-admin" replace />;
//     }
//     return children;
// };