"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Typography } from "antd"
import { HomeOutlined, ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const NotFoundPage = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [suggestions] = useState([
    "BILLY Bookcase",
    "MALM Bed frame",
    "POÄNG Armchair",
    "KALLAX Shelf unit",
    "LACK Side table",
  ])

  useEffect(() => {
    // Start animation after component mounts
    setIsAnimating(true)
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Illustration */}
          <div className="w-full md:w-1/2 bg-blue-600 p-8 flex items-center justify-center relative overflow-hidden">
            <div
              className={`transition-all duration-1000 ${
                isAnimating ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              {/* IKEA-style furniture illustration */}
              <div className="relative">
                {/* Stylized room with missing furniture */}
                <div className="w-64 h-64 bg-blue-500 rounded-lg flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-400"></div>
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-700"></div>
                  <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>

                  {/* Missing furniture outline */}
                  <div className="w-32 h-40 border-4 border-dashed border-white rounded-md relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-blue-600 font-bold text-3xl px-4 py-1 rounded">
                      404
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-white rounded"></div>
                  </div>
                </div>

                {/* IKEA logo */}
                <div className="absolute -bottom-4 right-0 bg-blue-600 h-10 w-16 rounded flex items-center justify-center">
                  <div className="bg-yellow-400 h-6 w-12 rounded flex items-center justify-center border-2 border-blue-600">
                    <span className="text-blue-600 font-bold text-sm">IKEA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700 rounded-tr-full"></div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div
              className={`transition-all duration-700 delay-300 ${
                isAnimating ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <Title level={1} className="text-3xl md:text-4xl font-bold mb-4">
                Oops! Trang không tìm thấy
              </Title>

              <Paragraph className="text-gray-600 mb-6 text-lg">
                Có vẻ như món đồ nội thất bạn đang tìm kiếm đã được di chuyển hoặc không còn tồn tại trong danh mục của
                chúng tôi.
              </Paragraph>

              <div className="mb-8">
                <h3 className="font-medium mb-3">Bạn có thể thử tìm kiếm:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Link
                      key={index}
                      to={`/search?q=${encodeURIComponent(suggestion)}`}
                      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {suggestion}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="primary" size="large" icon={<HomeOutlined />} className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/">Về trang chủ</Link>
                </Button>

                <Button size="large" icon={<ArrowLeftOutlined />} onClick={() => window.history.back()}>
                  Quay lại trang trước
                </Button>

                <Button size="large" icon={<SearchOutlined />} onClick={() => (window.location.href = "/search")}>
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional help section */}
      <div
        className={`mt-8 text-center max-w-2xl transition-all duration-1000 delay-700 ${
          isAnimating ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h3 className="text-lg font-medium mb-2">Bạn cần thêm sự trợ giúp?</h3>
        <p className="text-gray-600 mb-4">
          Hãy liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi hoặc ghé thăm cửa hàng IKEA gần nhất.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/contact-us" className="text-blue-600 hover:underline">
            Liên hệ hỗ trợ
          </Link>
          <Link to="/stores" className="text-blue-600 hover:underline">
            Tìm cửa hàng
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
