"use client"

import { Button, Carousel } from "antd"
import Breadcrumb from "../components/Breadcrumb"
import ShippingBanner from "../components/ShippingBanner"

const HomePage = ({ navigateTo }) => {
  // Breadcrumb items for the home page
  const breadcrumbItems = [
    { label: "Products", path: "#products" },
    { label: "Smart home", path: "#smart-home" },
  ]

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "BILLY Bookcase",
      price: "$49.99",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "MALM Bed frame",
      price: "$179.00",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "POÄNG Armchair",
      price: "$99.00",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "KALLAX Shelf unit",
      price: "$79.99",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Ideas and inspiration data
  const ideasInspiration = [
    {
      id: 1,
      title: "Small space living ideas",
      description: "Make the most of your compact home with these clever solutions",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      title: "Bedroom inspiration",
      description: "Create a relaxing retreat with our bedroom design ideas",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      title: "Kitchen organization tips",
      description: "Smart storage solutions for a clutter-free kitchen",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  // Handle product click
  const handleProductClick = () => {
    navigateTo("product")
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
                src="/placeholder.svg?height=500&width=1200"
                alt="IKEA Hero Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center px-8 md:px-16">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Welcome to IKEA</h1>
                <p className="text-white text-lg md:text-xl mb-6 max-w-md">
                  Affordable home furnishing solutions for everyone
                </p>
                <div>
                  <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                    Shop now
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src="/placeholder.svg?height=500&width=1200"
                alt="IKEA Spring Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center px-8 md:px-16">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">Spring Collection 2025</h1>
                <p className="text-white text-lg md:text-xl mb-6 max-w-md">
                  Refresh your home with our new spring arrivals
                </p>
                <div>
                  <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                    Explore collection
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
              <div key={product.id} className="group cursor-pointer" onClick={handleProductClick}>
                <div className="mb-3 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-700">{product.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="large" onClick={handleProductClick}>
              View all products
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
                <img src={idea.image || "/placeholder.svg"} alt={idea.title} className="w-full h-48 object-cover" />
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
                  src="/placeholder.svg?height=300&width=500"
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
