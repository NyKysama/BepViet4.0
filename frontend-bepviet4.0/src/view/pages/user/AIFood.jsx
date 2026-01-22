import React, { useEffect, useState } from 'react';
import { Plus, X, Sparkles, Copy, ChefHat, Lightbulb } from 'lucide-react';
import LoadingPage from '../../../components/users/LoadingPage';

export default function AIFood() {
  const [ingredients, setIngredients] = useState([
  ]);
  const [aiInput, setAiInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [ingredientList,setIngredientList]=useState()


  useEffect(()=>{
    async function fetchIngredient(){
      try {
        const res=await fetch("http://127.0.0.1:8000/api/ingredient")
        const data=await res.json()
        if(!res.ok){
          return
        }
        console.log(data)
        setIngredientList(data)
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }
    fetchIngredient()
  },[])

  const addIngredient = () => {
    console.log(ingredients)
    setIngredients([
      ...ingredients,
      { ing_id: Date.now(), name: '',}
    ]);
  };

  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.ing_id !== id));
    }
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(ing => 
      ing.ing_id === id ? { ...ing, [field]: value,} : ing
    ));
  };

  const parseAiInput = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `Phân tích danh sách nguyên liệu sau và trả về CHỈ JSON array không có markdown, không có giải thích:
"${aiInput}"

Format: [{"name": "tên nguyên liệu", "quantity": "số lượng", "unit": "đơn vị"}]
Ví dụ: [{"name": "thịt bò", "quantity": "500", "unit": "g"}]`
            }
          ],
        })
      });

      const data = await response.json();
      const text = data.content[0].text.trim();
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      
      const newIngredients = parsed.map((item, index) => ({
        id: Date.now() + index,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit
      }));
      
      setIngredients(newIngredients);
      setAiInput('');
    } catch (err) {
      console.error('Lỗi phân tích:', err);
      alert('Không thể phân tích dữ liệu. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async () => {
    // const validIngredients = ingredients.filter(ing => ing.name && ing.quantity);
    
    if (ingredients.length === 0) {
      alert('Vui lòng nhập ít nhất 1 nguyên liệu!');
      return;
    }

    setLoadingSuggestions(true);
    setSuggestions([]);
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/test-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         ingredients:ingredients,
        })
      });

      const data = await response.json();
      console.log(data)
      const text = data.choices[0].message.content;
      const cleaned = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      console.log(parsed)
      setSuggestions(parsed.posts);//set cong thuc goi y
    } catch (err) {
      console.error('Lỗi gợi ý:', err);
      alert('Không thể tạo gợi ý. Vui lòng thử lại!');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const exportData = () => {
    const data = ingredients
      .filter(ing => ing.name && ing.quantity)
      .map(ing => `${ing.quantity}${ing.unit} ${ing.name}`)
      .join(', ');
    
    navigator.clipboard.writeText(data);
    alert('Đã sao chép dữ liệu!');
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Dễ': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Khó': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (<LoadingPage></LoadingPage>)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <ChefHat className="text-orange-600" />
            Gợi Ý Món Ăn Từ Nguyên Liệu
          </h1>
          <p className="text-gray-600 mb-6">Nhập nguyên liệu bạn có, AI sẽ gợi ý món ăn phù hợp</p>

          {/* AI Input Section */}
          <div className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Phân Tích Nhanh Bằng AI
            </h2>
            
            {/* <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dữ liệu mẫu để test:
              </label>
              <div className="flex flex-wrap gap-2">
                {sampleData.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSampleData(sample)}
                    className="px-3 py-1 text-xs bg-white border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    Mẫu {idx + 1}
                  </button>
                ))}
              </div>
            </div> */}

            <textarea
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ví dụ: 500g thịt bò, 2 củ hành tây, 3 cà chua, 200ml nước tương..."
              className="w-full p-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows="3"
            />
            
            <button
              onClick={parseAiInput}
              disabled={!aiInput.trim() || loading}
              className="mt-3 w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang phân tích...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Phân Tích Tự Động
                </>
              )}
            </button>
          </div>

          {/* Manual Input Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Nguyên Liệu</h2>
            
            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.ing_id} className="flex gap-2 items-start">
                  <span className="w-8 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  
                  {/* <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                    placeholder="Tên nguyên liệu"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  /> */}
                  <select
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.ing_id, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">-- Chọn nguyên liệu --</option>
                    {ingredientList.map(item => (
                      <option key={item.ing_id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                  
                  {/* <input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                    placeholder="SL"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  
                  <p

                    className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      unit
                  </p> */}
                  
                  <button
                    onClick={() => removeIngredient(ingredient.ing_id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={ingredients.length === 1}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addIngredient}
              className="mt-4 w-full border-2 border-dashed border-orange-300 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Thêm Nguyên Liệu
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={exportData}
              className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Copy className="w-5 h-5" />
              Sao Chép
            </button>
            
            <button
              onClick={getSuggestions}
              disabled={loadingSuggestions}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50"
            >
              {loadingSuggestions ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang tạo gợi ý...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5" />
                  Gợi Ý Món Ăn
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ChefHat className="text-orange-600" />
              Gợi Ý Món Ăn ({suggestions.length} món)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {suggestions.map((dish, index) => (
                <div  className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-orange-50">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{dish.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(dish.difficulty)}`}>
                      {dish.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{dish.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      ⏱️ {dish.cook_time}
                    </span>
                  </div>
                  
                  {dish.needIngredients && dish.needIngredients.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">Cần thêm:</p>
                      <div className="flex flex-wrap gap-1">
                        {dish.needIngredients.map((item, i) => (
                          <span  className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}