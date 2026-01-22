import React from 'react';

export default function LoginPopup({ onClose,success, message }) {
  // Cấu hình màu sắc và icon dựa trên type

  
  const config = {
    success: {
      borderColor: 'border-green-500',
      iconBg: 'bg-green-100 dark:bg-green-800',
      iconColor: 'text-green-500 dark:text-green-200',
      title: 'Thành công!',
      defaultMsg: 'Bạn đã đăng nhập thành công.',
      iconPath: <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
    },
    error: {
      borderColor: 'border-red-500',
      iconBg: 'bg-red-100 dark:bg-red-800',
      iconColor: 'text-red-500 dark:text-red-200',
      title: 'Lỗi đăng nhập!',
      defaultMsg: 'Email hoặc mật khẩu không đúng.',
      iconPath: <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
    }
  };

  const current = success?config.success:config.error;

  return (
    <div className="fixed top-5 right-5 z-50 animate-bounce-in">
      <div className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg border-l-4 ${current.borderColor} dark:bg-gray-800 dark:text-gray-400`}>
        
        {/* Icon linh hoạt */}
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${current.iconBg} ${current.iconColor}`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {current.iconPath}
          </svg>
        </div>

        {/* Nội dung chữ */}
        <div className="ms-3 text-sm font-normal">
            <div className={`font-semibold ${success? 'text-gray-900' : 'text-red-600'} dark:text-white`}>
              {current.title}
            </div>
            <div className="text-xs text-gray-500">
              {current.defaultMsg}
            </div>
        </div>

        {/* Nút đóng */}
        <button 
          type="button" 
          onClick={onClose}
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}