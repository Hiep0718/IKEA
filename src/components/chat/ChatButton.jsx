"use client"

import { MessageOutlined } from "@ant-design/icons"
import { useChatContext } from "../../context/ChatContext"

const ChatButton = () => {
    const { toggleChat, isOpen, unreadCount } = useChatContext()

    return (
        <button
            onClick={toggleChat}
            className="fixed bottom-4 right-4 bg-[#0058a3] text-white p-3 rounded-full shadow-lg hover:bg-[#004f93] transition-all z-40"
            aria-label="Mở hộp chat tư vấn"
        >
            <div className="relative">
                <MessageOutlined style={{ fontSize: "24px" }} />

                {!isOpen && unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount}
                    </div>
                )}
            </div>
        </button>
    )
}

export default ChatButton
