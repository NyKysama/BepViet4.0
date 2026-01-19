import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from '../../../components/users/card/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const pageRef = useRef(1);// dùng để lưu xem page đang ở page nào, 
    const isFetchingRef = useRef(false); // dùng để đảm bảo chỉ đang gọi 1 api tránh nhảy api
    const [seed] = useState(Math.floor(Math.random() * 1000000));

    const fetchPosts = useCallback(async () => {
        // Nếu đang tải bài hoặc hết bài thì không làm gì cả
        if (isFetchingRef.current || !hasMore) return;
        
        isFetchingRef.current = true; // Khóa lại ngay lập tức
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token'); //gọi token nếu cần
            // console.log("📡 Đang lấy dữ liệu trang:", pageRef.current);
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
                    const existingIds = new Set(prev.map(p => p.post_id)); // lấy id của ds hiển thi để lọc
                    const uniqueNewPosts = data.data.filter(p => !existingIds.has(p.post_id));// lọc xem ds thêm vào có id bị trùng hay ko
                    return [...prev, ...uniqueNewPosts]; // cập nhật ds vào state hiển thị
                });

                if (!data.next_page_url) {
                    setHasMore(false);
                } else {
                    pageRef.current += 1; // Chỉ tăng page sau khi lấy xong dữ liệu thành công
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Lỗi fetch feed:", error);
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false; // Mở khóa sau khi hoàn tất
        }
    }, [seed, hasMore]); 
    const observer = useRef(); //lưu lại các post trg page
    const lastPostElementRef = useCallback(node => { // 
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();// bỏ qua post của page củ để lưu tiếp post của page ms

        observer.current = new IntersectionObserver(entries => {//tạo định vị cho post cuối của page mới
            if (entries[0].isIntersecting && hasMore) {
                fetchPosts();
            }
        }, {
            threshold: 0.5, // khi lướt đến 50% màn hình dl post ms bắt đầu tải để tránh lúc đầu load lâu
            rootMargin: '200px' // lấy dl tiếp theo trc khi đến post cuối đã đc dánh dấu
        });

        if (node) observer.current.observe(node); // cho hàm biết đã tới post cuối hay ch
    }, [isLoading, hasMore, fetchPosts]);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-2xl mx-auto py-6 space-y-6">
            <h2 className="text-xl font-bold px-4">Bảng tin dành cho bạn</h2>

            {posts.map((post, index) => {
                // Tạo key duy nhất bằng cách kết hợp ID và index (an toàn tuyệt đối)
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

            {/* Loading indicator */}
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