import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ star_value,onSelect }) {
  const [rating, setRating] = useState(star_value); // Sao đã chọn
  const [hover, setHover] = useState(0);   // Sao đang di chuột qua
  useEffect(()=>{
    console.log(star_value)
    setRating(star_value)}
  )

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="transition-transform hover:scale-110"
          onClick={() => {
            setRating(star);
            onSelect(star); // Gửi số sao về cho trang chi tiết
          }}
          
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            size={32}
            className={`${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } transition-colors cursor-pointer`}
          />
        </button>
      ))}
    </div>
  );
}