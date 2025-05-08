"use client"

import { useEffect } from "react"
import ChatBox from "./chat/ChatBox"
import ChatButton from "./chat/ChatButton"

const ChatWidget = () => {
    // Theo dõi sự kiện khi người dùng ở lâu trên trang
    useEffect(() => {
        const timer = setTimeout(() => {
            // Hiển thị gợi ý chat sau 30 giây
            const chatSuggestion = document.getElementById("chat-suggestion")
            if (chatSuggestion) {
                chatSuggestion.classList.remove("hidden")

                // Ẩn gợi ý sau 5 giây
                setTimeout(() => {
                    chatSuggestion.classList.add("hidden")
                }, 5000)
            }
        }, 30000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <ChatButton />
            <ChatBox />

            {/* Gợi ý chat */}
            <div
                id="chat-suggestion"
                className="hidden fixed bottom-20 right-4 bg-white p-3 rounded-lg shadow-lg z-40 max-w-xs animate-bounce"
                style={{ border: "1px solid #E0E0E0" }}
            >
                <p className="text-sm">Bạn cần tư vấn về sản phẩm IKEA? Chat với chúng tôi ngay!</p>
            </div>
        </>
    )
}

export default ChatWidget
