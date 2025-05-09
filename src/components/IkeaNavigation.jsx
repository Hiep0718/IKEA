"use client";

import { useState, useRef } from "react";
import { Button, Dropdown } from "antd";
import {
  MenuOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { getImage, getCategoryImage, getRoomImage } from "../utils/imageUtils";

const IkeaNavigation = () => {
  const [activeSection, setActiveSection] = useState("products");
  const productScrollRef = useRef(null);
  const roomScrollRef = useRef(null);

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
  ];

  // Product categories for the scrollable section
  const productCategories = [
    {
      key: "newTrending",
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
      image: getCategoryImage("storage"),
    },
    {
      key: "sofas",
      label: "Sofas & armchairs",
      image: getCategoryImage("sofas"),
    },
    {
      key: "outdoor",
      label: "Outdoor",
      image: getCategoryImage("outdoor"),
    },
    {
      key: "beds",
      label: "Beds & mattresses",
      image: getCategoryImage("beds"),
    },
    {
      key: "lighting",
      label: "Lighting",
      image: getCategoryImage("lighting"),
    },
    {
      key: "textiles",
      label: "Home textiles",
      image: getCategoryImage("textiles"),
    },
    {
      key: "kitchen",
      label: "Kitchen, appliances & supplies",
      image: getCategoryImage("kitchen"),
    },
    {
      key: "desk",
      label: "Desk & desk chairs",
      image: getCategoryImage("desk"),
    },
    {
      key: "tables",
      label: "Tables & chairs",
      image: getCategoryImage("tables"),
    },
    {
      key: "decor",
      label: "Home decor & accessories",
      image: getCategoryImage("decor"),
    },
    {
      key: "kitchenware",
      label: "Kitchenware & tableware",
      image: getCategoryImage("kitchenware"),
    },
    // Additional product categories
    {
      key: "bathroom",
      label: "Bathroom products",
      image: getCategoryImage("bathroom"),
    },
    {
      key: "children",
      label: "Children's IKEA",
      image: getCategoryImage("children"),
    },
    {
      key: "plants",
      label: "Plants & plant pots",
      image: getCategoryImage("plants"),
    },
    {
      key: "mirrors",
      label: "Mirrors & frames",
      image: getCategoryImage("mirrors"),
    },
    {
      key: "rugs",
      label: "Rugs & mats",
      image: getCategoryImage("rugs"),
    },
    {
      key: "curtains",
      label: "Curtains & blinds",
      image: getCategoryImage("curtains"),
    },
    {
      key: "cookware",
      label: "Cookware & bakeware",
      image: getCategoryImage("cookware"),
    },
    {
      key: "smartHome",
      label: "Smart home products",
      image: getCategoryImage("smartHome"),
    },
    {
      key: "laundry",
      label: "Laundry & cleaning",
      image: getCategoryImage("laundry"),
    },
    {
      key: "pet",
      label: "Pet furniture",
      image: getCategoryImage("pet"),
    },
    {
      key: "seasonal",
      label: "Seasonal decorations",
      image: getCategoryImage("seasonal"),
    },
    {
      key: "office",
      label: "Office furniture",
      image: getCategoryImage("office"),
    },
    {
      key: "food",
      label: "Food & beverages",
      image: getCategoryImage("food"),
    },
  ];

  // Room categories
  const roomCategories = [
    { key: "bedroom", label: "Bedroom", image: getRoomImage("bedroom") },
    { key: "outdoor", label: "Outdoor", image: getRoomImage("outdoor") },
    {
      key: "livingRoom",
      label: "Living room",
      image: getRoomImage("livingRoom"),
    },
    {
      key: "kitchen",
      label: "Kitchen & appliances",
      image: getRoomImage("kitchen"),
    },
    {
      key: "homeOffice",
      label: "Home office",
      image: getRoomImage("homeOffice"),
    },
    { key: "dining", label: "Dining", image: getRoomImage("dining") },
    { key: "bathroom", label: "Bathroom", image: getRoomImage("bathroom") },
    { key: "kidsRoom", label: "Kids room", image: getRoomImage("kidsRoom") },
    { key: "garage", label: "Garage", image: getRoomImage("garage") },
    {
      key: "gamingRoom",
      label: "Gaming room",
      image: getRoomImage("gamingRoom"),
    },
    { key: "laundry", label: "Laundry", image: getRoomImage("laundry") },
    // Additional room categories
    { key: "hallway", label: "Hallway", image: getRoomImage("hallway") },
    { key: "guestRoom", label: "Guest room", image: getRoomImage("guestRoom") },
    { key: "nursery", label: "Nursery", image: getRoomImage("nursery") },
    { key: "teenRoom", label: "Teen room", image: getRoomImage("teenRoom") },
    { key: "craftRoom", label: "Craft room", image: getRoomImage("craftRoom") },
    { key: "library", label: "Home library", image: getRoomImage("library") },
    { key: "gym", label: "Home gym", image: getRoomImage("gym") },
    {
      key: "entertainment",
      label: "Entertainment area",
      image: getRoomImage("entertainment"),
    },
    { key: "balcony", label: "Balcony", image: getRoomImage("balcony") },
    { key: "basement", label: "Basement", image: getRoomImage("basement") },
    { key: "attic", label: "Attic", image: getRoomImage("attic") },
    { key: "studio", label: "Studio apartment", image: getRoomImage("studio") },
    {
      key: "smallSpace",
      label: "Small spaces",
      image: getRoomImage("smallSpace"),
    },
  ];

  // Dropdown menu items for mobile view
  const mobileMenuItems = [
    {
      key: "products",
      type: "group",
      label: "Products",
      children: productCategories.map((cat) => ({
        key: cat.key,
        label: cat.label,
      })),
    },
    {
      key: "rooms",
      type: "group",
      label: "Rooms",
      children: roomCategories.map((room) => ({
        key: room.key,
        label: room.label,
      })),
    },
    ...navItems.slice(2).map((item) => ({
      key: item.key,
      label: item.label,
    })),
  ];

  // Handle click on navigation item
  const handleNavClick = (key) => {
    setActiveSection(key);
  };

  // Scroll the category container left
  const scrollLeft = () => {
    const currentRef =
      activeSection === "products" ? productScrollRef : roomScrollRef;
    if (currentRef.current) {
      currentRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll the category container right
  const scrollRight = () => {
    const currentRef =
      activeSection === "products" ? productScrollRef : roomScrollRef;
    if (currentRef.current) {
      currentRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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
          <div
            key={category.key}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer"
          >
            {category.color ? (
              <div
                className={`${category.color} ${category.textColor} w-16 h-16 flex items-center justify-center rounded-md mb-2 font-bold`}
              >
                {category.text}
              </div>
            ) : (
              <img
                src={category.image || getImage("placeholders.category")}
                alt={category.label}
                className="w-16 h-16 object-cover rounded-md mb-2"
              />
            )}
            <span className="text-xs text-center max-w-[80px]">
              {category.label}
            </span>
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
  );

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
          <div
            key={room.key}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer"
          >
            <img
              src={room.image || getImage("placeholders.room")}
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
  );

  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "products":
        return renderProductCategories();
      case "rooms":
        return renderRoomCategories();
      default:
        const activeItem = navItems.find((item) => item.key === activeSection);
        return (
          <div className="py-6 px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {activeItem?.label}
            </h2>
            {activeSection === "deals" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Latest Deals
                </h3>
                <p className="text-gray-700 mb-4">
                  Discover amazing discounts on furniture, decor, and more.
                  Don't miss out on these limited-time offers!
                </p>
                <ul className="pl-0 text-gray-700 space-y-2">
                  <li>
                    <a
                      href="/deals/furniture"
                      className="text-blue-600 hover:underline"
                    >
                      Furniture Deals
                    </a>
                  </li>
                  <li>
                    <a
                      href="/deals/decor"
                      className="text-blue-600 hover:underline"
                    >
                      Decor Discounts
                    </a>
                  </li>
                  <li>
                    <a
                      href="/deals/lighting"
                      className="text-blue-600 hover:underline"
                    >
                      Lighting Offers
                    </a>
                  </li>
                </ul>
                <img
                  src="/images/deals-banner.png"
                  alt="Deals Banner"
                  className="w-full h-auto mt-4 rounded-md shadow-md"
                />
              </div>
            )}
            {activeSection === "spring-home-ideas" && (
              <div>
                <img
                  src="/images/spring-home-ideas.png"
                  alt="Spring Home Ideas"
                  className="w-full h-auto mb-4 rounded-md shadow-md"
                />
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Refresh Your Home for Spring
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome the new season with fresh ideas to brighten your home.
                  From vibrant colors to nature-inspired decor, explore ways to
                  bring the beauty of spring indoors.
                </p>
                <ul className="pl-0 text-gray-700 space-y-2">
                  <li>
                    <a
                      href="/spring/colors"
                      className="text-blue-600 hover:underline"
                    >
                      Spring Color Trends
                    </a>
                  </li>
                  <li>
                    <a
                      href="/spring/decor"
                      className="text-blue-600 hover:underline"
                    >
                      Nature-Inspired Decor
                    </a>
                  </li>
                  <li>
                    <a
                      href="/spring/outdoor"
                      className="text-blue-600 hover:underline"
                    >
                      Outdoor Living Ideas
                    </a>
                  </li>
                </ul>
                <a
                  href="/spring-home-ideas"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Explore More Ideas
                </a>
              </div>
            )}
            {activeSection === "home-accessories" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Top Accessories
                </h3>
                <p className="text-gray-700 mb-4">
                  Add the perfect finishing touches to your home with our
                  stylish and functional accessories.
                </p>
                <ul className="pl-0 text-gray-700 space-y-2">
                  <li>Vases and Bowls</li>
                  <li>Wall Art</li>
                  <li>Throw Pillows</li>
                  <li>Candles and Holders</li>
                  <li>Mirrors</li>
                </ul>
                <img
                  src="/images/home-accessories.png"
                  alt="Home Accessories"
                  className="w-full h-auto mt-4 rounded-md shadow-md"
                />
              </div>
            )}
            {activeSection === "ideas-inspiration" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Explore Ideas
                </h3>
                <p className="text-gray-700 mb-4">
                  Get inspired with our curated room setups and styling tips to
                  create your dream home.
                </p>
                <ul className="pl-0 text-gray-700 space-y-2">
                  <li>
                    <a
                      href="/ideas/living-room"
                      className="text-blue-600 hover:underline"
                    >
                      Living Room Ideas
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ideas/kitchen"
                      className="text-blue-600 hover:underline"
                    >
                      Kitchen Inspiration
                    </a>
                  </li>
                  <li>
                    <a
                      href="/ideas/bedroom"
                      className="text-blue-600 hover:underline"
                    >
                      Bedroom Styling Tips
                    </a>
                  </li>
                </ul>
                <a
                  href="/ideas-inspiration"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  See All Ideas
                </a>
              </div>
            )}
            {activeSection === "design-planning" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Design Tools
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use our tools and tips to plan your dream space — from
                  kitchens to bedrooms. Visualize your ideas and bring them to
                  life with ease.
                </p>
                <ul className="pl-0 text-gray-700 space-y-2">
                  <li>
                    <a
                      href="/design/kitchen-planner"
                      className="text-blue-600 hover:underline"
                    >
                      Kitchen Planner
                    </a>
                  </li>
                  <li>
                    <a
                      href="/design/wardrobe-planner"
                      className="text-blue-600 hover:underline"
                    >
                      Wardrobe Planner
                    </a>
                  </li>
                  <li>
                    <a
                      href="/design/room-planner"
                      className="text-blue-600 hover:underline"
                    >
                      Room Planner
                    </a>
                  </li>
                </ul>
                <a
                  href="/design-tools"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Explore Tools
                </a>
              </div>
            )}
            {activeSection === "ikea-business" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Business Solutions
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  IKEA for Business offers tailored solutions for offices,
                  restaurants, and more. Discover how we can help you create
                  functional and stylish spaces for your business.
                </p>
                <a
                  href="/business"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Learn More
                </a>
              </div>
            )}
            {activeSection === "services-support" && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Customer Services
                </h3>
                <p className="text-gray-700 mb-4">
                  Need help? Learn more about our delivery, assembly, and
                  customer services. We're here to assist you every step of the
                  way.
                </p>
                <ul className="pl-0 text-gray-700 space-y-2">
                  <li>Delivery and Assembly</li>
                  <li>Returns and Exchanges</li>
                  <li>Product Support</li>
                  <li>Warranty Information</li>
                </ul>
                <a
                  href="/services"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Get Support
                </a>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto">
        <div className="hidden lg:flex border-b">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`px-4 py-3 text-sm hover:underline ${
                activeSection === item.key
                  ? "border-b-2 border-black -mb-[2px]"
                  : ""
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
            <Button
              type="text"
              className="flex items-center"
              icon={<MenuOutlined />}
            >
              <span className="ml-2">Categories</span>
              <DownOutlined className="ml-1" />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Content section based on active menu item */}
      <div className="max-w-7xl mx-auto">{renderContent()}</div>

      {/* Hide scrollbar */}
      <style jsx="true">{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default IkeaNavigation;
