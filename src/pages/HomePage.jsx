"use client"

import { Link, useNavigate } from "react-router-dom"
import { Button, Carousel } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"
import Breadcrumb from "../components/Breadcrumb"
import ShippingBanner from "../components/ShippingBanner"
import { getImage, getBannerImage } from "../utils/imageUtils"
import { useCart } from "../context/CartContext"

const HomePage = () => {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  // Breadcrumb items for the home page
  const breadcrumbItems = [
    { label: "Products", path: "/products" },
    { label: "Smart home", path: "/products?category=smart-home" },
  ]

  // Featured products data
  const featuredProducts = [
    {
      "id": 1,
      "name": "BILLY",
      "description": "Bookcase, white, 31 1/2x11x79 1/2\"",
      "price": "79.99",
      "currency": "$",
      "rating": 4.7,
      "reviews": 4532,
      "image": "https://www.ikea.com/us/en/images/products/billy-bookcase-white__0644757_pe702939_s5.jpg?f=s",
      "bestSeller": true,
      "lastChance": false,
      "categoryId": 1,
      "color": "white",
      "material": "wood",
      "tags": [
        "storage",
        "bookcase",
        "shelving"
      ]
    },
    {
      "id": 6,
      "name": "POÄNG",
      "description": "Armchair, birch veneer/Knisa light beige",
      "price": "149.99",
      "currency": "$",
      "rating": 4.8,
      "reviews": 2987,
      "image": "https://www.ikea.com/ext/ingkadam/m/c280f12c0638f54/original/PH187101.jpg?f=xl",
      "bestSeller": true,
      "lastChance": false,
      "categoryId": 1,
      "color": "beige",
      "material": "wood",
      "tags": [
        "chair",
        "armchair",
        "seating"
      ]
    },
    {
      "id": 3,
      "name": "MALM",
      "description": "Bed frame, high, white, Queen",
      "price": "199.99",
      "currency": "$",
      "rating": 4.6,
      "reviews": 2876,
      "image": "https://www.ikea.com/us/en/images/products/malm-bed-frame-high-white-luroey__0749130_pe745499_s5.jpg?f=s",
      "bestSeller": true,
      "lastChance": false,
      "categoryId": 2,
      "color": "white",
      "material": "wood",
      "tags": [
        "bed",
        "bedroom",
        "furniture"
      ]
    },
    {
      "id": 4,
      "name": "HEMNES",
      "description": "Wardrobe, white stain, 47 1/4x19 5/8x77 1/2\"",
      "price": "299.99",
      "currency": "$",
      "rating": 4.5,
      "reviews": 1876,
      "image": "https://www.ikea.com/us/en/images/products/hemnes-bed-frame-white-stain-luroey__0637516_pe698353_s5.jpg?f=s",
      "bestSeller": false,
      "lastChance": true,
      "categoryId": 2,
      "color": "white",
      "material": "wood",
      "tags": [
        "storage",
        "wardrobe",
        "clothes"
      ]
    }
  ]

  // Ideas and inspiration data
  const ideasInspiration = [
    {
      id: 1,
      key: "smallSpace",
      title: "Small space living ideas",
      description: "Make the most of your compact home with these clever solutions",
    },
    {
      id: 2,
      key: "bedroom",
      title: "Bedroom inspiration",
      description: "Create a relaxing retreat with our bedroom design ideas",
    },
    {
      id: 3,
      key: "kitchen",
      title: "Kitchen organization tips",
      description: "Smart storage solutions for a clutter-free kitchen",
    },
  ]

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  // Handle quick add to cart
  const handleQuickAddToCart = (e, product) => {
    e.stopPropagation() // Prevent navigating to product page
    addToCart(product, 1)
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Shipping Banner */}
      <ShippingBanner />

      {/* Hero Banner */}
      <div className="relative">
        <Carousel autoplay>
          <div>
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={getBannerImage("welcome") || "/placeholder.svg"}
                alt="IKEA Hero Banner"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-16"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
              >
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-3">Welcome to IKEA</h1>
                <p className="text-white text-lg md:text-xl mb-6 max-w-md">
                  Affordable home furnishing solutions for everyone
                </p>
                <div>
                  <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700 rounded-none px-6">
                    <Link to="/products">Shop now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={getBannerImage("spring") || "/placeholder.svg"}
                alt="IKEA Spring Collection"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
              >
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-3">Spring Collection 2025</h1>
                <p className="text-white text-lg md:text-xl mb-6 max-w-md">
                  Refresh your home with our new spring arrivals
                </p>
                <div>
                  <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700 rounded-none px-6">
                    <Link to="/products?collection=spring">Explore collection</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Featured Products Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer relative"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="mb-3 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-50 h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Quick add to cart button */}
                  <button
                    className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => handleQuickAddToCart(e, product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingCartOutlined style={{ fontSize: "18px" }} />
                  </button>
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="large">
              <Link to="/products">View all products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ideas & Inspiration Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Ideas & Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ideasInspiration.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={getImage(`inspiration.${idea.key || "/placeholder.svg"}`)}
                  alt={idea.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-medium mb-2">{idea.title}</h3>
                  <p className="text-gray-600 mb-4">{idea.description}</p>
                  <Button type="link" className="p-0 text-blue-600 font-medium">
                    Explore more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-green-50 rounded-lg p-6 md:p-10">
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">A more sustainable life at home</h2>
                <p className="text-gray-700 mb-6">
                  We're committed to creating a better everyday life for people and the planet. From sourcing materials
                  responsibly to designing products that can be recycled, we're working hard to transform our business.
                </p>
                <Button size="large">Learn more about sustainability</Button>
              </div>
              <div className="md:w-1/2">
                <img
                  src={getBannerImage("sustainability") || "/placeholder.svg"}
                  alt="Sustainability at IKEA"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
