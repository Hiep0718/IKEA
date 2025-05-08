"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, Rate } from "antd"
import { getProductImage } from "../utils/imageUtils"
import productsData from "../data/products.json"

const RecentlyViewedProducts = () => {
  const [recentProducts, setRecentProducts] = useState([])

  useEffect(() => {
    // Get recently viewed products from localStorage
    const getRecentlyViewed = () => {
      try {
        const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")

        // Map IDs to actual product objects
        const products = recentlyViewed
          .map((id) => productsData.products.find((p) => p.id.toString() === id.toString()))
          .filter(Boolean) // Filter out any undefined products
          .slice(0, 4) // Only take the 4 most recent

        setRecentProducts(products)
      } catch (error) {
        console.error("Error loading recently viewed products:", error)
        setRecentProducts([])
      }
    }

    getRecentlyViewed()

    // Add event listener to refresh the list when storage changes
    window.addEventListener("storage", getRecentlyViewed)

    return () => {
      window.removeEventListener("storage", getRecentlyViewed)
    }
  }, [])

  if (recentProducts.length === 0) {
    return null
  }

  return (
    <div className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm đã xem gần đây</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recentProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image || getProductImage(product.key) || "/placeholder.svg"}
                    className="h-48 object-cover"
                  />
                }
                className="overflow-hidden h-full"
              >
                <div className="mb-1">{product.name}</div>
                <div className="text-gray-500 text-sm mb-1">{product.description}</div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    {product.currency}
                    {product.price}
                  </span>
                  <Rate disabled defaultValue={product.rating} allowHalf className="text-sm" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentlyViewedProducts
