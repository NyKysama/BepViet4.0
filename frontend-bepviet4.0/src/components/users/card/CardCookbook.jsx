import { useState } from "react"
import {MoreVertical, Trash2} from "lucide-react"

export default function CardCookbook({ cookbook,isMycookbook }) {

        const [showMenu, setShowMenu] = useState(false);
        const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
         

        const handleDelete = () => {
            console.log('Đã xóa cookbook:', cookbook);
            setShowDeleteConfirm(false);
            setShowMenu(false);
        };

    return (
        <>
            <div
                key={cookbook.id}
                className="flex-shrink-0 w-40 md:w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden group"
            >
                <div className="aspect-video overflow-hidden bg-gray-200 relative">
                    <img
                        src={cookbook.image}
                        alt={cookbook.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    {/*Nu 3 cham dropdow menu*/}
                    {isMycookbook &&(<>
                      <div className="absolute top-2 right-2">
                          <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition "
                        >
                            <MoreVertical size={16} className="text-gray-600" />
                        </button>

                          {/* Menu Dropdown */}
                    {showMenu && (
                        <>
                            {/* Overlay */}
                            <div 
                                className="fixed inset-0 z-10"
                                onClick={() => setShowMenu(false)}
                            />
                            
                            <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[120px] z-20">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDeleteConfirm(true);
                                        setShowMenu(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                                >
                                    <Trash2 size={14} />
                                    Xóa
                                </button>
                            </div>
                        </>
                    )}
                    </div>
                    </>)

                    }
                  
                </div>

                {/* Popup Xác Nhận Xóa */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl max-w-sm w-full p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Xóa Cookbook?</h3>
                            <p className="text-gray-600 mb-6">
                                Bạn có chắc chắn muốn xóa cookbook <span className="font-semibold">"{cookbook.title}"</span>? Hành động này không thể hoàn tác.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-2 group-hover:text-green-500 transition">
                        {cookbook.name}
                    </h3>
                    <p className="text-xs text-gray-500"><span className="text-yellow-400">{cookbook.count}</span> công thức</p> 
                </div>
            </div>
        </>
    )
}