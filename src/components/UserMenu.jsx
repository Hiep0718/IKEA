"use client"

import { Dropdown } from "antd"
import { UserOutlined, HeartOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons"
import { useAuth } from "../context/AuthContext"

const UserMenu = () => {
  const { user, logout } = useAuth()

  if (!user) return null

  const items = [
    {
      key: "profile",
      label: (
        <div className="py-2 px-1">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "orders",
      label: "Đơn hàng của tôi",
      icon: <SettingOutlined />,
    },
    {
      key: "wishlist",
      label: "Danh sách yêu thích",
      icon: <HeartOutlined />,
    },
    {
      key: "settings",
      label: "Cài đặt tài khoản",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow>
      <div className="flex items-center cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          <UserOutlined />
        </div>
        <span className="hidden md:block">Hej, {user.name}</span>
      </div>
    </Dropdown>
  )
}

export default UserMenu
