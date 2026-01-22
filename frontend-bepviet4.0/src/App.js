import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './view/layout/Layout';
import LayoutAdmin from './view/layout/LayoutAdmin';
import CreateRecipe from './view/pages/user/CreateRecipe';
import CreateBlog from './view/pages/user/CreateBlog';
import Login from './view/pages/shares_pages/Login';
import Register from './view/pages/shares_pages/Register';
import NotFound from './view/pages/shares_pages/NotFound';
import Home from './view/pages/user/Home';
import RecipeDetail from './view/pages/user/RecipeDetail';
import BlogDetail from './view/pages/user/BlogDetail';  
import UserProfile from "./view/pages/user/UserProfile"
import UserInfo from './view/pages/user/UserInfo';
import CookbookDetail from "./view/pages/user/CookbookDetail";
//admin pages
import PostTable from './view/pages/admin/PostTable';
import Dashboad from './view/pages/admin/Dashboad';
import UserTable from './view/pages/admin/UserTable';
import CommentTable from './view/pages/admin/CommentTable';
import CategoryTable from './view/pages/admin/CategoryTable';
import IngredientTable from './view/pages/admin/IngredientTable';
import UserDetail from './view/pages/admin/UserDetail';
import PendingPosts from './view/pages/admin/PendingPosts';
import ReportTable from './view/pages/admin/ReportTable';

//import context 
import { MyAccountProvider } from './contexts/user/MyAccountContext';
import {ProtectedRoute} from './contexts/user/ProtectedRoute';
function App() {
  return (
    <>
  
      <BrowserRouter>
        <Routes>
          <Route element={<MyAccountProvider><Layout /></MyAccountProvider>}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create-blog' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>}></Route>
            <Route path='/create-recipe' element={<ProtectedRoute><CreateRecipe /></ProtectedRoute>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/not-found' element={<NotFound />}></Route>
            <Route path='/recipe-detail/:post_id' element={<RecipeDetail />}></Route>
            <Route path='/blog-detail/:id' element={<BlogDetail />}></Route>
            <Route path='/user-profile/my-account' element={<UserProfile/>}></Route>
            <Route path='/user-profile/:username' element={<UserProfile/>}></Route>
            <Route path='/my-info' element={<UserInfo/>}></Route>
            <Route path='/user-profile/:username/cookbook/:name' element={<CookbookDetail/>}></Route>
            <Route path='/update-blog/:id' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>}></Route>
          </Route>
          <Route element={<LayoutAdmin />}>
            <Route path='/admin' element={<Dashboad/>}></Route>
            <Route path='/admin/dashboard' element={<Dashboad/>}></Route>
            <Route path='/admin/post' element={<PostTable />}></Route>
            <Route path='/admin/pendingposts' element={<PendingPosts/>}></Route>
            <Route path='/admin/user' element={<UserTable />}></Route>
            <Route path='/admin/comment' element={<CommentTable />}></Route>
            <Route path='/admin/category' element={<CategoryTable />}></Route>
            <Route path='/admin/category/:id' element={<CategoryTable />}></Route>
            <Route path='/admin/ingredient' element={<IngredientTable />}></Route>
            <Route path='/admin/ingredient/:id' element={<IngredientTable />}></Route>
            <Route path='/admin/user/:user_id' element={<UserDetail />}></Route>
            <Route path='/admin/post/recipe-detail/:post_id' element={<MyAccountProvider><RecipeDetail /></MyAccountProvider>}></Route>
            <Route path='/admin/post/blog-detail/:id' element={<MyAccountProvider><BlogDetail /></MyAccountProvider>}></Route>
            <Route path='/admin/report' element={<ReportTable/>}></Route>
          </Route>
          
         
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
