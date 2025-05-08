// Import dữ liệu sản phẩm từ file products.json
import productsData from "../data/products.json"

// Lấy danh sách sản phẩm và danh mục
const { products, categories } = productsData

// Hàm lấy tên danh mục từ categoryId
const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Khác"
}

// Hàm định dạng giá tiền
const formatPrice = (price, currency) => {
    return `${currency}${price}`
}

// Hàm tìm phản hồi dựa trên từ khóa
const findResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    // Tìm kiếm trong danh mục
    const matchedCategories = categories.filter(
        (category) =>
            category.name.toLowerCase().includes(lowerMessage) || category.slug.toLowerCase().includes(lowerMessage),
    )

    // Nếu tìm thấy danh mục phù hợp
    if (matchedCategories.length > 0) {
        const category = matchedCategories[0]
        const categoryProducts = products.filter((product) => product.categoryId === category.id)

        // Sắp xếp theo đánh giá cao nhất
        const topProducts = [...categoryProducts].sort((a, b) => b.rating - a.rating).slice(0, 4)

        return {
            text: `Chúng tôi có nhiều sản phẩm ${category.name} chất lượng cao. Đây là một số sản phẩm nổi bật:`,
            products: topProducts,
        }
    }

    // Tìm kiếm trong tên sản phẩm, mô tả, màu sắc, chất liệu và tags
    const matchedProducts = products.filter((product) => {
        return (
            (product.name && product.name.toLowerCase().includes(lowerMessage)) ||
            (product.description && product.description.toLowerCase().includes(lowerMessage)) ||
            (product.color && product.color.toLowerCase().includes(lowerMessage)) ||
            (product.material && product.material.toLowerCase().includes(lowerMessage)) ||
            (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(lowerMessage)))
        )
    })

    // Nếu tìm thấy sản phẩm phù hợp
    if (matchedProducts.length > 0) {
        // Sắp xếp theo đánh giá cao nhất
        const topProducts = [...matchedProducts].sort((a, b) => b.rating - a.rating).slice(0, 4)

        // Nhóm sản phẩm theo loại
        const productTypes = [
            ...new Set(
                topProducts.map((p) => {
                    // Lấy loại sản phẩm từ tags hoặc từ tên
                    const type = p.tags && p.tags.length > 0 ? p.tags[0] : p.name.split(" ")[0].toLowerCase()
                    return type
                }),
            ),
        ]

        let responseText = ""
        if (productTypes.length === 1) {
            responseText = `Chúng tôi có một số ${productTypes[0]} phù hợp với yêu cầu của bạn:`
        } else {
            responseText = `Chúng tôi tìm thấy một số sản phẩm phù hợp với yêu cầu của bạn:`
        }

        return {
            text: responseText,
            products: topProducts,
        }
    }

    // Xử lý các từ khóa đặc biệt
    if (lowerMessage.includes("giảm giá") || lowerMessage.includes("khuyến mãi") || lowerMessage.includes("sale")) {
        const saleProducts = products.filter((product) => product.lastChance)
        const topSaleProducts = [...saleProducts].sort((a, b) => b.rating - a.rating).slice(0, 4)

        return {
            text: "Hiện tại chúng tôi đang có một số sản phẩm giảm giá và cơ hội cuối cùng:",
            products: topSaleProducts,
        }
    }

    if (lowerMessage.includes("bán chạy") || lowerMessage.includes("phổ biến") || lowerMessage.includes("best seller")) {
        const bestSellerProducts = products.filter((product) => product.bestSeller)
        const topBestSellers = [...bestSellerProducts].sort((a, b) => b.rating - a.rating).slice(0, 4)

        return {
            text: "Đây là những sản phẩm bán chạy nhất của chúng tôi:",
            products: topBestSellers,
        }
    }

    // Nếu không tìm thấy sản phẩm phù hợp
    return {
        text: "Cảm ơn câu hỏi của bạn. Tôi có thể giúp bạn tìm hiểu thêm về sản phẩm IKEA. Bạn quan tâm đến loại sản phẩm nào (phòng khách, phòng ngủ, nhà bếp...)?",
        products: [],
    }
}

// Mô phỏng độ trễ của API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const chatService = {
    sendMessage: async (message, attachment = null) => {
        // Mô phỏng độ trễ của API
        await delay(1000 + Math.random() * 1000)

        // Xử lý tin nhắn có hình ảnh
        if (attachment) {
            // Khi người dùng gửi hình ảnh, chúng ta có thể gợi ý một số sản phẩm ngẫu nhiên
            // Trong thực tế, bạn có thể sử dụng AI để phân tích hình ảnh và đề xuất sản phẩm phù hợp
            const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4)

            return {
                text: "Cảm ơn bạn đã gửi hình ảnh. Dựa vào hình ảnh, tôi nghĩ những sản phẩm sau đây có thể phù hợp với nhu cầu của bạn:",
                products: randomProducts,
            }
        }

        // Xử lý tin nhắn văn bản
        return findResponse(message)
    },

    // Hàm lấy sản phẩm nổi bật để gợi ý
    getFeaturedProducts: () => {
        // Lấy sản phẩm bán chạy có đánh giá cao
        const featuredProducts = products
            .filter((product) => product.bestSeller && product.rating >= 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4)

        return featuredProducts
    },

    // Hàm lấy sản phẩm theo danh mục
    getProductsByCategory: (categoryId) => {
        return products
            .filter((product) => product.categoryId === categoryId)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8)
    },

    // Hàm lấy danh sách danh mục
    getCategories: () => {
        return categories
    },
}
