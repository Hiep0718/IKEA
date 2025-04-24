"use client"

import { useState, useRef } from "react"
import { Button, Dropdown } from "antd"
import { MenuOutlined, DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons"

const IkeaNavigation = () => {
  const [activeSection, setActiveSection] = useState("products")
  const productScrollRef = useRef(null)
  const roomScrollRef = useRef(null)

  // Main navigation items
  const navItems = [
    { key: "products", label: "Products" },
    { key: "rooms", label: "Rooms" },
    { key: "deals", label: "Deals" },
    { key: "spring-home-ideas", label: "Spring home ideas" },
    { key: "home-accessories", label: "Home accessories" },
    { key: "ideas-inspiration", label: "Ideas & inspiration" },
    { key: "design-planning", label: "Design & planning" },
    { key: "ikea-business", label: "IKEA for Business" },
    { key: "services-support", label: "Services & support" },
  ]

  // Extended product categories for the scrollable section
  const productCategories = [
    {
      key: "new-trending",
      label: "New & trending",
      icon: null,
      color: "bg-orange-600",
      textColor: "text-white",
      text: "New",
    },
    {
      key: "offers",
      label: "Offers",
      icon: null,
      color: "bg-yellow-400",
      textColor: "text-black",
      text: "DEALS",
    },
    {
      key: "storage",
      label: "Storage & organization",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "sofas",
      label: "Sofas & armchairs",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "outdoor",
      label: "Outdoor",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "beds",
      label: "Beds & mattresses",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "lighting",
      label: "Lighting",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "textiles",
      label: "Home textiles",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "kitchen",
      label: "Kitchen, appliances & supplies",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "desk",
      label: "Desk & desk chairs",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "tables",
      label: "Tables & chairs",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "decor",
      label: "Home decor & accessories",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "kitchenware",
      label: "Kitchenware & tableware",
      image: "/placeholder.svg?height=80&width=80",
    },
    // Additional product categories
    {
      key: "bathroom",
      label: "Bathroom products",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "children",
      label: "Children's IKEA",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "plants",
      label: "Plants & plant pots",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "mirrors",
      label: "Mirrors & frames",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "rugs",
      label: "Rugs & mats",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "curtains",
      label: "Curtains & blinds",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "cookware",
      label: "Cookware & bakeware",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "smart-home",
      label: "Smart home products",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "laundry",
      label: "Laundry & cleaning",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "pet",
      label: "Pet furniture",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "seasonal",
      label: "Seasonal decorations",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "office",
      label: "Office furniture",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      key: "food",
      label: "Food & beverages",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Extended room categories
  const roomCategories = [
    { key: "bedroom", label: "Bedroom", image: "/placeholder.svg?height=120&width=120" },
    { key: "outdoor-room", label: "Outdoor", image: "/placeholder.svg?height=120&width=120" },
    { key: "living-room", label: "Living room", image: "/placeholder.svg?height=120&width=120" },
    { key: "kitchen-room", label: "Kitchen & appliances", image: "/placeholder.svg?height=120&width=120" },
    { key: "home-office", label: "Home office", image: "/placeholder.svg?height=120&width=120" },
    { key: "dining", label: "Dining", image: "/placeholder.svg?height=120&width=120" },
    { key: "bathroom", label: "Bathroom", image: "/placeholder.svg?height=120&width=120" },
    { key: "kids-room", label: "Kids room", image: "/placeholder.svg?height=120&width=120" },
    { key: "garage", label: "Garage", image: "/placeholder.svg?height=120&width=120" },
    { key: "gaming-room", label: "Gaming room", image: "/placeholder.svg?height=120&width=120" },
    { key: "laundry", label: "Laundry", image: "/placeholder.svg?height=120&width=120" },
    // Additional room categories
    { key: "hallway", label: "Hallway", image: "/placeholder.svg?height=120&width=120" },
    { key: "guest-room", label: "Guest room", image: "/placeholder.svg?height=120&width=120" },
    { key: "nursery", label: "Nursery", image: "/placeholder.svg?height=120&width=120" },
    { key: "teen-room", label: "Teen room", image: "/placeholder.svg?height=120&width=120" },
    { key: "craft-room", label: "Craft room", image: "/placeholder.svg?height=120&width=120" },
    { key: "library", label: "Home library", image: "/placeholder.svg?height=120&width=120" },
    { key: "gym", label: "Home gym", image: "/placeholder.svg?height=120&width=120" },
    { key: "entertainment", label: "Entertainment area", image: "/placeholder.svg?height=120&width=120" },
    { key: "balcony", label: "Balcony", image: "/placeholder.svg?height=120&width=120" },
    { key: "basement", label: "Basement", image: "/placeholder.svg?height=120&width=120" },
    { key: "attic", label: "Attic", image: "/placeholder.svg?height=120&width=120" },
    { key: "studio", label: "Studio apartment", image: "/placeholder.svg?height=120&width=120" },
    { key: "small-space", label: "Small spaces", image: "/placeholder.svg?height=120&width=120" },
  ]

  // Dropdown menu items for mobile view
  const mobileMenuItems = [
    {
      key: "products",
      type: "group",
      label: "Products",
      children: productCategories.map((cat) => ({ key: cat.key, label: cat.label })),
    },
    {
      key: "rooms",
      type: "group",
      label: "Rooms",
      children: roomCategories.map((room) => ({ key: room.key, label: room.label })),
    },
    ...navItems.slice(2).map((item) => ({
      key: item.key,
      label: item.label,
    })),
  ]

  // Handle click on navigation item
  const handleNavClick = (key) => {
    setActiveSection(key)
  }

  // Scroll the category container left
  const scrollLeft = () => {
    const currentRef = activeSection === "products" ? productScrollRef : roomScrollRef
    if (currentRef.current) {
      currentRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  // Scroll the category container right
  const scrollRight = () => {
    const currentRef = activeSection === "products" ? productScrollRef : roomScrollRef
    if (currentRef.current) {
      currentRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  // Render product categories content
  const renderProductCategories = () => (
    <div className="relative py-6">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
        aria-label="Scroll left"
      >
        <LeftOutlined />
      </button>

      <div
        ref={productScrollRef}
        className="flex overflow-x-auto gap-4 px-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {productCategories.map((category) => (
          <div key={category.key} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
            {category.color ? (
              <div
                className={`${category.color} ${category.textColor} w-16 h-16 flex items-center justify-center rounded-md mb-2 font-bold`}
              >
                {category.text}
              </div>
            ) : (
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.label}
                className="w-16 h-16 object-cover rounded-md mb-2"
              />
            )}
            <span className="text-xs text-center max-w-[80px]">{category.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
        aria-label="Scroll right"
      >
        <RightOutlined />
      </button>
    </div>
  )

  // Render room categories content
  const renderRoomCategories = () => (
    <div className="relative py-6">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
        aria-label="Scroll left"
      >
        <LeftOutlined />
      </button>

      <div
        ref={roomScrollRef}
        className="flex overflow-x-auto gap-4 px-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {roomCategories.map((room) => (
          <div key={room.key} className="flex flex-col items-center flex-shrink-0 cursor-pointer">
            <img
              src={room.image || "/placeholder.svg"}
              alt={room.label}
              className="w-24 h-24 object-cover rounded-md mb-2"
            />
            <span className="text-xs text-center">{room.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100"
        aria-label="Scroll right"
      >
        <RightOutlined />
      </button>
    </div>
  )

  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return renderProductCategories()
      case "rooms":
        return renderRoomCategories()
      default:
        return (
          <div className="py-6">
            <h2 className="text-xl font-medium mb-4">{navItems.find((item) => item.key === activeSection)?.label}</h2>
            <p>Content for {navItems.find((item) => item.key === activeSection)?.label} would go here.</p>
          </div>
        )
    }
  }

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto">
        <div className="hidden lg:flex border-b">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`px-4 py-3 text-sm hover:underline ${
                activeSection === item.key ? "border-b-2 border-black -mb-[2px]" : ""
              }`}
              onClick={() => handleNavClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile navigation */}
        <div className="lg:hidden flex py-3 px-4">
          <Dropdown
            menu={{
              items: mobileMenuItems,
              onClick: ({ key }) => handleNavClick(key),
            }}
            placement="bottomLeft"
            trigger={["click"]}
          >
            <Button type="text" className="flex items-center" icon={<MenuOutlined />}>
              <span className="ml-2">Categories</span>
              <DownOutlined className="ml-1" />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Content section based on active menu item */}
      <div className="max-w-7xl mx-auto">{renderContent()}</div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default IkeaNavigation
