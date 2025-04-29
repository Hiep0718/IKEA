"use client";

import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Spin,
  Empty,
  Breadcrumb,
  Select,
  Pagination,
  Typography,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import ProductCard from "../components/ProductCard";
import SearchFilters from "../components/SearchFilters";

const { Title, Text } = Typography;

const SearchPage = ({ navigateTo, searchParams = {} }) => {
  const query = searchParams.query || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [activeFilters, setActiveFilters] = useState({});
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when search params change
  useEffect(() => {
    if (query) {
      fetchProducts();
    }
  }, [query, currentPage, pageSize, sortOrder, activeFilters]);

  const fetchCategories = async () => {
    try {
      // This would typically be an API call
      // For demo purposes, we'll use mock data
      setCategories([
        { id: 1, name: "Living Room" },
        { id: 2, name: "Bedroom" },
        { id: 3, name: "Kitchen" },
        { id: 4, name: "Bathroom" },
        { id: 5, name: "Office" },
        { id: 6, name: "Children" },
        { id: 7, name: "Outdoor" },
      ]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // This would typically be an API call
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock data - in a real app, this would come from your API
      const mockProducts = Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        name: `${query.toUpperCase()} Product ${i + 1}`,
        description: `Description for ${query} item ${i + 1}`,
        price: ((i + 1) * 19.99).toFixed(2),
        image: `/images/product-${(i % 8) + 1}.jpg`,
        rating: 3 + Math.random() * 2,
        reviews: Math.floor(Math.random() * 1000),
        bestSeller: i % 7 === 0,
        lastChance: i % 11 === 0,
        categoryId: (i % 7) + 1,
      }));

      // Apply filters
      let filteredProducts = [...mockProducts];

      if (activeFilters.categoryId) {
        filteredProducts = filteredProducts.filter(
          (p) => p.categoryId.toString() === activeFilters.categoryId.toString()
        );
      }

      if (activeFilters.bestSeller) {
        filteredProducts = filteredProducts.filter((p) => p.bestSeller);
      }

      if (activeFilters.lastChance) {
        filteredProducts = filteredProducts.filter((p) => p.lastChance);
      }

      // Apply sorting
      if (sortOrder === "price_asc") {
        filteredProducts.sort(
          (a, b) => Number.parseFloat(a.price) - Number.parseFloat(b.price)
        );
      } else if (sortOrder === "price_desc") {
        filteredProducts.sort(
          (a, b) => Number.parseFloat(b.price) - Number.parseFloat(a.price)
        );
      } else if (sortOrder === "name_asc") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === "name_desc") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortOrder === "rating_desc") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
      }

      // Calculate pagination
      const totalCount = filteredProducts.length;
      setTotalProducts(totalCount);

      // Get current page items
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + pageSize
      );

      setProducts(paginatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (productId) => {
    navigateTo("product", { productId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
          >
            <HomeOutlined />
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Search</Breadcrumb.Item>
        <Breadcrumb.Item>{query}</Breadcrumb.Item>
      </Breadcrumb>

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
          <SearchFilters
            categories={categories}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
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
                    <ProductCard
                      product={product}
                      onClick={() => handleProductClick(product.id)}
                    />
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
                  <p className="text-lg mb-2">
                    No products found for "{query}"
                  </p>
                  <p className="text-gray-500">
                    Try using different keywords or removing filters
                  </p>
                </div>
              }
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
