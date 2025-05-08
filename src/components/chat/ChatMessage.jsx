"use client"

import { useState } from "react"
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons"

const ChatMessage = ({ message }) => {
    const [feedback, setFeedback] = useState(null)

    const handleFeedback = (type) => {
        setFeedback(type)
        // Ở đây bạn có thể gửi feedback về server
    }

    // Hàm xử lý khi người dùng nhấp vào sản phẩm
    const handleProductClick = (product) => {
        // Dispatch một event để App.jsx xử lý
        const event = new CustomEvent("navigate", {
            detail: { page: "product", params: { productId: product.id } },
        })
        window.dispatchEvent(event)
    }

    // Hàm định dạng giá tiền
    const formatPrice = (price, currency) => {
        return `${currency || "$"}${price}`
    }

    return (
        <div className={`mb-4 ${message.isBot ? "" : "flex justify-end"}`}>
            <div
                className={`max-w-[80%] p-3 rounded-lg ${message.isBot ? "bg-gray-100 text-gray-800 rounded-tl-none" : "bg-[#0058a3] text-white rounded-tr-none"
                    }`}
            >
                <p>{message.text}</p>

                {message.isBot && message.text.length > 10 && !feedback && (
                    <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
                        <span className="mr-2">Phản hồi hữu ích?</span>
                        <button onClick={() => handleFeedback("positive")} className="p-1 hover:bg-gray-200 rounded-full">
                            <LikeOutlined style={{ fontSize: "14px" }} />
                        </button>
                        <button onClick={() => handleFeedback("negative")} className="p-1 hover:bg-gray-200 rounded-full ml-1">
                            <DislikeOutlined style={{ fontSize: "14px" }} />
                        </button>
                    </div>
                )}

                {feedback && (
                    <div className="mt-2 text-xs text-gray-500 text-right">
                        {feedback === "positive" ? "Cảm ơn phản hồi của bạn!" : "Cảm ơn, chúng tôi sẽ cải thiện!"}
                    </div>
                )}

                {message.products && message.products.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        {message.products.map((product, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-2 rounded border hover:shadow-md cursor-pointer transition-all"
                                onClick={() => handleProductClick(product)}
                            >
                                <div className="relative pb-[100%] mb-2">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs font-medium truncate">{product.name}</p>
                                    <p className="text-xs text-gray-600 truncate">{product.description}</p>
                                    <p className="text-xs text-[#0058a3] font-bold mt-1">
                                        {formatPrice(product.price, product.currency)}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <span className="text-xs text-yellow-500">★ {product.rating}</span>
                                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                                        {product.bestSeller && (
                                            <span className="ml-auto text-[9px] bg-yellow-100 text-yellow-800 px-1 rounded">Bán chạy</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatMessage
