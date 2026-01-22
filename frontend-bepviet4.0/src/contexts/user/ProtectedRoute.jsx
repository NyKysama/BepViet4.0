import { Navigate, useLocation } from 'react-router-dom';
import { useMyAccount } from '../user/MyAccountContext';

export function ProtectedRoute ({ children }) {
    const { myAccount } = useMyAccount();
    const location = useLocation();

    // Kiểm tra nếu không có thông tin user
    if (!myAccount || !myAccount.user_id) {
        // Chuyển hướng về trang login, lưu lại vị trí cũ để sau khi login xong có thể quay lại
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

