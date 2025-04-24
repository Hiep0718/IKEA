import React from "react"
import {
  AppstoreOutlined,
  GiftOutlined,
  HomeOutlined,
  InboxOutlined,
  ShopOutlined,
  SkinOutlined,
} from "ant-design/icons"

const CategoryNav = () => {
  const categories = [
    { name: "New & trending", icon: <GiftOutlined />, color: "bg-orange-500" },
    { name: "Offers", icon: <ShopOutlined />, color: "bg-yellow-400" },
    { name: "Storage & organization", icon: <InboxOutlined />, color: "bg-gray-200" },
    { name: "Sofas & armchairs", icon: <SkinOutlined />, color: "bg-gray-200" },
    { name: "Outdoor", icon: <HomeOutlined />, color: "bg-gray-200" },
    { name: "Beds & mattresses", icon: <AppstoreOutlined />, color: "bg-gray-200" },
  ]

  return (
    <div className="py-8 px-4">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer">
            <div className={`${category.color} w-16 h-16 rounded-md flex items-center justify-center mb-2`}>
              {React.cloneElement(category.icon, { style: { fontSize: "24px" } })}
            </div>
            <span className="text-center text-sm">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryNav
