import PostCard from "../../../components/users/PostCard";

export default function Home() {
    // Giả định danh sách bài viết từ database (MySQL)
const mockPosts = [
  {
    id: 101,
    user_id: 1, // Trùng với currentUser.id -> Mình là chủ bài này
    content: "Món bún chả tự làm nè mọi người!",
    type: "recipe"
  },
  {
    id: 102,
    user_id: 99, // Khác currentUser.id -> Mình là khách
    content: "Review quán phở ngon quận 1",
    type: "blog"
  }
];
    return (
        <div className="flex flex-col items-center py-8 bg-slate-50 min-h-screen">         
            {mockPosts && mockPosts.map((item) => (
                <PostCard 
                    key={item.id} 
                    postType={item.type} 
                    post={item} 
                />
            ))}
        </div>
       
    );
}