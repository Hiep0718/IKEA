// Import dữ liệu sản phẩm từ file products.json
import productsData from "../data/products.json"

// Lấy danh sách sản phẩm và danh mục
const { products, categories } = productsData

// Các từ khóa tìm kiếm phổ biến và đồng nghĩa
const keywordMap = {
    // Từ khóa về giá cả
    "giá rẻ": ["giá rẻ", "rẻ", "tiết kiệm", "giá tốt", "phải chăng", "hợp lý", "kinh tế"],
    "giá cao": ["giá cao", "cao cấp", "sang trọng", "đắt", "premium", "chất lượng cao"],
    "giảm giá": ["giảm giá", "khuyến mãi", "sale", "ưu đãi", "giảm", "discount"],

    // Từ khóa về chất lượng
    "chất lượng cao": ["chất lượng cao", "tốt", "bền", "chắc chắn", "cao cấp", "premium"],
    bền: ["bền", "chắc chắn", "lâu", "dài lâu", "không hỏng"],

    // Từ khóa về kích thước
    nhỏ: ["nhỏ", "gọn", "nhỏ gọn", "tiết kiệm không gian", "mini"],
    lớn: ["lớn", "rộng", "to", "rộng rãi", "không gian lớn"],

    // Từ khóa về màu sắc
    "màu trắng": ["trắng", "màu trắng", "white", "sáng"],
    "màu đen": ["đen", "màu đen", "black", "tối"],
    "màu xám": ["xám", "màu xám", "gray", "grey"],
    "màu nâu": ["nâu", "màu nâu", "brown"],
    "màu be": ["be", "màu be", "beige", "kem"],
    "màu xanh lá": ["xanh lá", "màu xanh lá", "green"],
    "màu xanh dương": ["xanh dương", "màu xanh dương", "blue"],
    "màu hồng": ["hồng", "màu hồng", "pink"],
    "màu đỏ": ["đỏ", "màu đỏ", "red"],
    "màu vàng": ["vàng", "màu vàng", "yellow"],
    "màu cam": ["cam", "màu cam", "orange"],
    "màu tím": ["tím", "màu tím", "purple"],

    // Từ khóa về chất liệu
    gỗ: ["gỗ", "wood", "wooden", "gỗ tự nhiên", "gỗ sồi", "gỗ thông", "gỗ óc chó", "gỗ veneer"],
    "kim loại": ["kim loại", "metal", "sắt", "thép", "nhôm", "inox", "đồng", "chrome"],
    vải: ["vải", "fabric", "textile", "nỉ", "cotton", "len", "vải bọc", "vải dệt", "polyester"],
    da: ["da", "leather", "giả da", "bọc da", "da tổng hợp", "da thật"],
    nhựa: ["nhựa", "plastic", "nhựa tổng hợp", "acrylic", "nhựa PP", "nhựa PVC"],
    kính: ["kính", "glass", "gương", "thủy tinh", "crystal"],
    mây: ["mây", "tre", "rattan", "bamboo", "mây tre đan"],
    đá: ["đá", "stone", "đá cẩm thạch", "đá granite", "marble"],

    // Từ khóa về phòng
    "phòng khách": ["phòng khách", "living room", "khách", "tiếp khách"],
    "phòng ngủ": ["phòng ngủ", "bedroom", "ngủ", "nghỉ ngơi"],
    "nhà bếp": ["nhà bếp", "bếp", "kitchen", "nấu ăn"],
    "phòng tắm": ["phòng tắm", "bathroom", "tắm", "vệ sinh", "toilet", "nhà vệ sinh"],
    "văn phòng": ["văn phòng", "office", "làm việc", "học tập", "study room"],
    "phòng trẻ em": ["phòng trẻ em", "children", "trẻ em", "kids", "em bé", "bé", "phòng cho bé"],
    "ban công": ["ban công", "balcony", "sân thượng", "ngoài trời", "outdoor"],
    "phòng ăn": ["phòng ăn", "dining room", "ăn uống", "bàn ăn"],
    "hành lang": ["hành lang", "corridor", "lối đi", "hallway"],
    "phòng giặt": ["phòng giặt", "laundry", "giặt ủi", "giặt đồ"],

    // Từ khóa về đồ nội thất và vật dụng
    "ghế sofa": ["ghế sofa", "sofa", "ghế dài", "đi văng", "couch", "ghế băng"],
    "ghế đơn": ["ghế đơn", "ghế bành", "armchair", "ghế tựa", "ghế một chỗ"],
    "ghế văn phòng": ["ghế văn phòng", "ghế làm việc", "ghế xoay", "office chair", "ghế máy tính"],
    "ghế ăn": ["ghế ăn", "dining chair", "ghế bàn ăn"],
    "bàn cà phê": ["bàn cà phê", "bàn trà", "coffee table", "bàn phòng khách"],
    "bàn ăn": ["bàn ăn", "dining table", "bàn phòng ăn"],
    "bàn làm việc": ["bàn làm việc", "bàn học", "desk", "bàn văn phòng", "bàn máy tính"],
    "bàn bên": ["bàn bên", "bàn phụ", "side table", "bàn đầu giường", "bàn góc"],

    // Từ khóa về giường và phụ kiện giường
    giường: ["giường", "bed", "giường ngủ", "giường đôi", "giường đơn", "bed frame"],
    "giường đôi": ["giường đôi", "giường cỡ đôi", "double bed", "full bed", "queen bed", "king bed"],
    "giường đơn": ["giường đơn", "giường cỡ đơn", "single bed", "twin bed"],
    "giường có ngăn chứa": ["giường có ngăn chứa", "giường có hộc kéo", "storage bed", "bed with storage"],
    "giường tầng": ["giường tầng", "bunk bed", "giường hai tầng"],
    "giường gấp": ["giường gấp", "folding bed", "giường xếp"],
    "giường sofa": ["giường sofa", "sofa bed", "giường kết hợp sofa"],
    "giường trẻ em": ["giường trẻ em", "giường cho bé", "children bed", "kids bed"],
    "khung giường": ["khung giường", "bed frame", "frame"],
    "đầu giường": ["đầu giường", "headboard", "tấm đầu giường"],
    "chân giường": ["chân giường", "bed legs", "chân đế giường"],

    "tủ quần áo": ["tủ quần áo", "wardrobe", "tủ đựng quần áo", "tủ áo", "closet"],
    "tủ ngăn kéo": ["tủ ngăn kéo", "chest of drawers", "tủ kéo", "drawer"],
    "tủ bếp": ["tủ bếp", "kitchen cabinet", "tủ đựng đồ bếp"],
    "kệ sách": ["kệ sách", "bookshelf", "giá sách", "tủ sách", "bookcase"],
    "kệ treo tường": ["kệ treo tường", "wall shelf", "giá treo tường", "kệ tường"],
    đèn: ["đèn", "lamp", "đèn bàn", "đèn sàn", "đèn trần", "đèn treo", "lighting"],
    thảm: ["thảm", "rug", "carpet", "thảm trải sàn"],
    gương: ["gương", "mirror", "gương soi", "gương treo tường"],
    "rèm cửa": ["rèm cửa", "curtain", "màn cửa", "rèm", "màn"],
    nệm: ["nệm", "đệm", "mattress", "nệm giường", "đệm giường"],
    gối: ["gối", "pillow", "gối tựa", "gối ôm", "cushion"],
    chăn: ["chăn", "mền", "blanket", "chăn mền", "chăn đắp"],
    "ga giường": ["ga giường", "bed sheet", "ga trải giường", "sheet"],
    "bát đĩa": ["bát đĩa", "chén đĩa", "dishes", "bát", "đĩa", "chén"],
    "dao kéo": ["dao kéo", "cutlery", "dao", "kéo", "thìa", "dĩa", "muỗng", "nĩa"],
    "nồi chảo": ["nồi chảo", "pots and pans", "nồi", "chảo", "cookware"],
    "lọ hoa": ["lọ hoa", "bình hoa", "vase", "bình cắm hoa"],
    "khung ảnh": ["khung ảnh", "frame", "khung hình", "picture frame"],
    "đồng hồ": ["đồng hồ", "clock", "đồng hồ treo tường"],
    "hộp đựng": ["hộp đựng", "storage box", "hộp", "box", "thùng đựng đồ"],
    "giỏ đựng": ["giỏ đựng", "basket", "giỏ", "rổ"],
    "móc treo": ["móc treo", "hook", "móc", "móc quần áo"],
    "kệ giày": ["kệ giày", "shoe rack", "tủ giày", "giá để giày"],
    "bàn trang điểm": ["bàn trang điểm", "dressing table", "bàn makeup", "bàn phấn"],
    "tủ tivi": ["tủ tivi", "tv stand", "kệ tivi", "tủ kệ tivi"],
    "bàn console": ["bàn console", "console table", "bàn trang trí"],
    "ghế đẩu": ["ghế đẩu", "stool", "ghế không tựa", "ghế ngắn"],
    "ghế dài": ["ghế dài", "bench", "ghế băng dài"],
    "tủ lạnh": ["tủ lạnh", "refrigerator", "fridge"],
    "máy giặt": ["máy giặt", "washing machine"],
    "lò vi sóng": ["lò vi sóng", "microwave"],
    bếp: ["bếp", "stove", "bếp ga", "bếp điện", "bếp từ"],
    "máy hút mùi": ["máy hút mùi", "hood", "máy hút khói"],
    "máy rửa bát": ["máy rửa bát", "dishwasher"],
    "bồn rửa": ["bồn rửa", "sink", "chậu rửa"],
    "vòi nước": ["vòi nước", "faucet", "vòi", "vòi rửa"],
    "bồn tắm": ["bồn tắm", "bathtub", "bồn", "bồn tắm nằm"],
    "vòi sen": ["vòi sen", "shower", "vòi tắm", "sen tắm"],
    "bồn cầu": ["bồn cầu", "toilet", "toilet bowl"],
    "tủ lavabo": ["tủ lavabo", "vanity", "tủ chậu rửa", "tủ phòng tắm"],

    // Từ khóa về mục đích sử dụng
    "lưu trữ": ["lưu trữ", "storage", "cất đồ", "để đồ", "đựng đồ", "chứa đồ", "sắp xếp"],
    "trang trí": ["trang trí", "decoration", "decor", "làm đẹp", "trang hoàng", "trang trí nhà"],
    ngồi: ["ngồi", "seating", "ghế", "chỗ ngồi"],
    ngủ: ["ngủ", "sleeping", "giường", "nệm", "đệm", "nghỉ ngơi"],
    "ăn uống": ["ăn uống", "dining", "ăn", "bàn ăn", "bữa ăn"],
    "làm việc": ["làm việc", "working", "học tập", "study", "desk", "bàn làm việc"],
    "nấu nướng": ["nấu nướng", "cooking", "nấu ăn", "chế biến", "bếp núc"],
    "giặt giũ": ["giặt giũ", "washing", "giặt đồ", "giặt ủi"],
    "tắm rửa": ["tắm rửa", "bathing", "tắm", "vệ sinh cá nhân"],
    "thư giãn": ["thư giãn", "relaxing", "nghỉ ngơi", "giải trí", "entertainment"],

    // Từ khóa về đối tượng sử dụng
    "trẻ em": ["trẻ em", "children", "kids", "bé", "em bé", "nhỏ"],
    "người lớn": ["người lớn", "adults", "adult"],
    "gia đình": ["gia đình", "family", "cả nhà", "hộ gia đình"],
    "người cao tuổi": ["người cao tuổi", "elderly", "già", "cao tuổi", "senior"],
    "sinh viên": ["sinh viên", "student", "học sinh", "người đi học"],
    "doanh nhân": ["doanh nhân", "business", "người làm việc", "nhân viên văn phòng"],

    // Từ khóa về phong cách
    "hiện đại": ["hiện đại", "modern", "contemporary", "tối giản"],
    "cổ điển": ["cổ điển", "classic", "truyền thống", "vintage", "retro"],
    "tối giản": ["tối giản", "minimalist", "đơn giản", "simple"],
    "sang trọng": ["sang trọng", "luxury", "luxurious", "cao cấp", "đẳng cấp"],
    "công nghiệp": ["công nghiệp", "industrial", "nhà máy", "xưởng", "loft"],
    "Bắc Âu": ["Bắc Âu", "Scandinavian", "Nordic", "Scandi"],
    "mộc mạc": ["mộc mạc", "rustic", "đồng quê", "country", "làng quê"],
    "ven biển": ["ven biển", "coastal", "biển", "hải dương", "beach"],
    Bohemian: ["Bohemian", "Boho", "tự do", "phóng khoáng"],
    "Á Đông": ["Á Đông", "Asian", "Đông Phương", "Oriental"],

    // Từ khóa về sản phẩm bán chạy
    "bán chạy": ["bán chạy", "phổ biến", "best seller", "hot", "được ưa chuộng", "yêu thích"],
    mới: ["mới", "new", "mới ra mắt", "sản phẩm mới"],
    "đánh giá cao": ["đánh giá cao", "review tốt", "rating cao", "được đánh giá tốt"],
}

// Hàm lấy tên danh mục từ categoryId
const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Khác"
}

// Hàm định dạng giá tiền
const formatPrice = (price, currency) => {
    return `${currency}${price}`
}

// Hàm phân tích yêu cầu của khách hàng
const analyzeRequest = (message) => {
    const lowerMessage = message.toLowerCase().trim()
    const result = {
        keywords: [],
        priceRange: null,
        colors: [],
        materials: [],
        categories: [],
        purposes: [],
        styles: [],
        sizes: [],
        qualities: [],
        furnitureTypes: [], // Thêm mảng lưu loại đồ nội thất
        bedTypes: [], // Thêm mảng lưu loại giường
        isComparison: false,
        isRecommendation: false,
        isBestSeller: false,
        isNewProduct: false,
        isDiscount: false,
        isMultipleSearch: false, // Thêm flag cho tìm kiếm nhiều sản phẩm
        rawQuery: lowerMessage, // Lưu trữ truy vấn gốc
    }

    // Kiểm tra xem có phải là yêu cầu so sánh không
    if (
        lowerMessage.includes("so sánh") ||
        lowerMessage.includes("khác nhau") ||
        lowerMessage.includes("khác biệt") ||
        lowerMessage.includes("đối chiếu") ||
        lowerMessage.includes("nên chọn") ||
        lowerMessage.includes("hay hơn") ||
        lowerMessage.includes("tốt hơn")
    ) {
        result.isComparison = true
    }

    // Kiểm tra xem có phải là yêu cầu gợi ý không
    if (
        lowerMessage.includes("gợi ý") ||
        lowerMessage.includes("đề xuất") ||
        lowerMessage.includes("recommend") ||
        lowerMessage.includes("tư vấn") ||
        lowerMessage.includes("nên mua") ||
        lowerMessage.includes("phù hợp với")
    ) {
        result.isRecommendation = true
    }

    // Kiểm tra xem có phải là tìm kiếm nhiều sản phẩm không
    if (
        lowerMessage.includes("nhiều") ||
        lowerMessage.includes("các loại") ||
        lowerMessage.includes("đa dạng") ||
        lowerMessage.includes("tất cả") ||
        lowerMessage.includes("và") ||
        lowerMessage.includes("cùng với") ||
        lowerMessage.includes("kết hợp") ||
        lowerMessage.includes("nhiều sản phẩm") ||
        lowerMessage.includes("đồ vật") ||
        lowerMessage.includes("vật dụng")
    ) {
        result.isMultipleSearch = true
    }

    // Kiểm tra khoảng giá
    if (lowerMessage.includes("dưới") && /\d+/.test(lowerMessage)) {
        const priceMatch = lowerMessage.match(/dưới\s*(\d+(\.\d+)?)/i)
        if (priceMatch) {
            result.priceRange = { max: Number.parseFloat(priceMatch[1]) }
        }
    } else if (lowerMessage.includes("trên") && /\d+/.test(lowerMessage)) {
        const priceMatch = lowerMessage.match(/trên\s*(\d+(\.\d+)?)/i)
        if (priceMatch) {
            result.priceRange = { min: Number.parseFloat(priceMatch[1]) }
        }
    } else if (lowerMessage.includes("từ") && lowerMessage.includes("đến") && /\d+/.test(lowerMessage)) {
        const priceMatch = lowerMessage.match(/từ\s*(\d+(\.\d+)?)\s*đến\s*(\d+(\.\d+)?)/i)
        if (priceMatch) {
            result.priceRange = { min: Number.parseFloat(priceMatch[1]), max: Number.parseFloat(priceMatch[3]) }
        }
    } else if (lowerMessage.includes("khoảng") && /\d+/.test(lowerMessage)) {
        const priceMatch = lowerMessage.match(/khoảng\s*(\d+(\.\d+)?)/i)
        if (priceMatch) {
            const price = Number.parseFloat(priceMatch[1])
            result.priceRange = { min: price * 0.8, max: price * 1.2 }
        }
    }

    // Kiểm tra trực tiếp nếu là tìm kiếm giường
    if (
        lowerMessage === "giường" ||
        lowerMessage.includes("giường") ||
        lowerMessage.includes("bed") ||
        lowerMessage.includes("ngủ")
    ) {
        if (!result.furnitureTypes.includes("giường")) {
            result.furnitureTypes.push("giường")
        }
        if (!result.keywords.includes("giường")) {
            result.keywords.push("giường")
        }
    }

    // Tìm các từ khóa trong tin nhắn
    for (const [key, synonyms] of Object.entries(keywordMap)) {
        for (const synonym of synonyms) {
            if (lowerMessage.includes(synonym)) {
                result.keywords.push(key)

                // Phân loại từ khóa
                if (key.startsWith("màu")) {
                    result.colors.push(key.replace("màu ", ""))
                } else if (["gỗ", "kim loại", "vải", "da", "nhựa", "kính", "mây", "đá"].includes(key)) {
                    result.materials.push(key)
                } else if (
                    [
                        "phòng khách",
                        "phòng ngủ",
                        "nhà bếp",
                        "phòng tắm",
                        "văn phòng",
                        "phòng trẻ em",
                        "ban công",
                        "phòng ăn",
                        "hành lang",
                        "phòng giặt",
                    ].includes(key)
                ) {
                    result.categories.push(key)
                } else if (
                    [
                        "lưu trữ",
                        "trang trí",
                        "ngồi",
                        "ngủ",
                        "ăn uống",
                        "làm việc",
                        "nấu nướng",
                        "giặt giũ",
                        "tắm rửa",
                        "thư giãn",
                    ].includes(key)
                ) {
                    result.purposes.push(key)
                } else if (
                    [
                        "hiện đại",
                        "cổ điển",
                        "tối giản",
                        "sang trọng",
                        "công nghiệp",
                        "Bắc Âu",
                        "mộc mạc",
                        "ven biển",
                        "Bohemian",
                        "Á Đông",
                    ].includes(key)
                ) {
                    result.styles.push(key)
                } else if (["nhỏ", "lớn"].includes(key)) {
                    result.sizes.push(key)
                } else if (["chất lượng cao", "bền"].includes(key)) {
                    result.qualities.push(key)
                } else if (key === "bán chạy") {
                    result.isBestSeller = true
                } else if (key === "mới") {
                    result.isNewProduct = true
                } else if (key === "giảm giá") {
                    result.isDiscount = true
                } else if (
                    [
                        "ghế sofa",
                        "ghế đơn",
                        "ghế văn phòng",
                        "ghế ăn",
                        "bàn cà phê",
                        "bàn ăn",
                        "bàn làm việc",
                        "bàn bên",
                        "tủ quần áo",
                        "tủ ngăn kéo",
                        "tủ bếp",
                        "kệ sách",
                        "kệ treo tường",
                        "đèn",
                        "thảm",
                        "gương",
                        "rèm cửa",
                        "nệm",
                        "gối",
                        "chăn",
                        "ga giường",
                        "bát đĩa",
                        "dao kéo",
                        "nồi chảo",
                        "lọ hoa",
                        "khung ảnh",
                        "đồng hồ",
                        "hộp đựng",
                        "giỏ đựng",
                        "móc treo",
                        "kệ giày",
                        "bàn trang điểm",
                        "tủ tivi",
                        "bàn console",
                        "ghế đẩu",
                        "ghế dài",
                        "tủ lạnh",
                        "máy giặt",
                        "lò vi sóng",
                        "bếp",
                        "máy hút mùi",
                        "máy rửa bát",
                        "bồn rửa",
                        "vòi nước",
                        "bồn tắm",
                        "vòi sen",
                        "bồn cầu",
                        "tủ lavabo",
                    ].includes(key)
                ) {
                    result.furnitureTypes.push(key)
                } else if (
                    [
                        "giường",
                        "giường đôi",
                        "giường đơn",
                        "giường có ngăn chứa",
                        "giường tầng",
                        "giường gấp",
                        "giường sofa",
                        "giường trẻ em",
                        "khung giường",
                        "đầu giường",
                        "chân giường",
                    ].includes(key)
                ) {
                    result.bedTypes.push(key)
                    if (!result.furnitureTypes.includes("giường")) {
                        result.furnitureTypes.push("giường")
                    }
                }

                break // Tránh thêm từ khóa trùng lặp
            }
        }
    }

    // Tìm tên sản phẩm cụ thể
    for (const product of products) {
        if (product.name && lowerMessage.includes(product.name.toLowerCase())) {
            result.keywords.push(product.name.toLowerCase())
        }
    }

    // Tìm danh mục sản phẩm
    for (const category of categories) {
        if (
            category.name &&
            (lowerMessage.includes(category.name.toLowerCase()) ||
                (category.slug && lowerMessage.includes(category.slug.toLowerCase())))
        ) {
            result.categories.push(category.name.toLowerCase())
        }
    }

    // Xử lý trường hợp đặc biệt cho các từ khóa đơn giản
    if (
        lowerMessage === "ga giường" ||
        lowerMessage === "ga" ||
        lowerMessage === "ga trải giường" ||
        lowerMessage === "bed sheet"
    ) {
        result.furnitureTypes.push("ga giường")
        if (!result.keywords.includes("ga giường")) {
            result.keywords.push("ga giường")
        }
    }

    return result
}

// Hàm tìm sản phẩm dựa trên phân tích yêu cầu
const findProductsByAnalysis = (analysis) => {
    let filteredProducts = [...products]
    let diverseResults = []

    // Xử lý trường hợp đặc biệt cho các từ khóa đơn giản
    if (analysis.rawQuery) {
        const simpleQuery = analysis.rawQuery.trim()

        // Tìm kiếm trực tiếp trong tên sản phẩm, mô tả và tags
        const directMatches = products.filter(
            (product) =>
                (product.name && product.name.toLowerCase().includes(simpleQuery)) ||
                (product.description && product.description.toLowerCase().includes(simpleQuery)) ||
                (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(simpleQuery))),
        )

        if (directMatches.length > 0) {
            // Nếu tìm thấy kết quả trực tiếp, sử dụng chúng
            return directMatches.sort((a, b) => b.rating - a.rating)
        }
    }

    // Lọc theo danh mục
    if (analysis.categories.length > 0) {
        const categoryIds = categories
            .filter((cat) =>
                analysis.categories.some((c) => cat.name.toLowerCase().includes(c) || cat.slug.toLowerCase().includes(c)),
            )
            .map((cat) => cat.id)

        if (categoryIds.length > 0) {
            filteredProducts = filteredProducts.filter((product) => categoryIds.includes(product.categoryId))
        }
    }

    // Lọc theo màu sắc
    if (analysis.colors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            analysis.colors.some((color) => product.color && product.color.toLowerCase().includes(color)),
        )
    }

    // Lọc theo chất liệu
    if (analysis.materials.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            analysis.materials.some((material) => product.material && product.material.toLowerCase().includes(material)),
        )
    }

    // Lọc theo khoảng giá
    if (analysis.priceRange) {
        if (analysis.priceRange.min) {
            filteredProducts = filteredProducts.filter(
                (product) => Number.parseFloat(product.price) >= analysis.priceRange.min,
            )
        }
        if (analysis.priceRange.max) {
            filteredProducts = filteredProducts.filter(
                (product) => Number.parseFloat(product.price) <= analysis.priceRange.max,
            )
        }
    }

    // Lọc theo sản phẩm bán chạy
    if (analysis.isBestSeller) {
        filteredProducts = filteredProducts.filter((product) => product.bestSeller)
    }

    // Lọc theo sản phẩm giảm giá
    if (analysis.isDiscount) {
        filteredProducts = filteredProducts.filter((product) => product.lastChance)
    }

    // Lọc theo mục đích sử dụng
    if (analysis.purposes.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            analysis.purposes.some(
                (purpose) => product.tags && product.tags.some((tag) => tag.toLowerCase().includes(purpose)),
            ),
        )
    }

    // Xử lý tìm kiếm giường
    if (analysis.bedTypes.length > 0 || analysis.furnitureTypes.includes("giường")) {
        // Tìm kiếm các sản phẩm giường dựa trên loại giường cụ thể
        const bedMatches = products.filter(
            (product) =>
                (product.tags && product.tags.some((tag) => tag.toLowerCase().includes("bed"))) ||
                (product.name && product.name.toLowerCase().includes("bed")) ||
                (product.description && product.description.toLowerCase().includes("bed")) ||
                (product.tags && product.tags.some((tag) => tag.toLowerCase().includes("giường"))) ||
                (product.name && product.name.toLowerCase().includes("giường")) ||
                (product.description && product.description.toLowerCase().includes("giường")),
        )

        if (bedMatches.length > 0) {
            // Nếu có loại giường cụ thể, lọc thêm
            if (analysis.bedTypes.length > 0) {
                const specificBedMatches = bedMatches.filter((product) =>
                    analysis.bedTypes.some(
                        (type) =>
                            (product.name && product.name.toLowerCase().includes(type.toLowerCase())) ||
                            (product.description && product.description.toLowerCase().includes(type.toLowerCase())) ||
                            (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))),
                    ),
                )

                if (specificBedMatches.length > 0) {
                    return specificBedMatches.sort((a, b) => b.rating - a.rating)
                }
            }

            // Nếu không có loại giường cụ thể hoặc không tìm thấy, trả về tất cả giường
            return bedMatches.sort((a, b) => b.rating - a.rating)
        }

        // Nếu không tìm thấy giường trong dữ liệu, tạo dữ liệu mẫu
        if (analysis.rawQuery.includes("giường") || analysis.furnitureTypes.includes("giường")) {
            return createSampleBeds()
        }
    }

    // Nếu có tìm kiếm loại đồ nội thất cụ thể
    if (analysis.furnitureTypes.length > 0) {
        // Nếu là tìm kiếm nhiều sản phẩm, xử lý từng loại riêng biệt
        if (analysis.isMultipleSearch) {
            // Tìm kiếm từng loại đồ nội thất và lấy top sản phẩm cho mỗi loại
            for (const furnitureType of analysis.furnitureTypes) {
                const matchingProducts = products.filter(
                    (product) =>
                        (product.name && product.name.toLowerCase().includes(furnitureType.toLowerCase())) ||
                        (product.description && product.description.toLowerCase().includes(furnitureType.toLowerCase())) ||
                        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(furnitureType.toLowerCase()))),
                )

                // Sắp xếp theo đánh giá và lấy top 2 sản phẩm cho mỗi loại
                const topProducts = matchingProducts.sort((a, b) => b.rating - a.rating).slice(0, 2)
                diverseResults = [...diverseResults, ...topProducts]
            }

            // Nếu không có loại đồ nội thất cụ thể
            if (analysis.furnitureTypes.length === 0 && analysis.isMultipleSearch) {
                // Nếu không có loại đồ nội thất cụ thể nhưng muốn tìm nhiều sản phẩm
                // Nhóm sản phẩm theo danh mục và lấy top sản phẩm từ mỗi danh mục
                const categoryGroups = {}

                for (const product of filteredProducts) {
                    const categoryId = product.categoryId
                    if (!categoryGroups[categoryId]) {
                        categoryGroups[categoryId] = []
                    }
                    categoryGroups[categoryId].push(product)
                }

                // Lấy top sản phẩm từ mỗi danh mục
                for (const categoryId in categoryGroups) {
                    const topCategoryProducts = categoryGroups[categoryId].sort((a, b) => b.rating - a.rating).slice(0, 2)
                    diverseResults = [...diverseResults, ...topCategoryProducts]
                }
            }

            // Nếu đã có kết quả đa dạng, sử dụng kết quả đó
            if (diverseResults.length > 0) {
                return diverseResults
            }
        } else {
            // Nếu không phải tìm kiếm nhiều sản phẩm, lọc theo loại đồ nội thất
            const furnitureMatches = []

            // Tìm kiếm chính xác theo loại đồ nội thất
            for (const type of analysis.furnitureTypes) {
                const matches = products.filter(
                    (product) =>
                        (product.name && product.name.toLowerCase().includes(type.toLowerCase())) ||
                        (product.description && product.description.toLowerCase().includes(type.toLowerCase())) ||
                        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))),
                )

                furnitureMatches.push(...matches)
            }

            if (furnitureMatches.length > 0) {
                // Nếu tìm thấy kết quả trực tiếp, sử dụng chúng
                return furnitureMatches.sort((a, b) => b.rating - a.rating)
            }

            // Nếu không tìm thấy kết quả trực tiếp, sử dụng phương pháp lọc thông thường
            filteredProducts = filteredProducts.filter((product) =>
                analysis.furnitureTypes.some(
                    (type) =>
                        (product.name && product.name.toLowerCase().includes(type.toLowerCase())) ||
                        (product.description && product.description.toLowerCase().includes(type.toLowerCase())) ||
                        (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(type.toLowerCase()))),
                ),
            )
        }
    } else if (analysis.isMultipleSearch) {
        // Nếu là tìm kiếm nhiều sản phẩm nhưng không chỉ định loại cụ thể
        // Nhóm sản phẩm theo danh mục và lấy top sản phẩm từ mỗi danh mục
        const categoryGroups = {}

        for (const product of filteredProducts) {
            const categoryId = product.categoryId
            if (!categoryGroups[categoryId]) {
                categoryGroups[categoryId] = []
            }
            categoryGroups[categoryId].push(product)
        }

        // Lấy top sản phẩm từ mỗi danh mục
        for (const categoryId in categoryGroups) {
            const topCategoryProducts = categoryGroups[categoryId].sort((a, b) => b.rating - a.rating).slice(0, 2)
            diverseResults = [...diverseResults, ...topCategoryProducts]
        }

        if (diverseResults.length > 0) {
            return diverseResults
        }
    }

    // Lọc theo từ khóa trong tên và mô tả
    const otherKeywords = analysis.keywords.filter(
        (keyword) =>
            !analysis.colors.includes(keyword) &&
            !analysis.materials.includes(keyword) &&
            !analysis.categories.includes(keyword) &&
            !analysis.purposes.includes(keyword) &&
            !analysis.furnitureTypes.includes(keyword) &&
            !analysis.bedTypes.includes(keyword),
    )

    if (otherKeywords.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            otherKeywords.some(
                (keyword) =>
                    (product.name && product.name.toLowerCase().includes(keyword)) ||
                    (product.description && product.description.toLowerCase().includes(keyword)) ||
                    (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(keyword))),
            ),
        )
    }

    // Nếu không tìm thấy sản phẩm nào, thử tìm kiếm mở rộng
    if (filteredProducts.length === 0 && analysis.rawQuery) {
        // Tạo một danh sách các từ trong truy vấn
        const queryWords = analysis.rawQuery.split(/\s+/)

        // Tìm kiếm sản phẩm có chứa bất kỳ từ nào trong truy vấn
        if (queryWords.length > 0) {
            return products
                .filter((product) =>
                    queryWords.some(
                        (word) =>
                            (product.name && product.name.toLowerCase().includes(word)) ||
                            (product.description && product.description.toLowerCase().includes(word)) ||
                            (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(word))),
                    ),
                )
                .sort((a, b) => b.rating - a.rating)
        }
    }

    // Sắp xếp kết quả
    if (analysis.isRecommendation) {
        // Nếu là yêu cầu gợi ý, ưu tiên sản phẩm có đánh giá cao và bán chạy
        filteredProducts.sort((a, b) => {
            // Ưu tiên sản phẩm bán chạy
            if (a.bestSeller && !b.bestSeller) return -1
            if (!a.bestSeller && b.bestSeller) return 1

            // Sau đó ưu tiên theo đánh giá
            return b.rating - a.rating
        })
    } else {
        // Mặc định sắp xếp theo đánh giá
        filteredProducts.sort((a, b) => b.rating - a.rating)
    }

    return filteredProducts
}

// Hàm tạo dữ liệu mẫu cho giường
const createSampleBeds = () => {
    return [
        {
            id: "bed001",
            name: "MALM",
            description: "Bed frame, high, white, Queen",
            price: "199.99",
            currency: "$",
            rating: 4.6,
            reviews: 2876,
            image: "https://www.ikea.com/us/en/images/products/malm-bed-frame-high-white-luroey__0749130_pe745499_s5.jpg?f=s",
            bestSeller: true,
            lastChance: false,
            categoryId: 2,
            color: "white",
            material: "wood",
            tags: ["bed", "bedroom", "furniture"],
        },
        {
            id: "bed002",
            name: "HEMNES",
            description: "Bed frame, white stain, Queen",
            price: "299.99",
            currency: "$",
            rating: 4.5,
            reviews: 1876,
            image:
                "https://www.ikea.com/us/en/images/products/hemnes-bed-frame-white-stain-luroey__0637516_pe698353_s5.jpg?f=s",
            bestSeller: false,
            lastChance: true,
            categoryId: 2,
            color: "white",
            material: "wood",
            tags: ["bed", "bedroom", "furniture"],
        },
        {
            id: "bed003",
            name: "BRIMNES",
            description: "Bed frame with storage, white, Queen",
            price: "249.00",
            currency: "$",
            rating: 4.4,
            reviews: 1098,
            image:
                "https://www.ikea.com/us/en/images/products/brimnes-bed-frame-with-storage-white-luroey__0861362_pe614968_s5.jpg?f=s",
            bestSeller: false,
            lastChance: false,
            categoryId: 2,
            color: "white",
            material: "wood",
            tags: ["bed", "storage", "bedroom"],
        },
        {
            id: "bed004",
            name: "NEIDEN",
            description: "Bed frame, pine, Twin",
            price: "59.99",
            currency: "$",
            rating: 4.3,
            reviews: 876,
            image: "https://www.ikea.com/us/en/images/products/neiden-bed-frame-pine__0749132_pe745501_s5.jpg?f=s",
            bestSeller: false,
            lastChance: false,
            categoryId: 2,
            color: "beige",
            material: "wood",
            tags: ["bed", "bedroom", "furniture"],
        },
        {
            id: "bed005",
            name: "SLATTUM",
            description: "Upholstered bed frame, Knisa light gray, Queen",
            price: "179.00",
            currency: "$",
            rating: 4.5,
            reviews: 765,
            image:
                "https://www.ikea.com/us/en/images/products/slattum-upholstered-bed-frame-knisa-light-gray__0768244_pe754388_s5.jpg?f=s",
            bestSeller: true,
            lastChance: false,
            categoryId: 2,
            color: "gray",
            material: "fabric",
            tags: ["bed", "bedroom", "upholstered"],
        },
        {
            id: "bed006",
            name: "TARVA",
            description: "Bed frame, pine, Queen",
            price: "149.00",
            currency: "$",
            rating: 4.2,
            reviews: 543,
            image:
                "https://www.ikea.com/us/en/images/products/malm-bed-frame-dark-brown-veneer__1364772_pe956028_s5.jpg?f=xl",
            bestSeller: false,
            lastChance: false,
            categoryId: 2,
            color: "beige",
            material: "wood",
            tags: ["bed", "bedroom", "furniture"],
        },
        {
            id: "bed007",
            name: "SONGESAND",
            description: "Bed frame with 2 storage boxes, brown, Full/Double",
            price: "229.00",
            currency: "$",
            rating: 4.4,
            reviews: 687,
            image: "https://www.ikea.com/us/en/images/products/utaker-stackable-bed-pine__1101313_pe866582_s5.jpg?f=xxs",
            bestSeller: false,
            lastChance: false,
            categoryId: 2,
            color: "brown",
            material: "wood",
            tags: ["bed", "storage", "bedroom"],
        },
        {
            id: "bed008",
            name: "KURA",
            description: "Reversible bed, white/pine, Twin",
            price: "179.00",
            currency: "$",
            rating: 4.7,
            reviews: 1243,
            image:
                "https://www.ikea.com/us/en/images/products/malm-bed-frame-high-black-brown-luroey__0638608_pe699032_s5.jpg?f=xxs",
            bestSeller: true,
            lastChance: false,
            categoryId: 2,
            color: "white",
            material: "wood",
            tags: ["bed", "children", "reversible"],
        },
    ]
}

// Hàm tạo phản hồi dựa trên phân tích yêu cầu và sản phẩm tìm được
const createResponse = (analysis, products) => {
    if (products.length === 0) {
        return {
            text: "Xin lỗi, chúng tôi không tìm thấy sản phẩm nào phù hợp với yêu cầu của bạn. Bạn có thể mô tả chi tiết hơn hoặc thử với các tiêu chí khác.",
            products: [],
        }
    }

    let responseText = ""
    const topProducts = products.slice(0, 8) // Tăng số lượng sản phẩm hiển thị

    // Tạo phản hồi dựa trên loại yêu cầu
    if (analysis.isComparison) {
        responseText = "Dưới đây là một số sản phẩm để bạn có thể so sánh:"
    } else if (analysis.isRecommendation) {
        responseText = "Dựa trên yêu cầu của bạn, tôi xin gợi ý những sản phẩm sau:"
    } else if (analysis.bedTypes.length > 0 || analysis.furnitureTypes.includes("giường")) {
        if (analysis.bedTypes.length > 0) {
            responseText = `Đây là một số ${analysis.bedTypes.join(", ")} phù hợp với yêu cầu của bạn:`
        } else {
            responseText = "Đây là một số giường phù hợp với yêu cầu của bạn:"
        }
    } else if (analysis.isMultipleSearch) {
        // Nhóm sản phẩm theo loại
        const productTypes = {}
        for (const product of topProducts) {
            // Xác định loại sản phẩm từ tên hoặc tags
            let type = "Khác"
            if (product.tags && product.tags.length > 0) {
                type = product.tags[0]
            } else {
                // Tìm loại từ tên sản phẩm
                for (const [key, synonyms] of Object.entries(keywordMap)) {
                    if (
                        [
                            "ghế sofa",
                            "ghế đơn",
                            "ghế văn phòng",
                            "ghế ăn",
                            "bàn cà phê",
                            "bàn ăn",
                            "bàn làm việc",
                            "bàn bên",
                            "giường",
                            "tủ quần áo",
                            "tủ ngăn kéo",
                            "tủ bếp",
                            "kệ sách",
                            "kệ treo tường",
                            "đèn",
                            "thảm",
                            "gương",
                            "rèm cửa",
                            "nệm",
                            "gối",
                            "chăn",
                            "ga giường",
                            "bát đĩa",
                            "dao kéo",
                            "nồi chảo",
                            "lọ hoa",
                            "khung ảnh",
                            "đồng hồ",
                            "hộp đựng",
                            "giỏ đựng",
                            "móc treo",
                            "kệ giày",
                            "bàn trang điểm",
                            "tủ tivi",
                            "bàn console",
                            "ghế đẩu",
                            "ghế dài",
                        ].includes(key)
                    ) {
                        for (const synonym of synonyms) {
                            if (product.name && product.name.toLowerCase().includes(synonym)) {
                                type = key
                                break
                            }
                        }
                        if (type !== "Khác") break
                    }
                }
            }

            if (!productTypes[type]) {
                productTypes[type] = []
            }
            productTypes[type].push(product)
        }

        // Đếm số loại sản phẩm khác nhau
        const typeCount = Object.keys(productTypes).length

        if (typeCount > 1) {
            responseText = `Tôi đã tìm thấy ${typeCount} loại sản phẩm khác nhau phù hợp với yêu cầu của bạn:`
        } else {
            responseText = "Dưới đây là các sản phẩm đa dạng phù hợp với yêu cầu của bạn:"
        }
    } else if (analysis.categories.length > 0) {
        const categoryNames = analysis.categories.map((c) => {
            // Chuyển đổi từ khóa thành tên danh mục đầy đủ
            const matchedCategory = categories.find(
                (cat) => cat.name.toLowerCase().includes(c) || cat.slug.toLowerCase().includes(c),
            )
            return matchedCategory ? matchedCategory.name : c
        })
        responseText = `Chúng tôi có một số sản phẩm ${categoryNames.join(", ")} phù hợp với yêu cầu của bạn:`
    } else if (analysis.colors.length > 0) {
        responseText = `Đây là một số sản phẩm màu ${analysis.colors.join(", ")} phù hợp với yêu cầu của bạn:`
    } else if (analysis.materials.length > 0) {
        responseText = `Đây là một số sản phẩm làm từ ${analysis.materials.join(", ")} phù hợp với yêu cầu của bạn:`
    } else if (analysis.priceRange) {
        if (analysis.priceRange.min && analysis.priceRange.max) {
            responseText = `Đây là một số sản phẩm có giá từ $${analysis.priceRange.min} đến $${analysis.priceRange.max}:`
        } else if (analysis.priceRange.min) {
            responseText = `Đây là một số sản phẩm có giá trên $${analysis.priceRange.min}:`
        } else if (analysis.priceRange.max) {
            responseText = `Đây là một số sản phẩm có giá dưới $${analysis.priceRange.max}:`
        }
    } else if (analysis.isBestSeller) {
        responseText = "Đây là những sản phẩm bán chạy nhất của chúng tôi:"
    } else if (analysis.isDiscount) {
        responseText = "Hiện tại chúng tôi đang có một số sản phẩm giảm giá:"
    } else if (analysis.purposes.length > 0) {
        responseText = `Đây là một số sản phẩm phù hợp cho mục đích ${analysis.purposes.join(", ")}:`
    } else if (analysis.furnitureTypes.length > 0) {
        responseText = `Đây là một số sản phẩm loại ${analysis.furnitureTypes.join(", ")} phù hợp với yêu cầu của bạn:`
    } else {
        responseText = "Dựa trên yêu cầu của bạn, đây là một số sản phẩm phù hợp:"
    }

    return {
        text: responseText,
        products: topProducts,
    }
}

// Hàm tạo phản hồi cho trường hợp so sánh sản phẩm
const createComparisonResponse = (products) => {
    if (products.length < 2) {
        return {
            text: "Để so sánh sản phẩm, vui lòng cung cấp thêm thông tin về các sản phẩm bạn muốn so sánh.",
            products: products,
        }
    }

    const topProducts = products.slice(0, 4)

    let comparisonText = "Dưới đây là so sánh giữa các sản phẩm bạn quan tâm:\n\n"

    // So sánh giá
    comparisonText += "Về giá cả: "
    const cheapestProduct = topProducts.reduce((prev, current) =>
        Number.parseFloat(prev.price) < Number.parseFloat(current.price) ? prev : current,
    )
    const mostExpensiveProduct = topProducts.reduce((prev, current) =>
        Number.parseFloat(prev.price) > Number.parseFloat(current.price) ? prev : current,
    )
    comparisonText += `${cheapestProduct.name} có giá thấp nhất (${cheapestProduct.currency}${cheapestProduct.price}), trong khi ${mostExpensiveProduct.name} có giá cao nhất (${mostExpensiveProduct.currency}${mostExpensiveProduct.price}).\n\n`

    // So sánh đánh giá
    comparisonText += "Về đánh giá: "
    const bestRatedProduct = topProducts.reduce((prev, current) => (prev.rating > current.rating ? prev : current))
    comparisonText += `${bestRatedProduct.name} có đánh giá cao nhất (${bestRatedProduct.rating}/5 sao với ${bestRatedProduct.reviews} đánh giá).\n\n`

    // So sánh chất liệu
    const materials = [...new Set(topProducts.map((p) => p.material))]
    if (materials.length > 1) {
        comparisonText += "Về chất liệu: "
        topProducts.forEach((p) => {
            comparisonText += `${p.name} được làm từ ${p.material}, `
        })
        comparisonText = comparisonText.slice(0, -2) + ".\n\n"
    }

    // Kết luận
    comparisonText += "Gợi ý: "
    if (topProducts.some((p) => p.bestSeller)) {
        const bestSellers = topProducts.filter((p) => p.bestSeller)
        comparisonText += `${bestSellers.map((p) => p.name).join(", ")} là sản phẩm bán chạy nhất. `
    }

    comparisonText += "Bạn có thể chọn sản phẩm phù hợp nhất dựa trên nhu cầu và ngân sách của mình."

    return {
        text: comparisonText,
        products: topProducts,
    }
}

// Hàm tìm phản hồi dựa trên từ khóa
const findResponse = (message) => {
    // Phân tích yêu cầu của khách hàng
    const analysis = analyzeRequest(message)

    // Tìm sản phẩm phù hợp
    const matchedProducts = findProductsByAnalysis(analysis)

    // Nếu không tìm thấy sản phẩm nào, tạo dữ liệu mẫu cho "ga giường"
    if (matchedProducts.length === 0 && (message.toLowerCase().includes("ga giường") || message.toLowerCase() === "ga")) {
        // Tạo dữ liệu mẫu cho ga giường
        const sampleBedSheets = [
            {
                id: "bs001",
                name: "DVALA Ga giường",
                description: "Ga giường cotton mềm mại, dễ chịu khi tiếp xúc với da",
                price: "299000",
                currency: "₫",
                rating: 4.7,
                reviews: 120,
                image: "/placeholder.svg?height=200&width=200",
                color: "trắng",
                material: "cotton",
                bestSeller: true,
                categoryId: "bedroom",
                tags: ["ga giường", "phòng ngủ", "cotton"],
            },
            {
                id: "bs002",
                name: "NATTJASMIN Ga trải giường",
                description: "Ga trải giường cotton cao cấp với độ mềm mịn tuyệt vời",
                price: "499000",
                currency: "₫",
                rating: 4.8,
                reviews: 85,
                image: "/placeholder.svg?height=200&width=200",
                color: "xám nhạt",
                material: "cotton sateen",
                bestSeller: false,
                categoryId: "bedroom",
                tags: ["ga giường", "phòng ngủ", "cotton"],
            },
            {
                id: "bs003",
                name: "SOMNTUTA Ga giường đôi",
                description: "Ga giường đôi với kích thước rộng rãi, phù hợp cho giường đôi",
                price: "399000",
                currency: "₫",
                rating: 4.5,
                reviews: 62,
                image: "/placeholder.svg?height=200&width=200",
                color: "be",
                material: "cotton",
                bestSeller: false,
                categoryId: "bedroom",
                tags: ["ga giường", "phòng ngủ", "cotton", "giường đôi"],
            },
            {
                id: "bs004",
                name: "ULLVIDE Ga trải giường",
                description: "Ga trải giường làm từ cotton lyocell mềm mại, thoáng khí",
                price: "599000",
                currency: "₫",
                rating: 4.9,
                reviews: 103,
                image: "/placeholder.svg?height=200&width=200",
                color: "xanh dương nhạt",
                material: "cotton lyocell",
                bestSeller: true,
                categoryId: "bedroom",
                tags: ["ga giường", "phòng ngủ", "cotton", "lyocell"],
            },
        ]

        return {
            text: "Đây là một số ga giường phù hợp với yêu cầu của bạn:",
            products: sampleBedSheets,
        }
    }

    // Tạo phản hồi
    if (analysis.isComparison && matchedProducts.length >= 2) {
        return createComparisonResponse(matchedProducts)
    } else {
        return createResponse(analysis, matchedProducts)
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

    // Hàm phân tích yêu cầu của khách hàng (để sử dụng bên ngoài nếu cần)
    analyzeRequest: (message) => {
        return analyzeRequest(message)
    },
}
