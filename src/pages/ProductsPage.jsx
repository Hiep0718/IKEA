"use client"

import { useState, useEffect } from "react"
import { Input, Select, Checkbox, Slider, Rate, Tag, Button, Pagination, Radio, Empty } from "antd"
import { SearchOutlined, FilterOutlined, SortAscendingOutlined } from "@ant-design/icons"
import Breadcrumb from "../components/Breadcrumb"
import { useCart } from "../context/CartContext"
import productsData from "../data/products.json"

const { Option } = Select

const ProductsPage = ({ navigateTo }) => {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1200])
  const [sortBy, setSortBy] = useState("featured")
  const [filtersVisible, setFiltersVisible] = useState(true)

  const pageSize = 12

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Trang chủ", path: "#" },
    { label: "Sản phẩm", path: "#" },
  ]

  // Load products and categories
  useEffect(() => {
    try {
      setProducts(productsData.products)
      setCategories(productsData.categories)
      setLoading(false)
    } catch (error) {
      console.error("Error loading products:", error)
      setLoading(false)
    }
  }, [])

  // Filter products based on selected filters
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products]

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.tags.some((tag) => tag.toLowerCase().includes(query)),
        )
      }

      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter((product) => product.categoryId === selectedCategory)
      }

      // Filter by colors
      if (selectedColors.length > 0) {
        filtered = filtered.filter((product) => selectedColors.includes(product.color))
      }

      // Filter by materials
      if (selectedMaterials.length > 0) {
        filtered = filtered.filter((product) => selectedMaterials.includes(product.material))
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) =>
          Number.parseFloat(product.price) >= priceRange[0] && Number.parseFloat(product.price) <= priceRange[1],
      )

      // Sort products
      switch (sortBy) {
        case "price-asc":
          filtered.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
          break
        case "price-desc":
          filtered.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "reviews":
          filtered.sort((a, b) => b.reviews - a.reviews)
          break
        case "name-asc":
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "name-desc":
          filtered.sort((a, b) => b.name.localeCompare(a.name))
          break
        default:
          // Default sort: featured (best sellers first)
          filtered.sort((a, b) => (a.bestSeller === b.bestSeller ? 0 : a.bestSeller ? -1 : 1))
      }

      setFilteredProducts(filtered)
      setCurrentPage(1)
    }
  }, [products, searchQuery, selectedCategory, selectedColors, selectedMaterials, priceRange, sortBy])

  // Get all available colors from products
  const availableColors = [...new Set(products.map((product) => product.color))]

  // Get all available materials from products
  const availableMaterials = [...new Set(products.map((product) => product.material))]

  // Get max price from products
  const maxPrice = Math.max(...products.map((product) => Number.parseFloat(product.price)))

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
  }

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  // Handle material selection
  const handleMaterialChange = (material) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  // Handle price range change
  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value)
  }

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: Number.parseFloat(product.price),
      image: product.image,
      quantity: 1,
    })
  }

  // Handle product click
  const handleProductClick = (product) => {
    // In a real app, you would navigate to the product detail page
    console.log("Product clicked:", product)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory(null)
    setSelectedColors([])
    setSelectedMaterials([])
    setPriceRange([0, maxPrice])
    setSortBy("featured")
  }

  // Calculate pagination
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : ""
  }

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible)
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button to return to home */}
        <button onClick={() => navigateTo("home")} className="mb-6 text-blue-600 hover:underline flex items-center">
          ← Quay lại trang chủ
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="md:hidden mb-4">
            <Button icon={<FilterOutlined />} onClick={toggleFilters} className="w-full">
              {filtersVisible ? "Ẩn bộ lọc" : "Hiển thị bộ lọc"}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div
            className={`${
              filtersVisible ? "block" : "hidden"
            } md:block w-full md:w-64 lg:w-72 flex-shrink-0 transition-all duration-300`}
          >
            <div className="bg-white p-4 border border-gray-200 rounded-lg sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bộ lọc</h2>
                <Button size="small" onClick={resetFilters}>
                  Đặt lại
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Tìm kiếm</h3>
                <Input
                  placeholder="Tìm sản phẩm..."
                  prefix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={handleSearch}
                  allowClear
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Danh mục</h3>
                <Radio.Group value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <Radio value={category.id}>{category.name}</Radio>
                      </div>
                    ))}
                  </div>
                </Radio.Group>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  Giá (${priceRange[0]} - ${priceRange[1]})
                </h3>
                <Slider
                  range
                  min={0}
                  max={Math.ceil(maxPrice)}
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>$0</span>
                  <span>${Math.ceil(maxPrice)}</span>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Màu sắc</h3>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColors.includes(color) ? "border-blue-500" : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Chất liệu</h3>
                <div className="space-y-2">
                  {availableMaterials.map((material) => (
                    <div key={material} className="flex items-center">
                      <Checkbox
                        checked={selectedMaterials.includes(material)}
                        onChange={() => handleMaterialChange(material)}
                      >
                        {material.charAt(0).toUpperCase() + material.slice(1)}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-grow">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-600">
                  Hiển thị {filteredProducts.length} sản phẩm{" "}
                  {selectedCategory && `trong ${getCategoryName(selectedCategory)}`}
                </p>
              </div>
              <div className="flex items-center">
                <SortAscendingOutlined className="mr-2" />
                <Select value={sortBy} onChange={handleSortChange} style={{ width: 180 }} placeholder="Sắp xếp theo">
                  <Option value="featured">Nổi bật</Option>
                  <Option value="price-asc">Giá: Thấp đến cao</Option>
                  <Option value="price-desc">Giá: Cao đến thấp</Option>
                  <Option value="rating">Đánh giá cao nhất</Option>
                  <Option value="reviews">Nhiều đánh giá nhất</Option>
                  <Option value="name-asc">Tên: A-Z</Option>
                  <Option value="name-desc">Tên: Z-A</Option>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onClick={() => handleProductClick(product)}
                      />
                      {product.bestSeller && (
                        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                          Bán chạy
                        </div>
                      )}
                      {product.lastChance && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Cơ hội cuối
                        </div>
                      )}
                      <button
                        className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={() => handleAddToCart(product)}
                      >
                        +
                      </button>
                    </div>
                    <div className="p-4" onClick={() => handleProductClick(product)}>
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex items-center mb-2">
                        <Rate disabled defaultValue={product.rating} allowHalf className="text-sm" />
                        <span className="text-gray-500 text-xs ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg">
                          {product.currency}
                          {product.price}
                        </p>
                        <Tag color="blue">{getCategoryName(product.categoryId)}</Tag>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="Không tìm thấy sản phẩm nào phù hợp" />
            )}

            {/* Pagination */}
            {filteredProducts.length > pageSize && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  onChange={setCurrentPage}
                  total={filteredProducts.length}
                  pageSize={pageSize}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
