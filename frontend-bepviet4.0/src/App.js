import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './view/layout/Layout';
import LayoutAdmin from './view/layout/LayoutAdmin';
import CreateRecipe from './view/pages/user/CreateRecipe';
import CreateBlog from './view/pages/user/CreateBlog';
import Login from './view/pages/user/Login';
import Register from './view/pages/user/Register';
import NotFound from './view/pages/user/NotFound';
import Home from './view/pages/user/Home';
import RecipeDetail from './view/pages/user/RecipeDetail';

const recipeData ={
  "post": {
    "post_id": "P001",
    "img": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    "title": "Bún Chả Hà Nội - Hương Vị Phố Cổ",
    "description": "Cách làm bún chả Hà Nội chuẩn vị với miếng chả nướng vàng ruộm, nước chấm chua ngọt hài hòa và hương thơm của kẹo đắng tự nhiên.",
    "type": "Món Chính",
    "cook_time": "60 phút",
    "user_id": "Admin Bếp Việt",
    "slug": "bun-cha-ha-noi-huong-vi-pho-co",
    "difficulty": "Trung bình",
    "region": "Miền Bắc",
    "status": "published"
  },
  "ingredients": [
    { "post_id": "P001", "ing_id": "Thịt ba chỉ", "amount": 500, "unit": "g" },
    { "post_id": "P001", "ing_id": "Thịt nạc vai xay", "amount": 300, "unit": "g" },
    { "post_id": "P001", "ing_id": "Đu đủ xanh", "amount": 1/2, "unit": "quả" },
    { "post_id": "P001", "ing_id": "Nước mắm ngon", "amount": 100, "unit": "ml" },
    { "post_id": "P001", "ing_id": "Hành tím, tỏi, ớt", "amount": 50, "unit": "g" }
  ],
  "steps": [
    {
      "step_id": "S1",
      "post_id": "P001",
      "steps": 1,
      "content": "Sơ chế thịt: Thịt ba chỉ thái miếng mỏng vừa ăn. Thịt nạc vai xay nhuyễn. Ướp cả hai loại thịt với hành băm, nước mắm, đường, và nước màu trong 30 phút.",
      "img": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
      "step_id": "S2",
      "post_id": "P001",
      "steps": 2,
      "content": "Làm dưa góp: Đu đủ, cà rốt gọt vỏ, thái miếng mỏng. Trộn với muối, đường, dấm và tỏi ớt băm để tạo độ giòn, chua ngọt.",
      "img": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
    },
    {
      "step_id": "S3",
      "post_id": "P001",
      "steps": 3,
      "content": "Nướng chả: Kẹp thịt vào vỉ hoặc xiên tre. Nướng trên than hoa cho đến khi thịt vàng đều hai mặt và có mùi thơm đặc trưng.",
      "img": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80"
    }
  ]
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create-blog' element={<CreateBlog />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/not-found' element={<NotFound />}></Route>
            <Route path='/recipe' element={<RecipeDetail post={recipeData.post} ingredients={recipeData.ingredients} steps={recipeData.steps} />}></Route>
          </Route>
          <Route path='/ad' element={<LayoutAdmin />}> </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
