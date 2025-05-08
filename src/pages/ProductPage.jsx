"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button, Tabs, Rate, InputNumber } from "antd"
import Breadcrumb from "../components/Breadcrumb"
import ShippingBanner from "../components/ShippingBanner"
import { getImage, getProductImage } from "../utils/imageUtils"
import { useCart } from "../context/CartContext"
import productsData from "../data/products.json"

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState("")
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { productId } = useParams()
  const { addToCart } = useCart()

  // Fetch product data
  useEffect(() => {
    setLoading(true)
    try {
      const foundProduct = productsData.products.find((p) => p.id.toString() === productId)
      if (foundProduct) {
        setProduct(foundProduct)
        setMainImage(foundProduct.key || foundProduct.id.toString())
      }
    } catch (error) {
      console.error("Error loading product:", error)
    } finally {
      setLoading(false)
    }
  }, [productId])

  if (loading || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Breadcrumb items for a specific product page
  const category = productsData.categories.find((c) => c.id === product.categoryId)
  const breadcrumbItems = [
    { label: "Products", path: "/products" },
    { label: category?.name || "Category", path: `/products/${category?.slug || ""}` },
    { label: product.name, path: `/product/${product.id}` },
  ]

  // Product images
  const productImages = [
    { id: 1, key: product.key || product.id.toString(), alt: `${product.name} main view` },
    { id: 2, key: product.key || product.id.toString(), alt: `${product.name} side view` },
    { id: 3, key: product.key || product.id.toString(), alt: `${product.name} with items` },
    { id: 4, key: product.key || product.id.toString(), alt: `${product.name} in room setting` },
  ]

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      key: product.key || product.id.toString(),
      name: product.name,
      price: Number.parseFloat(product.price),
      quantity,
    })
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Shipping Banner */}
      <ShippingBanner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button to return to home */}
        <Link to="/products" className="mb-4 text-blue-600 hover:underline flex items-center">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <img
              src={product.image || getProductImage(mainImage) || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {productImages.map((img) => (
                <img
                  key={img.id}
                  src={getImage(`placeholders.productThumbnail`) || "/placeholder.svg"}
                  alt={img.alt}
                  className="w-full h-auto rounded-md cursor-pointer border hover:border-blue-500"
                  onClick={() => setMainImage(img.key)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">
              {product.currency}
              {product.price}
            </p>
            <div className="flex items-center mb-4">
              <Rate allowHalf defaultValue={product.rating} disabled />
              <span className="ml-2 text-gray-500">({product.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Color Options */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-3">
                <button
                  className={`w-10 h-10 bg-${product.color} border border-gray-300 rounded-full`}
                  title={product.color}
                ></button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <InputNumber min={1} max={10} value={quantity} onChange={setQuantity} className="w-24" />
            </div>

            {/* Add to Cart Button */}
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700 w-full mb-4"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>

            {/* Additional Buttons */}
            <div className="flex space-x-4 mb-6">
              <Button size="large" className="flex-1">
                Add to list
              </Button>
              <Button size="large" className="flex-1">
                Save for later
              </Button>
            </div>

            {/* Product Information Tabs */}
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Product details",
                  children: (
                    <div>
                      <p>Material: {product.material}</p>
                      <p>Tags: {product.tags.join(", ")}</p>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: "Delivery & returns",
                  children: (
                    <div>
                      <p>Standard delivery: 3-5 business days</p>
                      <p>Express delivery: 1-2 business days (additional fee)</p>
                      <p>Returns accepted within 365 days with receipt</p>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: "Reviews",
                  children: (
                    <div>
                      <p>
                        Average rating: {product.rating}/5 from {product.reviews} reviews
                      </p>
                      <p>95% of customers would recommend this product</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
      {/* Recently Viewed Products */}
    </div>
  )
}

export default ProductPage
