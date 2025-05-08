"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Row, Col, Spin, Empty, Breadcrumb as AntBreadcrumb, Select, Pagination, Typography } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import ProductCard from "../components/ProductCard"
import SearchFilters from "../components/SearchFilters"
import productsData from "../data/products.json"

const { Title, Text } = Typography

const SearchPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [sortOrder, setSortOrder] = useState("relevance")
  const [activeFilters, setActiveFilters] = useState({})
  const [categories, setCategories] = useState([])

  // Load categories from JSON data
  useEffect(() => {
    setCategories(productsData.categories)
  }, [])

  // Search and filter products when parameters change
  useEffect(() => {
    if (query) {
      searchProducts()
    }
  }, [query, currentPage, pageSize, sortOrder, activeFilters])

  const searchProducts = async () => {
    setLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Filter products based on search query
      let filteredProducts = productsData.products.filter((product) => {
        const searchFields = [product.name, product.description, ...(product.tags || [])].map((field) =>
          field.toLowerCase(),
        )

        const searchTerms = query.toLowerCase().split(" ")

        // Check if any search term is included in any search field
        return searchTerms.some((term) => searchFields.some((field) => field.includes(term)))
      })

      // Apply category filter
      if (activeFilters.categoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId.toString() === activeFilters.categoryId.toString(),
        )
      }

      // Apply price range filter
      if (activeFilters.priceRange) {
        const [min, max] = activeFilters.priceRange
          .split("-")
          .map((val) => (val === "+" ? Number.POSITIVE_INFINITY : Number(val)))

        filteredProducts = filteredProducts.filter((product) => {
          const price = Number.parseFloat(product.price)
          return price >= min && (max === Number.POSITIVE_INFINITY || price <= max)
        })
      }

      // Apply special filters
      if (activeFilters.bestSeller) {
        filteredProducts = filteredProducts.filter((product) => product.bestSeller)
      }

      if (activeFilters.lastChance) {
        filteredProducts = filteredProducts.filter((product) => product.lastChance)
      }

      // Apply color filter
      if (activeFilters.color) {
        filteredProducts = filteredProducts.filter((product) => product.color === activeFilters.color)
      }

      // Apply material filter
      if (activeFilters.material) {
        filteredProducts = filteredProducts.filter((product) => product.material === activeFilters.material)
      }

      // Apply sorting
      if (sortOrder === "price_asc") {
        filteredProducts.sort((a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price))
      } else if (sortOrder === "price_desc") {
        filteredProducts.sort((a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price))
      } else if (sortOrder === "name_asc") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortOrder === "name_desc") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      } else if (sortOrder === "rating_desc") {
        filteredProducts.sort((a, b) => b.rating - a.rating)
      }

      // Store total count for pagination
      setTotalProducts(filteredProducts.length)

      // Apply pagination
      const startIndex = (currentPage - 1) * pageSize
      const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize)

      setProducts(paginatedProducts)
    } catch (error) {
      console.error("Error searching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      // If value is null/undefined, remove the filter
      if (value === null || value === undefined) {
        const newFilters = { ...prev }
        delete newFilters[filterType]
        return newFilters
      }

      // Otherwise, set or update the filter
      return {
        ...prev,
        [filterType]: value,
      }
    })

    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSortChange = (value) => {
    setSortOrder(value)
    setCurrentPage(1) // Reset to first page when sort changes
  }

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <AntBreadcrumb className="mb-4">
        <AntBreadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </AntBreadcrumb.Item>
        <AntBreadcrumb.Item>Search</AntBreadcrumb.Item>
        <AntBreadcrumb.Item>{query}</AntBreadcrumb.Item>
      </AntBreadcrumb>

      {/* Search Results Header */}
      <div className="mb-6">
        <Title level={2} className="mb-2">
          Search results for "{query}"
        </Title>
        <Text type="secondary">{totalProducts} products</Text>
      </div>

      {/* Filters and Sort */}
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <SearchFilters categories={categories} activeFilters={activeFilters} onFilterChange={handleFilterChange} />
        </Col>

        <Col xs={24} md={18}>
          {/* Sort dropdown */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <Select
                defaultValue="relevance"
                style={{ width: 180 }}
                onChange={handleSortChange}
                options={[
                  { value: "relevance", label: "Relevance" },
                  { value: "price_asc", label: "Price: Low to High" },
                  { value: "price_desc", label: "Price: High to Low" },
                  { value: "name_asc", label: "Name: A to Z" },
                  { value: "name_desc", label: "Name: Z to A" },
                  { value: "rating_desc", label: "Highest Rated" },
                ]}
              />
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Spin size="large" />
            </div>
          ) : products.length > 0 ? (
            <>
              <Row gutter={[16, 24]}>
                {products.map((product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalProducts}
                  onChange={handlePageChange}
                  showSizeChanger
                  pageSizeOptions={[12, 24, 48, 96]}
                />
              </div>
            </>
          ) : (
            <Empty
              description={
                <div className="text-center">
                  <p className="text-lg mb-2">No products found for "{query}"</p>
                  <p className="text-gray-500">Try using different keywords or removing filters</p>
                </div>
              }
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default SearchPage
