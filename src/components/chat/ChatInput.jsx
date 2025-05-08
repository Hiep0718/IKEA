"use client"

import { useState } from "react"
import { useChatContext } from "../../context/ChatContext"
import { SendOutlined, PaperClipOutlined, CloseOutlined, AppstoreOutlined } from "@ant-design/icons"
import CategorySuggestion from "./CategorySuggestion.jsx"

const ChatInput = () => {
    const [message, setMessage] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [showCategories, setShowCategories] = useState(false)
    const { sendMessage } = useChatContext()
    const [attachment, setAttachment] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim() || attachment) {
            sendMessage(message, attachment)
            setMessage("")
            setAttachment(null)
            setShowCategories(false)
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setAttachment({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
            })
        }
    }

    const removeAttachment = () => {
        setAttachment(null)
    }

    const toggleCategories = () => {
        setShowCategories(!showCategories)
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            {attachment && (
                <div className="mb-2 p-2 bg-gray-100 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={attachment.preview || "/placeholder.svg"}
                            alt="Attachment preview"
                            className="h-10 w-10 object-cover rounded mr-2"
                        />
                        <span className="text-sm truncate max-w-[150px]">{attachment.name}</span>
                    </div>
                    <button type="button" onClick={removeAttachment} className="text-gray-500 hover:text-gray-700">
                        <CloseOutlined style={{ fontSize: "16px" }} />
                    </button>
                </div>
            )}

            {showCategories && <CategorySuggestion />}

            <div className="flex items-center border rounded-full overflow-hidden bg-gray-50 pr-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1 p-2 outline-none bg-transparent"
                />

                <button
                    type="button"
                    onClick={toggleCategories}
                    className="text-gray-500 hover:text-[#0058a3] mx-1"
                    title="Xem danh mục sản phẩm"
                >
                    <AppstoreOutlined style={{ fontSize: "18px" }} />
                </button>

                <label className="cursor-pointer text-gray-500 hover:text-[#0058a3] mx-1">
                    <PaperClipOutlined style={{ fontSize: "18px" }} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>

                <button
                    type="submit"
                    className={`ml-1 p-1.5 rounded-full ${message.trim() || attachment ? "bg-[#0058a3] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    disabled={!message.trim() && !attachment}
                >
                    <SendOutlined style={{ fontSize: "16px" }} />
                </button>
            </div>

            {isTyping && (
                <div className="absolute -bottom-6 left-0 text-xs text-gray-500">Nhân viên tư vấn đang online...</div>
            )}
        </form>
    )
}

export default ChatInput
