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

// Lưu trữ lịch sử tìm kiếm
let searchHistory = []

// Lưu trữ ngữ cảnh cuộc trò chuyện
const conversationContext = {
    userName: "",
    lastQuery: "",
    lastProducts: [],
    cart: [],
    conversationHistory: [],
    lastIntent: "",
    greetingShown: false,
}

// Thêm các câu hỏi thường gặp và câu trả lời
const faqData = {
    "giờ mở cửa": "Cửa hàng chúng tôi mở cửa từ 8:00 đến 22:00 tất cả các ngày trong tuần, kể cả ngày lễ.",
    "chính sách đổi trả":
        "Quý khách có thể đổi trả sản phẩm trong vòng 30 ngày kể từ ngày mua hàng với điều kiện sản phẩm còn nguyên vẹn, đầy đủ phụ kiện và hóa đơn mua hàng.",
    "phí vận chuyển":
        "Chúng tôi miễn phí vận chuyển cho đơn hàng từ 1.000.000đ. Đơn hàng dưới 1.000.000đ sẽ có phí vận chuyển từ 30.000đ tùy khu vực.",
    "thời gian giao hàng":
        "Thời gian giao hàng thông thường là 3-5 ngày làm việc đối với khu vực nội thành và 5-7 ngày đối với khu vực ngoại thành và tỉnh thành khác.",
    "phương thức thanh toán":
        "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay) và thanh toán khi nhận hàng (COD).",
    "bảo hành":
        "Các sản phẩm nội thất của chúng tôi được bảo hành từ 12-24 tháng tùy loại sản phẩm. Chi tiết bảo hành được ghi rõ trên phiếu bảo hành đi kèm sản phẩm.",
    "địa chỉ cửa hàng":
        "Cửa hàng chính của chúng tôi đặt tại 123 Nguyễn Văn Linh, Quận 7, TP.HCM. Ngoài ra chúng tôi còn có chi nhánh tại Hà Nội và Đà Nẵng.",
    "khuyến mãi":
        "Hiện tại chúng tôi đang có chương trình giảm giá 10-30% cho nhiều sản phẩm nội thất và miễn phí vận chuyển cho đơn hàng từ 1.000.000đ.",
    "lắp đặt":
        "Chúng tôi cung cấp dịch vụ lắp đặt miễn phí cho các sản phẩm nội thất lớn như giường, tủ, bàn ghế trong phạm vi 20km từ cửa hàng.",
    "xuất xứ sản phẩm":
        "Sản phẩm của chúng tôi đến từ nhiều nguồn khác nhau, bao gồm hàng nhập khẩu từ châu Âu, châu Á và hàng sản xuất tại Việt Nam. Thông tin xuất xứ được ghi rõ trong mô tả sản phẩm.",
}

// Thêm các câu chào và giới thiệu
const greetings = [
    "Xin chào! Tôi là trợ lý ảo của cửa hàng nội thất. Tôi có thể giúp bạn tìm kiếm sản phẩm, trả lời câu hỏi hoặc hỗ trợ đặt hàng. Bạn cần giúp đỡ gì?",
    "Chào mừng bạn đến với cửa hàng nội thất của chúng tôi! Tôi có thể giúp bạn tìm kiếm sản phẩm phù hợp với nhu cầu và ngân sách. Bạn đang tìm kiếm sản phẩm nào?",
    "Xin chào! Rất vui được hỗ trợ bạn hôm nay. Tôi có thể giúp bạn tìm kiếm sản phẩm nội thất, trả lời thắc mắc hoặc tư vấn về trang trí nội thất. Bạn cần hỗ trợ gì?",
]

// Thêm các câu trả lời khi không hiểu yêu cầu
const fallbackResponses = [
    "Xin lỗi, tôi không hiểu yêu cầu của bạn. Bạn có thể diễn đạt theo cách khác được không?",
    "Tôi chưa hiểu rõ ý bạn. Bạn có thể cho tôi biết cụ thể hơn về sản phẩm bạn đang tìm kiếm?",
    "Tôi không chắc mình hiểu đúng yêu cầu của bạn. Bạn có thể cung cấp thêm thông tin hoặc đặt câu hỏi khác không?",
    "Xin lỗi vì sự bất tiện này. Tôi không thể xử lý yêu cầu của bạn. Bạn có thể thử lại với từ khóa khác hoặc mô tả chi tiết hơn không?",
]

// Thêm hàm kiểm tra và trả lời câu hỏi thường gặp
const checkForFAQ = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra xem tin nhắn có chứa từ khóa FAQ nào không
    for (const [keyword, answer] of Object.entries(faqData)) {
        if (
            lowerMessage.includes(keyword) ||
            lowerMessage.includes(`${keyword}?`) ||
            (lowerMessage.includes("chính sách") && keyword.includes("chính sách")) ||
            (lowerMessage.includes("bảo hành") && keyword.includes("bảo hành")) ||
            (lowerMessage.includes("giao hàng") && keyword.includes("giao hàng")) ||
            (lowerMessage.includes("thanh toán") && keyword.includes("thanh toán")) ||
            (lowerMessage.includes("đổi trả") && keyword.includes("đổi trả")) ||
            (lowerMessage.includes("vận chuyển") && keyword.includes("vận chuyển"))
        ) {
            return {
                isFAQ: true,
                answer: answer,
                relatedQuestions: getRelatedFAQs(keyword),
            }
        }
    }

    // Kiểm tra các câu hỏi chung
    if (
        lowerMessage.includes("giờ làm việc") ||
        lowerMessage.includes("mấy giờ mở cửa") ||
        lowerMessage.includes("thời gian làm việc")
    ) {
        return {
            isFAQ: true,
            answer: faqData["giờ mở cửa"],
            relatedQuestions: getRelatedFAQs("giờ mở cửa"),
        }
    }

    if (
        lowerMessage.includes("liên hệ") ||
        lowerMessage.includes("số điện thoại") ||
        lowerMessage.includes("email") ||
        lowerMessage.includes("địa chỉ")
    ) {
        return {
            isFAQ: true,
            answer: faqData["địa chỉ cửa hàng"],
            relatedQuestions: getRelatedFAQs("địa chỉ cửa hàng"),
        }
    }

    return { isFAQ: false }
}

// Hàm lấy các câu hỏi liên quan
const getRelatedFAQs = (currentFAQ) => {
    const relatedFAQs = []

    // Nhóm các FAQ theo chủ đề
    const faqGroups = {
        "mua hàng": ["phương thức thanh toán", "phí vận chuyển", "thời gian giao hàng"],
        "chính sách": ["chính sách đổi trả", "bảo hành", "lắp đặt"],
        "cửa hàng": ["giờ mở cửa", "địa chỉ cửa hàng", "khuyến mãi"],
        "sản phẩm": ["xuất xứ sản phẩm", "bảo hành", "lắp đặt"],
    }

    // Tìm nhóm chứa FAQ hiện tại
    let currentGroup = null
    for (const [group, faqs] of Object.entries(faqGroups)) {
        if (faqs.includes(currentFAQ)) {
            currentGroup = group
            break
        }
    }

    // Nếu tìm thấy nhóm, lấy các FAQ khác trong nhóm đó
    if (currentGroup) {
        for (const faq of faqGroups[currentGroup]) {
            if (faq !== currentFAQ) {
                relatedFAQs.push(faq)
            }
        }
    }

    // Nếu không đủ 3 câu hỏi liên quan, thêm các câu hỏi ngẫu nhiên
    while (relatedFAQs.length < 3) {
        const randomFAQ = Object.keys(faqData)[Math.floor(Math.random() * Object.keys(faqData).length)]
        if (randomFAQ !== currentFAQ && !relatedFAQs.includes(randomFAQ)) {
            relatedFAQs.push(randomFAQ)
        }
    }

    return relatedFAQs.slice(0, 3)
}

// Hàm kiểm tra ý định chào hỏi
const checkForGreeting = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ chào hỏi phổ biến
    const greetingWords = [
        "xin chào",
        "chào",
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "chào bạn",
        "alo",
    ]

    for (const word of greetingWords) {
        if (lowerMessage.includes(word) || lowerMessage === word) {
            return true
        }
    }

    return false
}

// Hàm kiểm tra ý định cảm ơn
const checkForThanks = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ cảm ơn phổ biến
    const thanksWords = ["cảm ơn", "thank", "thanks", "thank you", "cám ơn", "cảm ơn bạn", "cảm ơn nhiều"]

    for (const word of thanksWords) {
        if (lowerMessage.includes(word) || lowerMessage === word) {
            return true
        }
    }

    return false
}

// Hàm kiểm tra ý định tạm biệt
const checkForGoodbye = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ tạm biệt phổ biến
    const goodbyeWords = ["tạm biệt", "bye", "goodbye", "see you", "hẹn gặp lại", "chào tạm biệt"]

    for (const word of goodbyeWords) {
        if (lowerMessage.includes(word) || lowerMessage === word) {
            return true
        }
    }

    return false
}

// Hàm kiểm tra ý định đặt hàng
const checkForOrderIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến đặt hàng
    const orderKeywords = [
        "đặt hàng",
        "mua",
        "order",
        "thanh toán",
        "giỏ hàng",
        "cart",
        "mua ngay",
        "đặt mua",
        "thêm vào giỏ",
        "add to cart",
        "checkout",
    ]

    for (const keyword of orderKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (productId, quantity = 1) => {
    // Tìm sản phẩm trong danh sách sản phẩm
    const product = products.find((p) => p.id === productId)

    if (!product) {
        return {
            success: false,
            message: "Không tìm thấy sản phẩm",
        }
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = conversationContext.cart.findIndex((item) => item.product.id === productId)

    if (existingItemIndex >= 0) {
        // Nếu đã có, tăng số lượng
        conversationContext.cart[existingItemIndex].quantity += quantity
    } else {
        // Nếu chưa có, thêm mới
        conversationContext.cart.push({
            product: product,
            quantity: quantity,
        })
    }

    return {
        success: true,
        message: `Đã thêm ${quantity} ${product.name} vào giỏ hàng`,
        cart: conversationContext.cart,
    }
}

// Hàm xử lý đặt hàng
const processOrder = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Nếu giỏ hàng trống và có ý định đặt hàng
    if (conversationContext.cart.length === 0) {
        // Kiểm tra xem tin nhắn có đề cập đến sản phẩm cụ thể không
        if (conversationContext.lastProducts && conversationContext.lastProducts.length > 0) {
            // Nếu có sản phẩm được hiển thị gần đây, hỏi người dùng muốn đặt sản phẩm nào
            return {
                text: "Bạn muốn đặt sản phẩm nào? Vui lòng cho tôi biết tên hoặc mã sản phẩm.",
                products: conversationContext.lastProducts,
                suggestions: ["Đặt sản phẩm đầu tiên", "Xem thêm sản phẩm", "Thêm tất cả vào giỏ hàng"],
            }
        } else {
            // Nếu không có sản phẩm nào được hiển thị gần đây
            return {
                text: "Giỏ hàng của bạn đang trống. Bạn muốn tìm kiếm sản phẩm nào để đặt hàng?",
                products: [],
                suggestions: popularSuggestions.slice(0, 5),
            }
        }
    }

    // Nếu giỏ hàng có sản phẩm
    const totalItems = conversationContext.cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = conversationContext.cart.reduce(
        (sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity,
        0,
    )

    // Tạo danh sách sản phẩm trong giỏ hàng
    let cartItemsList = "Giỏ hàng của bạn:\n\n"
    conversationContext.cart.forEach((item, index) => {
        cartItemsList += `${index + 1}. ${item.product.name} - ${item.quantity} x ${item.product.currency}${item.product.price} = ${item.product.currency}${(Number.parseFloat(item.product.price) * item.quantity).toFixed(2)}\n`
    })

    cartItemsList += `\nTổng cộng: ${conversationContext.cart[0].product.currency}${totalPrice.toFixed(2)}`

    // Kiểm tra xem người dùng có muốn thanh toán không
    if (
        lowerMessage.includes("thanh toán") ||
        lowerMessage.includes("checkout") ||
        lowerMessage.includes("đặt hàng ngay") ||
        lowerMessage.includes("mua ngay")
    ) {
        return {
            text: `${cartItemsList}\n\nĐể hoàn tất đơn hàng, vui lòng cung cấp thông tin giao hàng (tên, số điện thoại, địa chỉ) và phương thức thanh toán bạn muốn sử dụng.`,
            products: conversationContext.cart.map((item) => item.product),
            suggestions: [
                "Thanh toán khi nhận hàng (COD)",
                "Thanh toán qua thẻ tín dụng",
                "Chuyển khoản ngân hàng",
                "Thanh toán qua ví điện tử",
            ],
        }
    }

    // Mặc định hiển thị giỏ hàng
    return {
        text: `${cartItemsList}\n\nBạn có muốn tiếp tục mua sắm hay thanh toán ngay?`,
        products: conversationContext.cart.map((item) => item.product),
        suggestions: ["Tiếp tục mua sắm", "Thanh toán ngay", "Cập nhật số lượng", "Xóa giỏ hàng"],
    }
}

// Hàm xử lý ý định xóa giỏ hàng
const clearCart = () => {
    conversationContext.cart = []
    return {
        success: true,
        message: "Đã xóa tất cả sản phẩm trong giỏ hàng",
    }
}

// Hàm xử lý ý định xem giỏ hàng
const viewCart = () => {
    if (conversationContext.cart.length === 0) {
        return {
            text: "Giỏ hàng của bạn đang trống. Bạn muốn tìm kiếm sản phẩm nào?",
            products: [],
            suggestions: popularSuggestions.slice(0, 5),
        }
    }

    const totalItems = conversationContext.cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = conversationContext.cart.reduce(
        (sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity,
        0,
    )

    // Tạo danh sách sản phẩm trong giỏ hàng
    let cartItemsList = "Giỏ hàng của bạn:\n\n"
    conversationContext.cart.forEach((item, index) => {
        cartItemsList += `${index + 1}. ${item.product.name} - ${item.quantity} x ${item.product.currency}${item.product.price} = ${item.product.currency}${(Number.parseFloat(item.product.price) * item.quantity).toFixed(2)}\n`
    })

    cartItemsList += `\nTổng cộng: ${conversationContext.cart[0].product.currency}${totalPrice.toFixed(2)}`

    return {
        text: `${cartItemsList}\n\nBạn có muốn tiếp tục mua sắm hay thanh toán ngay?`,
        products: conversationContext.cart.map((item) => item.product),
        suggestions: ["Tiếp tục mua sắm", "Thanh toán ngay", "Cập nhật số lượng", "Xóa giỏ hàng"],
    }
}

// Hàm kiểm tra ý định xem giỏ hàng
const checkForCartViewIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến xem giỏ hàng
    const cartKeywords = [
        "giỏ hàng",
        "cart",
        "xem giỏ",
        "view cart",
        "xem giỏ hàng",
        "kiểm tra giỏ hàng",
        "check cart",
        "sản phẩm trong giỏ",
    ]

    for (const keyword of cartKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Hàm kiểm tra ý định xóa giỏ hàng
const checkForClearCartIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến xóa giỏ hàng
    const clearCartKeywords = [
        "xóa giỏ hàng",
        "clear cart",
        "xóa giỏ",
        "xóa tất cả",
        "xóa sản phẩm",
        "remove all",
        "empty cart",
        "làm trống giỏ hàng",
    ]

    for (const keyword of clearCartKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Hàm xử lý ý định thêm sản phẩm vào giỏ hàng
const processAddToCartIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Nếu không có sản phẩm được hiển thị gần đây
    if (!conversationContext.lastProducts || conversationContext.lastProducts.length === 0) {
        return {
            text: "Bạn muốn thêm sản phẩm nào vào giỏ hàng? Vui lòng cho tôi biết tên hoặc mô tả sản phẩm.",
            products: [],
            suggestions: popularSuggestions.slice(0, 5),
        }
    }

    // Kiểm tra xem tin nhắn có đề cập đến sản phẩm cụ thể không
    let productIndex = -1

    // Kiểm tra các từ như "sản phẩm đầu tiên", "sản phẩm thứ hai", v.v.
    if (lowerMessage.includes("đầu tiên") || lowerMessage.includes("thứ nhất") || lowerMessage.includes("1")) {
        productIndex = 0
    } else if (lowerMessage.includes("thứ hai") || lowerMessage.includes("2")) {
        productIndex = 1
    } else if (lowerMessage.includes("thứ ba") || lowerMessage.includes("3")) {
        productIndex = 2
    } else if (lowerMessage.includes("thứ tư") || lowerMessage.includes("4")) {
        productIndex = 3
    }

    // Nếu không tìm thấy chỉ số sản phẩm, kiểm tra tên sản phẩm
    if (productIndex === -1) {
        for (let i = 0; i < conversationContext.lastProducts.length; i++) {
            const product = conversationContext.lastProducts[i]
            if (lowerMessage.includes(product.name.toLowerCase())) {
                productIndex = i
                break
            }
        }
    }

    // Nếu tìm thấy sản phẩm
    if (productIndex >= 0 && productIndex < conversationContext.lastProducts.length) {
        const product = conversationContext.lastProducts[productIndex]
        const result = addToCart(product.id)

        if (result.success) {
            return {
                text: `${result.message}. Bạn có muốn tiếp tục mua sắm hay xem giỏ hàng?`,
                products: [product],
                suggestions: ["Tiếp tục mua sắm", "Xem giỏ hàng", "Thanh toán ngay", "Thêm sản phẩm khác"],
            }
        } else {
            return {
                text: result.message,
                products: conversationContext.lastProducts,
                suggestions: ["Thử lại", "Tìm sản phẩm khác", "Xem giỏ hàng"],
            }
        }
    }

    // Nếu không tìm thấy sản phẩm cụ thể, hỏi người dùng muốn thêm sản phẩm nào
    return {
        text: "Bạn muốn thêm sản phẩm nào vào giỏ hàng? Vui lòng cho tôi biết tên hoặc số thứ tự sản phẩm.",
        products: conversationContext.lastProducts,
        suggestions: conversationContext.lastProducts.map((p, i) => `Thêm ${p.name}`),
    }
}

// Hàm kiểm tra ý định thêm vào giỏ hàng
const checkForAddToCartIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến thêm vào giỏ hàng
    const addToCartKeywords = [
        "thêm vào giỏ",
        "add to cart",
        "thêm giỏ hàng",
        "mua",
        "đặt mua",
        "thêm sản phẩm",
        "thêm vào",
        "mua ngay",
        "đặt ngay",
    ]

    for (const keyword of addToCartKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Hàm xử lý ý định hỗ trợ
const processHelpIntent = (message) => {
    return {
        text:
            "Tôi có thể giúp bạn với những việc sau:\n\n" +
            "1. Tìm kiếm sản phẩm nội thất theo loại, màu sắc, giá cả, v.v.\n" +
            "2. Cung cấp thông tin về sản phẩm và so sánh giữa các sản phẩm\n" +
            "3. Trả lời các câu hỏi về chính sách cửa hàng, giao hàng, đổi trả\n" +
            "4. Hỗ trợ đặt hàng và thanh toán\n" +
            "5. Tư vấn về trang trí nội thất\n\n" +
            "Bạn cần hỗ trợ về vấn đề gì?",
        products: [],
        suggestions: [
            "Tìm sản phẩm",
            "Chính sách đổi trả",
            "Phương thức thanh toán",
            "Thời gian giao hàng",
            "Tư vấn trang trí",
            "Liên hệ nhân viên",
        ],
    }
}

// Hàm kiểm tra ý định hỗ trợ
const checkForHelpIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến hỗ trợ
    const helpKeywords = [
        "giúp",
        "help",
        "hỗ trợ",
        "support",
        "trợ giúp",
        "hướng dẫn",
        "guide",
        "làm thế nào",
        "how to",
        "cách",
    ]

    for (const keyword of helpKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Hàm xử lý ý định liên hệ nhân viên
const processContactStaffIntent = () => {
    return {
        text:
            "Bạn có thể liên hệ với nhân viên hỗ trợ của chúng tôi qua các kênh sau:\n\n" +
            "- Hotline: 1900 1234 (8:00 - 22:00 mỗi ngày)\n" +
            "- Email: support@noithat.com\n" +
            "- Chat trực tiếp trên website: Nhấn vào nút 'Chat với nhân viên' ở góc phải màn hình\n\n" +
            "Bạn cũng có thể để lại số điện thoại, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.",
        products: [],
        suggestions: ["Để lại số điện thoại", "Gửi email", "Quay lại tìm kiếm sản phẩm"],
    }
}

// Hàm kiểm tra ý định liên hệ nhân viên
const checkForContactStaffIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến liên hệ nhân viên
    const contactKeywords = [
        "nói chuyện với nhân viên",
        "gặp nhân viên",
        "liên hệ nhân viên",
        "talk to human",
        "speak to agent",
        "nhân viên hỗ trợ",
        "tư vấn viên",
        "gặp người thật",
        "không muốn nói chuyện với bot",
        "cần người hỗ trợ",
    ]

    for (const keyword of contactKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Hàm xử lý ý định tư vấn trang trí
const processDecorAdviceIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Xác định phòng cần tư vấn
    let room = "phòng khách" // Mặc định là phòng khách

    if (lowerMessage.includes("phòng ngủ")) {
        room = "phòng ngủ"
    } else if (lowerMessage.includes("nhà bếp") || lowerMessage.includes("bếp")) {
        room = "nhà bếp"
    } else if (lowerMessage.includes("phòng tắm")) {
        room = "phòng tắm"
    } else if (lowerMessage.includes("văn phòng") || lowerMessage.includes("phòng làm việc")) {
        room = "văn phòng"
    } else if (lowerMessage.includes("phòng ăn")) {
        room = "phòng ăn"
    } else if (lowerMessage.includes("ban công")) {
        room = "ban công"
    }

    // Xác định phong cách
    let style = "hiện đại" // Mặc định là phong cách hiện đại

    if (lowerMessage.includes("cổ điển") || lowerMessage.includes("vintage")) {
        style = "cổ điển"
    } else if (lowerMessage.includes("tối giản") || lowerMessage.includes("minimalist")) {
        style = "tối giản"
    } else if (lowerMessage.includes("bắc âu") || lowerMessage.includes("scandinavian")) {
        style = "Bắc Âu"
    } else if (lowerMessage.includes("công nghiệp") || lowerMessage.includes("industrial")) {
        style = "công nghiệp"
    } else if (lowerMessage.includes("mộc mạc") || lowerMessage.includes("rustic")) {
        style = "mộc mạc"
    }

    // Tạo lời khuyên dựa trên phòng và phong cách
    let advice = ""

    if (room === "phòng khách") {
        if (style === "hiện đại") {
            advice =
                "Đối với phòng khách phong cách hiện đại, bạn nên chọn:\n\n" +
                "1. Ghế sofa đơn giản với đường nét sạch sẽ, màu trung tính như xám, be hoặc trắng\n" +
                "2. Bàn cà phê hình học với mặt kính hoặc gỗ sáng màu\n" +
                "3. Kệ TV tối giản với không gian lưu trữ ẩn\n" +
                "4. Thảm trải sàn họa tiết đơn giản hoặc một màu\n" +
                "5. Đèn sàn hoặc đèn bàn kim loại với thiết kế đơn giản\n\n" +
                "Hãy giữ không gian thoáng đãng và tránh quá nhiều đồ trang trí."
        } else if (style === "cổ điển") {
            advice =
                "Đối với phòng khách phong cách cổ điển, bạn nên chọn:\n\n" +
                "1. Ghế sofa bọc vải hoa văn hoặc da với đường viền và chi tiết chạm khắc\n" +
                "2. Bàn cà phê gỗ tối với chân uốn cong và chi tiết chạm khắc\n" +
                "3. Tủ kệ gỗ tối với chi tiết trang trí\n" +
                "4. Thảm Ba Tư hoặc thảm hoa văn cổ điển\n" +
                "5. Đèn chùm pha lê hoặc đèn bàn với chân đế trang trí\n\n" +
                "Bạn có thể thêm các đồ trang trí như đồng hồ cổ, khung ảnh mạ vàng, và bình hoa cổ điển."
        } else if (style === "tối giản") {
            advice =
                "Đối vớii phòng khách phong cách tối giản, bạn nên chọn:\n\n" +
                "1. Ghế sofa đơn giản, đường nét sạch sẽ, màu trung tính\n" +
                "2. Bàn cà phê đơn giản với thiết kế chức năng\n" +
                "3. Kệ mở hoặc tủ kệ với thiết kế đơn giản\n" +
                "4. Thảm trải sàn một màu, không họa tiết\n" +
                "5. Đèn với thiết kế đơn giản, không trang trí\n\n" +
                "Hãy giữ số lượng đồ nội thất và trang trí ở mức tối thiểu, tuân theo nguyên tắc 'ít là nhiều'."
        }
    } else if (room === "phòng ngủ") {
        if (style === "hiện đại") {
            advice =
                "Đối với phòng ngủ phong cách hiện đại, bạn nên chọn:\n\n" +
                "1. Giường với khung đơn giản, đầu giường bọc nỉ hoặc da\n" +
                "2. Tủ đầu giường tối giản với ngăn kéo hoặc kệ mở\n" +
                "3. Tủ quần áo với cửa trượt hoặc thiết kế phẳng\n" +
                "4. Đèn treo hoặc đèn bàn với thiết kế hình học\n" +
                "5. Rèm cửa đơn sắc hoặc có họa tiết đơn giản\n\n" +
                "Sử dụng màu sắc trung tính như xám, be, trắng kết hợp với một màu nổi bật làm điểm nhấn."
        } else if (style === "Bắc Âu") {
            advice =
                "Đối với phòng ngủ phong cách Bắc Âu, bạn nên chọn:\n\n" +
                "1. Giường gỗ sáng màu với đường nét đơn giản\n" +
                "2. Tủ đầu giường gỗ sáng màu hoặc màu trắng\n" +
                "3. Tủ quần áo gỗ sáng với thiết kế đơn giản\n" +
                "4. Đèn với chao màu trắng hoặc gỗ nhẹ\n" +
                "5. Rèm cửa vải tự nhiên, màu sáng\n\n" +
                "Sử dụng màu sắc nhẹ nhàng như trắng, xám nhạt, xanh pastel và thêm các yếu tố tự nhiên như cây xanh."
        }
    }

    // Nếu không có lời khuyên cụ thể, tạo lời khuyên chung
    if (!advice) {
        advice =
            `Đối với ${room} phong cách ${style}, tôi khuyên bạn nên:\n\n` +
            "1. Chọn màu sắc phù hợp với phong cách và không gian\n" +
            "2. Lựa chọn đồ nội thất có kích thước phù hợp với diện tích phòng\n" +
            "3. Cân nhắc công năng sử dụng của từng món đồ\n" +
            "4. Kết hợp ánh sáng tự nhiên và nhân tạo một cách hài hòa\n" +
            "5. Thêm các chi tiết trang trí phù hợp với phong cách tổng thể\n\n" +
            "Bạn có muốn tôi gợi ý một số sản phẩm cụ thể cho không gian này không?"
    }

    // Tìm các sản phẩm phù hợp với phòng và phong cách
    const analysis = {
        categories: [room],
        styles: [style],
        keywords: [room, style],
        furnitureTypes: [],
        rawQuery: `${room} ${style}`,
    }

    const matchedProducts = findProductsByAnalysis(analysis)

    return {
        text: advice,
        products: matchedProducts.slice(0, 4),
        suggestions: [`Xem thêm sản phẩm cho ${room}`, `Tư vấn phong cách khác`, `Tư vấn cho phòng khác`, "Đặt hàng ngay"],
    }
}

// Hàm kiểm tra ý định tư vấn trang trí
const checkForDecorAdviceIntent = (message) => {
    const lowerMessage = message.toLowerCase().trim()

    // Kiểm tra các từ khóa liên quan đến tư vấn trang trí
    const decorKeywords = [
        "tư vấn trang trí",
        "decor",
        "trang trí",
        "thiết kế nội thất",
        "interior design",
        "phối đồ",
        "phối màu",
        "phong cách",
        "style",
    ]

    for (const keyword of decorKeywords) {
        if (lowerMessage.includes(keyword)) {
            return true
        }
    }

    return false
}

// Cập nhật hàm findResponse để xử lý các ý định mới
const findResponse = (message) => {
    // Lưu trữ tin nhắn vào ngữ cảnh cuộc trò chuyện
    conversationContext.lastQuery = message
    conversationContext.conversationHistory.push({ role: "user", content: message })

    // Kiểm tra xem có phải là lần đầu tiên người dùng nhắn tin không
    if (!conversationContext.greetingShown) {
        conversationContext.greetingShown = true
        // Hiển thị lời chào khi người dùng bắt đầu cuộc trò chuyện
        const greeting = greetings[Math.floor(Math.random() * greetings.length)]

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: greeting })

        return {
            text: greeting,
            products: chatService.getFeaturedProducts(),
            suggestions: popularSuggestions.slice(0, 5),
        }
    }

    // Kiểm tra các ý định khác nhau

    // Kiểm tra ý định chào hỏi
    if (checkForGreeting(message)) {
        const greeting = greetings[Math.floor(Math.random() * greetings.length)]

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: greeting })

        return {
            text: greeting,
            products: chatService.getFeaturedProducts(),
            suggestions: popularSuggestions.slice(0, 5),
        }
    }

    // Kiểm tra ý định cảm ơn
    if (checkForThanks(message)) {
        const response = "Rất vui được giúp đỡ bạn! Bạn còn cần hỗ trợ gì khác không?"

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: response })

        return {
            text: response,
            products: [],
            suggestions: ["Tìm sản phẩm khác", "Xem giỏ hàng", "Tư vấn trang trí", "Liên hệ nhân viên"],
        }
    }

    // Kiểm tra ý định tạm biệt
    if (checkForGoodbye(message)) {
        const response = "Cảm ơn bạn đã trò chuyện! Chúc bạn một ngày tốt lành. Hẹn gặp lại bạn sớm!"

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: response })

        return {
            text: response,
            products: [],
            suggestions: ["Tiếp tục mua sắm", "Xem giỏ hàng", "Đánh giá trải nghiệm"],
        }
    }

    // Kiểm tra câu hỏi thường gặp
    const faqCheck = checkForFAQ(message)
    if (faqCheck.isFAQ) {
        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: faqCheck.answer })

        return {
            text: faqCheck.answer,
            products: [],
            suggestions: faqCheck.relatedQuestions.map((q) => `${q}?`),
        }
    }

    // Kiểm tra ý định xem giỏ hàng
    if (checkForCartViewIntent(message)) {
        const cartResponse = viewCart()

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: cartResponse.text })

        return cartResponse
    }

    // Kiểm tra ý định xóa giỏ hàng
    if (checkForClearCartIntent(message)) {
        const clearResult = clearCart()

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: clearResult.message })

        return {
            text: clearResult.message + ". Bạn muốn tiếp tục tìm kiếm sản phẩm khác?",
            products: [],
            suggestions: popularSuggestions.slice(0, 5),
        }
    }

    // Kiểm tra ý định thêm vào giỏ hàng
    if (checkForAddToCartIntent(message)) {
        const cartResponse = processAddToCartIntent(message)

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: cartResponse.text })

        return cartResponse
    }

    // Kiểm tra ý định đặt hàng
    if (checkForOrderIntent(message)) {
        const orderResponse = processOrder(message)

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: orderResponse.text })

        return orderResponse
    }

    // Kiểm tra ý định hỗ trợ
    if (checkForHelpIntent(message)) {
        const helpResponse = processHelpIntent(message)

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: helpResponse.text })

        return helpResponse
    }

    // Kiểm tra ý định liên hệ nhân viên
    if (checkForContactStaffIntent(message)) {
        const contactResponse = processContactStaffIntent()

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: contactResponse.text })

        return contactResponse
    }

    // Kiểm tra ý định tư vấn trang trí
    if (checkForDecorAdviceIntent(message)) {
        const decorResponse = processDecorAdviceIntent(message)

        // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
        conversationContext.conversationHistory.push({ role: "assistant", content: decorResponse.text })

        return decorResponse
    }

    // Nếu không khớp với bất kỳ ý định nào, xử lý như tìm kiếm sản phẩm
    // Phân tích yêu cầu của khách hàng
    const analysis = analyzeRequest(message)

    // Tìm sản phẩm phù hợp
    const matchedProducts = findProductsByAnalysis(analysis)

    // Lưu trữ sản phẩm tìm thấy vào ngữ cảnh cuộc trò chuyện
    conversationContext.lastProducts = matchedProducts

    // Tạo phản hồi
    let response
    if (analysis.isComparison && matchedProducts.length >= 2) {
        response = createComparisonResponse(matchedProducts)
    } else {
        response = createResponse(analysis, matchedProducts)
    }

    // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
    conversationContext.conversationHistory.push({ role: "assistant", content: response.text })

    return response
}

// Cập nhật chatService để bao gồm các chức năng mới
export const chatService = {
    sendMessage: async (message, attachment = null) => {
        // Mô phỏng độ trễ của API
        await delay(1000 + Math.random() * 1000)

        // Xử lý tin nhắn có hình ảnh
        if (attachment) {
            // Khi người dùng gửi hình ảnh, chúng ta có thể gợi ý một số sản phẩm ngẫu nhiên
            // Trong thực tế, bạn có thể sử dụng AI để phân tích hình ảnh và đề xuất sản phẩm phù hợp
            const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4)

            const response = {
                text: "Cảm ơn bạn đã gửi hình ảnh. Dựa vào hình ảnh, tôi nghĩ những sản phẩm sau đây có thể phù hợp với nhu cầu của bạn:",
                products: randomProducts,
                suggestions: ["Xem thêm sản phẩm tương tự", "Tìm sản phẩm khác màu", "Tìm sản phẩm cùng loại giá rẻ hơn"],
            }

            // Lưu trữ phản hồi vào ngữ cảnh cuộc trò chuyện
            conversationContext.conversationHistory.push({ role: "user", content: "Đã gửi một hình ảnh" })
            conversationContext.conversationHistory.push({ role: "assistant", content: response.text })
            conversationContext.lastProducts = randomProducts

            return response
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

    // Hàm lấy lịch sử tìm kiếm
    getSearchHistory: () => {
        return searchHistory
    },

    // Hàm xóa lịch sử tìm kiếm
    clearSearchHistory: () => {
        searchHistory = []
        return { success: true }
    },

    // Hàm lấy gợi ý tìm kiếm
    getSuggestions: (query = "") => {
        return generateSmartSuggestions(query)
    },

    // Hàm lấy gợi ý phổ biến
    getPopularSuggestions: () => {
        return popularSuggestions
    },

    // Hàm tạo gợi ý tìm kiếm thông minh
    generateSmartSuggestions: (query) => {
        return generateSmartSuggestions(query)
    },

    // Hàm lấy giỏ hàng hiện tại
    getCart: () => {
        return conversationContext.cart
    },

    // Hàm thêm sản phẩm vào giỏ hàng
    addToCart: (productId, quantity = 1) => {
        return addToCart(productId, quantity)
    },

    // Hàm xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (productId) => {
        const index = conversationContext.cart.findIndex((item) => item.product.id === productId)

        if (index >= 0) {
            conversationContext.cart.splice(index, 1)
            return { success: true, message: "Đã xóa sản phẩm khỏi giỏ hàng" }
        }

        return { success: false, message: "Không tìm thấy sản phẩm trong giỏ hàng" }
    },

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    updateCartItemQuantity: (productId, quantity) => {
        const index = conversationContext.cart.findIndex((item) => item.product.id === productId)

        if (index >= 0) {
            conversationContext.cart[index].quantity = quantity
            return { success: true, message: "Đã cập nhật số lượng sản phẩm" }
        }

        return { success: false, message: "Không tìm thấy sản phẩm trong giỏ hàng" }
    },

    // Hàm xóa giỏ hàng
    clearCart: () => {
        return clearCart()
    },

    // Hàm lấy lịch sử cuộc trò chuyện
    getConversationHistory: () => {
        return conversationContext.conversationHistory
    },

    // Hàm xóa lịch sử cuộc trò chuyện
    clearConversationHistory: () => {
        conversationContext.conversationHistory = []
        return { success: true }
    },

    // Hàm lấy ngữ cảnh cuộc trò chuyện
    getConversationContext: () => {
        return conversationContext
    },

    // Hàm đặt tên người dùng
    setUserName: (name) => {
        conversationContext.userName = name
        return { success: true }
    },

    // Hàm lấy câu hỏi thường gặp
    getFAQs: () => {
        return Object.keys(faqData).map((key) => ({ question: key, answer: faqData[key] }))
    },

    // Hàm kiểm tra câu hỏi thường gặp
    checkForFAQ: (message) => {
        return checkForFAQ(message)
    },

    // Hàm lấy gợi ý tư vấn trang trí
    getDecorAdvice: (room, style) => {
        const message = `Tư vấn trang trí ${room} phong cách ${style}`
        return processDecorAdviceIntent(message)
    },
}

// Các hàm hỗ trợ (cần được định nghĩa hoặc import)
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// Các hàm này cần được định nghĩa hoặc import từ các module khác
const popularSuggestions = ["ghế sofa", "bàn ăn", "giường ngủ", "tủ quần áo", "đèn trang trí"]

// Giả định các hàm này được định nghĩa ở nơi khác và import vào đây
const analyzeRequest = (message) => {
    // Logic phân tích yêu cầu
    return {
        categories: [],
        styles: [],
        keywords: [],
        furnitureTypes: [],
        rawQuery: message,
        isComparison: false,
    }
}

const findProductsByAnalysis = (analysis) => {
    // Logic tìm kiếm sản phẩm
    return products.slice(0, 5) // Trả về 5 sản phẩm đầu tiên làm ví dụ
}

const createResponse = (analysis, products) => {
    // Logic tạo phản hồi
    return {
        text: "Đây là một số sản phẩm chúng tôi tìm thấy:",
        products: products,
        suggestions: ["Tìm sản phẩm tương tự", "Xem thêm sản phẩm"],
    }
}

const createComparisonResponse = (products) => {
    // Logic tạo phản hồi so sánh
    return {
        text: "Đây là so sánh giữa các sản phẩm:",
        products: products,
        suggestions: ["Xem chi tiết", "Chọn sản phẩm"],
    }
}

const generateSmartSuggestions = (query) => {
    // Logic tạo gợi ý tìm kiếm thông minh
    return popularSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
}
