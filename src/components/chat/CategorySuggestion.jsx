"use client"

import { useChatContext } from "../../context/ChatContext"

const CategorySuggestion = () => {
    const { categories, sendMessage } = useChatContext()

    const handleCategoryClick = (category) => {
        sendMessage(`Tôi muốn tìm sản phẩm ${category.name}`)
    }

    if (!categories || categories.length === 0) return null

    return (
        <div className="mt-4">
            <p className="text-sm font-medium mb-2">Danh mục sản phẩm:</p>
            <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((category) => (
                    <div
                        key={category.id}
                        className="bg-white border rounded p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="flex items-center">
                            <div className="w-8 h-8 mr-2 overflow-hidden rounded">
                                <img
                                    src={category.image || "/placeholder.svg"}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs">{category.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorySuggestion
