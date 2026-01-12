import PostCard from "../../../components/users/PostCard";

export default function Home() {
    return (
        <div className="flex flex-col items-center py-8 bg-slate-50 min-h-screen">         
            <PostCard /> 
            <PostCard />
            <PostCard />
        </div>
       
    );
}