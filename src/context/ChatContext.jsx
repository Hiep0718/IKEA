"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { chatService } from "../services/chatService"

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const [categories, setCategories] = useState([])

    // Lấy danh sách danh mục
    useEffect(() => {
        setCategories(chatService.getCategories())
    }, [])

    // Lắng nghe sự kiện điều hướng từ ChatMessage
    useEffect(() => {
        const handleNavigation = (event) => {
            console.log("Navigation event:", event.detail)
        }

        window.addEventListener("navigate", handleNavigation)
        return () => window.removeEventListener("navigate", handleNavigation)
    }, [])

    // Khởi tạo chat với tin nhắn chào mừng
    useEffect(() => {
        const welcomeMessage = {
            text: "Xin chào! Tôi là trợ lý ảo của IKEA. Tôi có thể giúp gì cho bạn về sản phẩm của chúng tôi?",
            isBot: true,
            timestamp: new Date(),
        }

        // Lấy sản phẩm nổi bật để gợi ý
        const featuredProducts = chatService.getFeaturedProducts()

        setMessages([
            welcomeMessage,
            {
                text: "Đây là một số sản phẩm nổi bật của chúng tôi:",
                isBot: true,
                timestamp: new Date(),
                products: featuredProducts,
            },
        ])
    }, [])

    // Tăng số tin nhắn chưa đọc khi có tin nhắn mới và chat đang đóng
    useEffect(() => {
        if (!isOpen && messages.length > 0 && messages[messages.length - 1].isBot) {
            setUnreadCount((prev) => prev + 1)
        }
    }, [messages, isOpen])

    const toggleChat = useCallback(() => {
        setIsOpen((prev) => !prev)
        if (!isOpen) {
            setIsMinimized(false)
            setUnreadCount(0)
        }
    }, [isOpen])

    const minimizeChat = useCallback(() => {
        setIsMinimized((prev) => !prev)
    }, [])

    const sendMessage = useCallback(async (text, attachment = null) => {
        // Thêm tin nhắn của người dùng vào danh sách
        const userMessage = {
            text,
            isBot: false,
            timestamp: new Date(),
            attachment: attachment
                ? {
                    url: attachment.preview,
                    name: attachment.name,
                }
                : null,
        }

        setMessages((prev) => [...prev, userMessage])

        try {
            // Hiển thị trạng thái "đang nhập"
            setMessages((prev) => [...prev, { isBot: true, isTyping: true, text: "..." }])

            // Gọi API để lấy phản hồi
            const response = await chatService.sendMessage(text, attachment)

            // Xóa tin nhắn "đang nhập"
            setMessages((prev) => prev.filter((msg) => !msg.isTyping))

            // Thêm phản hồi từ bot
            setMessages((prev) => [
                ...prev,
                {
                    text: response.text,
                    isBot: true,
                    timestamp: new Date(),
                    products: response.products || [],
                },
            ])
        } catch (error) {
            console.error("Error sending message:", error)

            // Xóa tin nhắn "đang nhập"
            setMessages((prev) => prev.filter((msg) => !msg.isTyping))

            // Thêm tin nhắn lỗi
            setMessages((prev) => [
                ...prev,
                {
                    text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
                    isBot: true,
                    timestamp: new Date(),
                    isError: true,
                },
            ])
        }
    }, [])

    // Hàm gợi ý danh mục
    const suggestCategories = useCallback(() => {
        if (categories.length > 0) {
            setMessages((prev) => [
                ...prev,
                {
                    text: "Bạn có thể tìm kiếm sản phẩm theo các danh mục sau:",
                    isBot: true,
                    timestamp: new Date(),
                    categories: categories,
                },
            ])
        }
    }, [categories])

    const value = {
        messages,
        isOpen,
        isMinimized,
        unreadCount,
        categories,
        toggleChat,
        minimizeChat,
        sendMessage,
        suggestCategories,
    }

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChatContext = () => {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider")
    }
    return context
}
