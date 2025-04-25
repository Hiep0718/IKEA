"use client"

import { useState } from "react"
import { Button, Tabs, Rate, InputNumber } from "antd"
import Breadcrumb from "../components/Breadcrumb"
import ShippingBanner from "../components/ShippingBanner"
import { getImage, getProductImage } from "../utils/imageUtils"

const ProductPage = ({ navigateTo }) => {
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState("kallax")

  // Breadcrumb items for a specific product page
  const breadcrumbItems = [
    { label: "Products", path: "#" },
    { label: "Furniture", path: "#" },
    { label: "Storage & organization", path: "#" },
    { label: "KALLAX Shelf unit", path: "#" },
  ]

  // Product images
  const productImages = [
    { id: 1, key: "kallax", alt: "KALLAX Shelf unit main view" },
    { id: 2, key: "kallax", alt: "KALLAX Shelf unit side view" },
    { id: 3, key: "kallax", alt: "KALLAX Shelf unit with items" },
    { id: 4, key: "kallax", alt: "KALLAX Shelf unit in room setting" },
  ]

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Shipping Banner */}
      <ShippingBanner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button to return to home */}
        <button onClick={() => navigateTo("home")} className="mb-4 text-blue-600 hover:underline flex items-center">
          ← Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <img
              src={getProductImage(mainImage) || "/placeholder.svg"}
              alt="KALLAX Shelf unit"
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
            <h1 className="text-3xl font-bold mb-2">KALLAX Shelf unit</h1>
            <p className="text-xl text-gray-700 mb-4">$79.99</p>
            <div className="flex items-center mb-4">
              <Rate allowHalf defaultValue={4.5} disabled />
              <span className="ml-2 text-gray-500">(127 reviews)</span>
            </div>
            <p className="text-gray-600 mb-6">
              A simple, stylish storage solution that fits everywhere. Use it as a room divider, bookshelf or TV bench.
              KALLAX shelf unit can be placed on the floor or mounted on the wall.
            </p>

            {/* Color Options */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-white border border-gray-300 rounded-full"></button>
                <button className="w-10 h-10 bg-gray-800 border border-gray-300 rounded-full"></button>
                <button className="w-10 h-10 bg-blue-600 border border-gray-300 rounded-full"></button>
              </div>
            </div>

            {/* Size Options */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:border-blue-500">77x77 cm</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:border-blue-500">77x147 cm</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:border-blue-500">
                  147x147 cm
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <InputNumber min={1} max={10} value={quantity} onChange={setQuantity} className="w-24" />
            </div>

            {/* Add to Cart Button */}
            <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700 w-full mb-4">
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
                      <p>Dimensions: 77×39×77 cm</p>
                      <p>Material: Particleboard, Fiberboard, Plastic edging, Plastic edging</p>
                      <p>Max load per shelf: 13 kg</p>
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
                      <p>Average rating: 4.5/5 from 127 reviews</p>
                      <p>95% of customers would recommend this product</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
