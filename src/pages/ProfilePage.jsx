"use client"

import { useState, useEffect } from "react"
import { Tabs, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Breadcrumb from "../components/Breadcrumb"
import PersonalInfoSection from "../components/profile/PersonalInfoSection"
import AddressesSection from "../components/profile/AddressesSection"
import OrdersSection from "../components/profile/OrdersSection"
import WishlistSection from "../components/profile/WishlistSection"
import SettingsSection from "../components/profile/SettingsSection"

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("personal-info")

  // Redirect to home if not logged in
  useEffect(() => {
    if (!user) {
      message.warning("Vui lòng đăng nhập để xem trang hồ sơ")
      navigate("/")
    }
  }, [user, navigate])

  // Breadcrumb items for profile page
  const breadcrumbItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Tài khoản của tôi", path: "/profile" },
  ]

  if (!user) {
    return null // Don't render anything if not logged in
  }

  const tabItems = [
    {
      key: "personal-info",
      label: "Thông tin cá nhân",
      children: <PersonalInfoSection user={user} />,
    },
    {
      key: "orders",
      label: "Đơn hàng của tôi",
      children: <OrdersSection />,
    },
    {
      key: "addresses",
      label: "Địa chỉ",
      children: <AddressesSection />,
    },
    {
      key: "wishlist",
      label: "Danh sách yêu thích",
      children: <WishlistSection />,
    },
    {
      key: "settings",
      label: "Cài đặt",
      children: <SettingsSection />,
    },
  ]

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button to return to home */}
        <Link to="/" className="mb-6 text-blue-600 hover:underline flex items-center">
          ← Quay lại trang chủ
        </Link>

        {/* Profile header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-600">Xin chào, {user.name}</p>
        </div>

        {/* Profile content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            tabPosition="left"
            className="min-h-[500px]"
            tabBarStyle={{ width: 200, borderRight: "1px solid #f0f0f0" }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
