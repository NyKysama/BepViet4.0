import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from '../../../components/users/card/PostCard';
import { Search } from 'lucide-react'; // Nếu bạn dùng lucide-react, nếu không có hãy thay bằng icon khác hoặc chữ

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State cho ô tìm kiếm

    const pageRef = useRef(1);
    const isFetchingRef = useRef(false);
    const [seed] = useState(Math.floor(Math.random() * 1000000));

    // Hàm xử lý tìm kiếm
    const handleSearch = async(e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/post/serch`,
                {
                    method:'POST',
                    headers:{
                           'Content-Type': 'application/json', // Bắt buộc để Laravel hiểu đây là JSON
                            'Accept': 'application/json',
                    },
                    body:JSON.stringify({
                        searchQuery:searchQuery
                    })
                }
            )
            const data=await response.json()
            setPosts(data.posts)
            console.log(data);
        } catch (error) {
            
        }
        console.log("Đang tìm kiếm công thức:", searchQuery);
    };

    const fetchPosts = useCallback(async () => {
        if (isFetchingRef.current || !hasMore) return;
        
        isFetchingRef.current = true;
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://127.0.0.1:8000/api/news-feeds?page=${pageRef.current}&seed=${seed}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }
            );
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                setPosts(prev => {
                    const existingIds = new Set(prev.map(p => p.post_id));
                    const uniqueNewPosts = data.data.filter(p => !existingIds.has(p.post_id));
                    return [...prev, ...uniqueNewPosts];
                });

                if (!data.next_page_url) {
                    setHasMore(false);
                } else {
                    pageRef.current += 1;
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Lỗi fetch feed:", error);
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    }, [seed, hasMore]);

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchPosts();
            }
        }, {
            threshold: 0.5,
            rootMargin: '200px'
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, fetchPosts]);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-2xl mx-auto py-6 space-y-6">
            {/* THANH TÌM KIẾM MỚI THÊM */}
            <div className="bg-white p-4 rounded-xl shadow-sm mx-4">
                <form onSubmit={handleSearch} className="relative flex items-center gap-2">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Tìm kiếm công thức món ăn..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={20} />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm active:scale-95"
                    >
                        Tìm
                    </button>
                </form>
            </div>

            <h2 className="text-xl font-bold px-4">Bảng tin dành cho bạn</h2>

            {posts.map((post, index) => {
                const uniqueKey = `post-${post.post_id}-${index}`;

                if (posts.length === index + 1) {
                    return (
                        <div ref={lastPostElementRef} key={uniqueKey}>
                            <PostCard post={post} card_data={post} />
                        </div>
                    );
                } else {
                    return <PostCard key={uniqueKey} post={post} card_data={post} />;
                }
            })}

            <div className="py-10 text-center">
                {isLoading && (
                    <div className="inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                )}
                {!hasMore && (
                    <p className="text-slate-400 text-sm italic">Bạn đã xem hết tất cả bài viết hôm nay!</p>
                )}
            </div>
        </div>
    );
}
