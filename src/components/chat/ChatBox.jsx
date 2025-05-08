"use client"

import { useState, useEffect, useRef } from "react"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import { useChatContext } from "../../context/ChatContext"
import { CloseOutlined, MinusOutlined, ExpandOutlined } from "@ant-design/icons"

const ChatBox = () => {
    const { messages, isOpen, toggleChat, minimizeChat, isMinimized } = useChatContext()
    const messagesEndRef = useRef(null)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    if (!isOpen) return null

    return (
        <div
            className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg flex flex-col z-50 transition-all duration-300 ${isMinimized ? "h-12 w-72" : isExpanded ? "h-[80vh] w-[400px]" : "h-[500px] w-[350px]"
                }`}
            style={{ border: "1px solid #E0E0E0" }}
        >
            {/* Header */}
            <div className="bg-[#0058a3] text-white p-3 rounded-t-lg flex justify-between items-center">
                <h3 className="font-medium">Tư vấn sản phẩm IKEA</h3>
                <div className="flex items-center space-x-2">
                    {!isMinimized && (
                        <button onClick={toggleExpand} className="text-white hover:text-gray-200">
                            <ExpandOutlined style={{ fontSize: "16px" }} />
                        </button>
                    )}
                    <button onClick={minimizeChat} className="text-white hover:text-gray-200">
                        <MinusOutlined style={{ fontSize: "16px" }} />
                    </button>
                    <button onClick={toggleChat} className="text-white hover:text-gray-200">
                        <CloseOutlined style={{ fontSize: "16px" }} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
                <>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((message, index) => (
                            <ChatMessage key={index} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t">
                        <ChatInput />
                    </div>
                </>
            )}
        </div>
    )
}

export default ChatBox
