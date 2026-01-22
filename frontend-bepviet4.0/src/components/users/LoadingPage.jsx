export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-orange-500 border-r-green-400 rounded-full animate-spin"></div>
        </div>

        {/* Logo/Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-400 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">🍳</span>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang tải...</h2>
        <p className="text-gray-500 text-sm">Vui lòng đợi trong giây lát</p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}