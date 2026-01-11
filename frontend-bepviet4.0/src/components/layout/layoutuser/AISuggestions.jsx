import { Sparkles, ChevronRight } from "lucide-react";

export default function AISuggestions() {
  const suggestions = [
    { id: 1, name: "Gà Kho Gừng", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100" },
    { id: 2, name: "Canh Chua Cá", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100" },
  ];

  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar">
      
      {/* BOX 1: AI SUGGESTION */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
            <Sparkles size={18} />
          </div>
          <h3 className="font-bold text-gray-800 text-sm">Hôm nay ăn gì? (AI Gợi ý)</h3>
        </div>
        
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Dựa trên nguyên liệu trong tủ lạnh của bạn...
        </p>

        <div className="space-y-3">
          {suggestions.map((food) => (
            <div key={food.id} className="flex items-center gap-3 group cursor-pointer hover:bg-orange-50 p-2 rounded-xl transition-all">
              <img src={food.img} alt={food.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700">{food.name}</p>
                <p className="text-[10px] text-gray-400 font-medium">Dễ làm • 25 phút</p>
              </div>
              <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400" />
            </div>
          ))}
        </div>
        </div>
    </aside>
  );
}