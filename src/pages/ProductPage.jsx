"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { Button, Rate, Collapse } from "antd"
import {
  ArrowLeftOutlined,
  HeartOutlined,
  CheckOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  ClockCircleOutlined,
  CarOutlined,
  HomeOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons"
import Breadcrumb from "../components/Breadcrumb"
import ShippingBanner from "../components/ShippingBanner"
import { getImage, getProductImage } from "../utils/imageUtils"
import { useCart } from "../context/CartContext"
import productsData from "../data/products.json"

const { Panel } = Collapse

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState("")
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [accessories, setAccessories] = useState([])
  const mainImageRef = useRef(null)
  const { productId } = useParams()
  const { addToCart } = useCart()

  // Fetch product data
  useEffect(() => {
    setLoading(true)
    window.scrollTo(0, 0)
    try {
      const foundProduct = productsData.products.find((p) => p.id.toString() === productId)
      if (foundProduct) {
        setProduct(foundProduct)
        setMainImage(foundProduct.image || getProductImage(foundProduct.key || foundProduct.id.toString()))
        setSelectedColor(foundProduct.color)

        // Get related products (same category)
        const related = productsData.products
          .filter((p) => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
          .slice(0, 4)
        setRelatedProducts(related)

        // Get recommended products (based on tags)
        const recommended = productsData.products
          .filter((p) => p.id !== foundProduct.id && p.tags.some((tag) => foundProduct.tags.includes(tag)))
          .slice(0, 4)
        setRecommendedProducts(recommended)

        // Get accessories (different category but complementary)
        const accessoryCategories = [8, 9, 12] // Assuming these are accessory category IDs
        const productAccessories = productsData.products
          .filter((p) => accessoryCategories.includes(p.categoryId))
          .slice(0, 8)
        setAccessories(productAccessories)
      }
    } catch (error) {
      console.error("Error loading product:", error)
    } finally {
      setLoading(false)
    }
  }, [productId])

  // Save to recently viewed
  useEffect(() => {
    if (product) {
      try {
        const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
        // Add current product to the beginning if not already there
        if (!recentlyViewed.includes(product.id.toString())) {
          const updatedRecent = [product.id.toString(), ...recentlyViewed].slice(0, 10)
          localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent))
        }
      } catch (error) {
        console.error("Error updating recently viewed products:", error)
      }
    }
  }, [product])

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
    {
      id: 1,
      image: product.image || getProductImage(product.key || product.id.toString()),
      alt: `${product.name} main view`,
    },
    { id: 2, image: product.image, alt: `${product.name} side view` },
    { id: 3, image: product.image, alt: `${product.name} with items` },
    { id: 4, image: product.image, alt: `${product.name} in room setting` },
    { id: 5, image: product.image, alt: `${product.name} detail view` },
  ]

  // Available colors
  const availableColors = [
    { name: product.color, value: product.color },
    { name: "black", value: "black" },
    { name: "white", value: "white" },
  ]

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      key: product.key || product.id.toString(),
      name: product.name,
      price: Number.parseFloat(product.price),
      quantity,
      image: product.image,
    })
  }

  // Handle image click
  const handleImageClick = (image) => {
    setMainImage(image)
    if (mainImageRef.current) {
      mainImageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Format price with commas
  const formatPrice = (price) => {
    return Number.parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Shipping Banner */}
      <ShippingBanner />

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Back button to return to products */}
        <Link to="/products" className="mb-6 text-gray-600 hover:text-blue-600 flex items-center text-sm">
          <ArrowLeftOutlined className="mr-2" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Product Images - Left Column */}
          <div className="lg:col-span-7">
            {/* Thumbnail Gallery - Vertical */}
            <div className="flex flex-row lg:flex-row gap-4">
              <div className="hidden lg:flex flex-col gap-2 w-20">
                {productImages.map((img) => (
                  <div
                    key={img.id}
                    className={`border rounded cursor-pointer hover:border-blue-500 ${mainImage === img.image ? "border-blue-500" : "border-gray-200"}`}
                    onClick={() => handleImageClick(img.image)}
                  >
                    <img src={img.image || "/placeholder.svg"} alt={img.alt} className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1" ref={mainImageRef}>
                <div className="relative group">
                  <img src={mainImage || "/placeholder.svg"} alt={product.name} className="w-full h-auto rounded-sm" />
                  <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex lg:hidden gap-2 mt-4 overflow-x-auto pb-2">
              {productImages.map((img) => (
                <div
                  key={img.id}
                  className={`border rounded cursor-pointer flex-shrink-0 w-20 ${mainImage === img.image ? "border-blue-500" : "border-gray-200"}`}
                  onClick={() => handleImageClick(img.image)}
                >
                  <img src={img.image || "/placeholder.svg"} alt={img.alt} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>

            {/* Product Description */}
            <div className="mt-8">
              <p className="text-gray-700">
                {product.description}. Made of {product.material} that's good for you and your home for a long time –
                and comes with our 10-year limited warranty. Smooth-running drawers and practical storage space make it
                a reliable piece for your daily needs.
              </p>
            </div>
          </div>

          {/* Product Details - Right Column */}
          <div className="lg:col-span-5">
            {/* Product Title and Article Number */}
            <div className="mb-1 flex justify-between items-start">
              <h1 className="text-2xl font-bold">{product.name.toUpperCase()}</h1>
              <button className="text-gray-500 hover:text-black">
                <HeartOutlined style={{ fontSize: "24px" }} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
            <p className="text-xs text-gray-500 mb-4">Article no. {product.id.toString().padStart(8, "0")}</p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <Rate allowHalf defaultValue={product.rating} disabled className="text-sm" />
              <span className="ml-2 text-gray-500 text-sm">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-3xl font-semibold">
                {product.currency}
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Color Options */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Choose color</p>
                <button className="text-xs text-blue-600">See all variations</button>
              </div>
              <div className="flex gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-12 h-12 rounded-full border-2 ${selectedColor === color.value ? "border-blue-500" : "border-gray-300"}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                    aria-label={`Select ${color.name} color`}
                  >
                    {selectedColor === color.value && (
                      <div className="flex items-center justify-center h-full">
                        <CheckOutlined style={{ color: color.value === "white" ? "black" : "white" }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">How many?</p>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex border rounded-md">
                  <button className="px-3 py-1 border-r" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="w-12 text-center py-1 border-none focus:outline-none"
                  />
                  <button className="px-3 py-1 border-l" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
                <p className="text-sm text-gray-500">In stock</p>
              </div>

              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 w-full !mb-3 h-12 rounded-full"
                onClick={handleAddToCart}
              >
                Add to bag
              </Button>

              <Button size="large" className="w-full mb-4 h-12 rounded-full border-gray-300">
                Save to shopping list
              </Button>
            </div>

            {/* Delivery Options */}
            <div className="border rounded-md p-4 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1">
                  <HomeOutlined />
                </div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-gray-600">Check availability at your location</p>
                  <button className="text-sm text-blue-600 mt-1">Enter zip code</button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <EnvironmentOutlined />
                </div>
                <div>
                  <p className="font-medium">
                    In stock at <span className="text-blue-600">Brooklyn</span>
                  </p>
                  <p className="text-sm text-gray-600">Check other stores</p>
                </div>
              </div>
            </div>

            {/* Product Benefits */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ClockCircleOutlined />
                <p className="text-sm">10-year limited warranty. Read about the terms</p>
              </div>
              <div className="flex items-center gap-2">
                <CarOutlined />
                <p className="text-sm">Delivery service with assembly available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="mb-12">
          <Collapse
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            className="bg-white border-t border-b border-l-0 border-r-0"
          >
            <Panel header={<span className="font-medium">Product details</span>} key="1" className="pb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-2">Key features</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Made from solid {product.material} for durability</li>
                    <li>Smooth-running drawers with pull-out stop</li>
                    <li>Can be used as a room divider</li>
                    <li>Adjustable feet for stability on uneven floors</li>
                    <li>Coordinates with other furniture in the {product.name} series</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Good to know</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>This furniture must be secured to the wall with the enclosed wall anchoring device</li>
                    <li>Different wall materials require different types of fasteners (not included)</li>
                    <li>Recommended for indoor use only</li>
                    <li>Clean with a damp cloth</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Materials</h3>
                <p className="text-gray-700">
                  Main parts: Solid {product.material}
                  <br />
                  Drawer bottom: Fiberboard
                  <br />
                  Drawer sides/back: Solid {product.material}
                  <br />
                </p>
              </div>
            </Panel>

            <Panel header={<span className="font-medium">Measurements</span>} key="2" className="pb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={getImage(`placeholders.productLarge`) || "/placeholder.svg"}
                    alt="Product dimensions"
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Dimensions</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Width</td>
                        <td className="py-2 text-right">31 1/2" (80 cm)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Depth</td>
                        <td className="py-2 text-right">19 5/8" (50 cm)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Height</td>
                        <td className="py-2 text-right">37 3/4" (96 cm)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Weight</td>
                        <td className="py-2 text-right">88 lb (40 kg)</td>
                      </tr>
                      <tr>
                        <td className="py-2">Package(s)</td>
                        <td className="py-2 text-right">3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Panel>

            <Panel
              header={
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">Customer reviews</span>
                  <div className="flex items-center mr-8">
                    <Rate allowHalf defaultValue={product.rating} disabled className="text-sm mr-2" />
                    <span className="text-gray-500">({product.reviews})</span>
                  </div>
                </div>
              }
              key="3"
              className="pb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Rate allowHalf defaultValue={5} disabled className="text-sm" />
                  </div>
                  <p className="text-sm mb-3">
                    "This is a great quality dresser for the price. Assembly was straightforward and the drawers slide
                    smoothly."
                  </p>
                  <p className="text-xs text-gray-500">John D. - 3 months ago</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Rate allowHalf defaultValue={4} disabled className="text-sm" />
                  </div>
                  <p className="text-sm mb-3">
                    "Very sturdy and looks great in our bedroom. Assembly took about 2 hours but instructions were
                    clear."
                  </p>
                  <p className="text-xs text-gray-500">Sarah M. - 1 month ago</p>
                </div>

                <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-bold mb-2">{product.rating}</div>
                  <div className="flex items-center mb-4">
                    <Rate allowHalf defaultValue={product.rating} disabled className="text-sm" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Based on {product.reviews} reviews</p>
                  <div className="mt-4">
                    <Button className="rounded-full">Read all reviews</Button>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

        {/* Accessories Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">Accessories for {product.name}</h2>
            <Button type="text" className="flex items-center">
              View all accessories <RightOutlined className="ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {accessories.slice(0, 4).map((accessory) => (
              <Link to={`/product/${accessory.id}`} key={accessory.id} className="group">
                <div className="border rounded-md p-2 transition-all hover:shadow-md">
                  <div className="relative">
                    <img
                      src={accessory.image || getProductImage(accessory.key || accessory.id.toString())}
                      alt={accessory.name}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                  <h3 className="font-medium text-sm">{accessory.name}</h3>
                  <p className="text-xs text-gray-500">{accessory.description}</p>
                  <p className="font-medium mt-1">
                    {accessory.currency}
                    {formatPrice(accessory.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">Related products</h2>
            <Button type="text" className="flex items-center">
              View all <RightOutlined className="ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="group">
                <div className="border rounded-md p-2 transition-all hover:shadow-md">
                  <div className="relative">
                    <img
                      src={relatedProduct.image || getProductImage(relatedProduct.key || relatedProduct.id.toString())}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                  <h3 className="font-medium text-sm">{relatedProduct.name}</h3>
                  <p className="text-xs text-gray-500">{relatedProduct.description}</p>
                  <p className="font-medium mt-1">
                    {relatedProduct.currency}
                    {formatPrice(relatedProduct.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-3">Solid wood</h3>
              <p className="text-sm text-gray-700">
                Solid wood is a natural living material. It has a warm, beautiful surface that makes every piece of
                furniture unique. The wood comes from responsibly managed forests and we use every log as efficiently as
                possible.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">Anchor and unlock - reduces the tip-over risk</h3>
              <p className="text-sm text-gray-700">
                Furniture must be securely attached to the wall. This furniture includes a wall anchoring device to
                reduce the risk of tip-over. Different wall materials require different types of fasteners. Use
                fasteners suitable for the walls in your home.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-3">Designer thoughts</h3>
              <p className="text-sm text-gray-700">
                "When designing {product.name}, I wanted to create a versatile and timeless piece that works in many
                different homes and settings. The clean lines and natural materials give it a Scandinavian feel, while
                the practical storage makes everyday life a little easier."
              </p>
              <p className="text-sm font-medium mt-2">- IKEA Designer</p>
            </div>
          </div>
        </div>

        {/* Get the Look Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium mb-6">Get the look</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative group cursor-pointer">
              <img
                src="https://www.ikea.com/ext/ingkadam/m/3f7cd70b99fb5f49/original/PH167208-crop001.jpg?f=xxs"
                alt="Room inspiration"
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black opacity-5 group-hover:bg-opacity-20 transition-all duration-300 rounded-md"></div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                src="https://www.ikea.com/ext/ingkadam/m/16ec89677c7dc2b9/original/PH194111.jpg?f=xxs"
                alt="Room inspiration"
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black opacity-5 group-hover:bg-opacity-20 transition-all duration-300 rounded-md"></div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                src="https://www.ikea.com/ext/ingkadam/m/45a33f3f7856e982/original/PH198034.JPG?f=xxs"
                alt="Room inspiration"
                className="w-full h-64 object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black opacity-5 group-hover:bg-opacity-20 transition-all duration-300 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">Recommended for you</h2>
            <Button type="text" className="flex items-center">
              View all <RightOutlined className="ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((recommendedProduct) => (
              <Link to={`/product/${recommendedProduct.id}`} key={recommendedProduct.id} className="group">
                <div className="border rounded-md p-2 transition-all hover:shadow-md">
                  <div className="relative">
                    <img
                      src={
                        recommendedProduct.image ||
                        getProductImage(recommendedProduct.key || recommendedProduct.id.toString())
                      }
                      alt={recommendedProduct.name}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                  <h3 className="font-medium text-sm">{recommendedProduct.name}</h3>
                  <p className="text-xs text-gray-500">{recommendedProduct.description}</p>
                  <p className="font-medium mt-1">
                    {recommendedProduct.currency}
                    {formatPrice(recommendedProduct.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
