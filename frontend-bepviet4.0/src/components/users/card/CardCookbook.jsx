import { useState } from "react"

export default function CardCookbook({ cookbook }) {
    return (
        <>
            <div
                key={cookbook.id}
                className="flex-shrink-0 w-40 md:w-56 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden group"
            >
                <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                        src={cookbook.image}
                        alt={cookbook.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                </div>
                <div className="p-3">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1 line-clamp-2 group-hover:text-orange-500 transition">
                        {cookbook.title}
                    </h3>
                    <p className="text-xs text-gray-500">{cookbook.count} công thức</p>
                </div>
            </div>
        </>
    )
}