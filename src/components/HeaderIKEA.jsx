"use client"

import { useState } from "react"
import { Input, Button, Dropdown, Badge } from "antd"
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  GlobalOutlined,
  CarOutlined,
  UserOutlined,
  CameraOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons"
import { useCart } from "../context/CartContext"
import CartDropdown from "./CartDropdown"

const HeaderIKEA = () => {
  const [searchValue, setSearchValue] = useState("")
  const { getCartCount, toggleCart } = useCart()
  const cartCount = getCartCount()

  // Language dropdown items
  const languageItems = [
    { key: "1", label: "English" },
    { key: "2", label: "Svenska" },
    { key: "3", label: "Deutsch" },
    { key: "4", label: "Français" },
  ]

  return (
    <div className="font-sans">
      {/* Top bar */}
      <div className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center">
          {/* Left side - Language selector */}
          <div className="flex items-center">
            <Dropdown menu={{ items: languageItems }} placement="bottomLeft">
              <Button
                type="text"
                className="text-white flex items-center p-0"
                icon={<GlobalOutlined style={{ color: "white" }} />}
              >
                <span className="ml-2 mr-1 text-white">US</span>
                <span className="mx-1 text-gray-400">|</span>
                <span className="text-white">English</span>
              </Button>
            </Dropdown>
          </div>

          {/* Middle - Delivery info */}
          <div className="hidden md:flex items-center">
            <CarOutlined className="mr-2" />
            <span>Standard delivery starting at $19</span>
          </div>

          {/* Right side - Store selectors */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <Button type="text" className="text-white flex items-center p-0">
                <CarOutlined className="mr-2" style={{ color: "white" }} />
                <span className="text-white">Enter ZIP code</span>
              </Button>
            </div>
            <div className="flex items-center">
              <Button type="text" className="text-white flex items-center p-0">
                <EnvironmentOutlined className="mr-2" style={{ color: "white" }} />
                <span className="text-white">Select store</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* IKEA Logo */}
          <a href="/" className="flex-shrink-0">
            <div className="bg-blue-600 h-10 w-16 rounded flex items-center justify-center">
              <div className="bg-yellow-400 h-6 w-12 rounded flex items-center justify-center border-2 border-blue-600">
                <span className="text-blue-600 font-bold text-sm">IKEA</span>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl mx-4 relative">
            <Input
              placeholder="What are you looking for?"
              prefix={<SearchOutlined className="text-gray-400" />}
              suffix={
                <Button type="text" className="flex items-center p-0">
                  <CameraOutlined className="text-gray-400" />
                </Button>
              }
              className="rounded-full py-1"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-6">
            <a href="#" className="hidden md:flex items-center text-sm">
              <UserOutlined className="mr-2 text-lg" />
              <span>Hej! Log in or sign up</span>
            </a>
            <Button type="text" icon={<HeartOutlined style={{ fontSize: "24px" }} />} />
            <Badge count={cartCount} showZero={false}>
              <Button
                type="text"
                icon={<ShoppingCartOutlined style={{ fontSize: "24px" }} />}
                onClick={toggleCart}
                aria-label="Shopping cart"
              />
            </Badge>
          </div>
        </div>
      </header>

      {/* Cart Dropdown */}
      <CartDropdown />
    </div>
  )
}

export default HeaderIKEA
