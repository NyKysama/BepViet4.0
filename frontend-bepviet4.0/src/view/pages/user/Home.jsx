
import { useState,useEffect } from "react";
import PostCard from "../../../components/users/card/PostCard";


export default function Home() {
    // Giả định danh sách bài viết từ database (MySQL)
const [posts,setPosts]=useState([])
useEffect(()=>{
fetch("http://127.0.0.1:8000/api/posts")
.then(res=>res.json())
.then(data=>{
    console.log(data)
    setPosts(data.posts)
})
},[])
    return (
        <div className="flex flex-col items-center py-8 bg-slate-50 min-h-screen">         
            {posts && posts.map(    post => (
                
                <PostCard 
                    card_data={post}
                    key={post.post_id} 
                    // postType={item.type} 
                    // post={item} 
                />
            ))}
        </div>
       
    );
}