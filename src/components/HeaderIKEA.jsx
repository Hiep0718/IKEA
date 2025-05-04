"use client";
import {Input, Button, Dropdown, Badge } from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  GlobalOutlined,
  CarOutlined,
  UserOutlined,
  CameraOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import CartDropdown from "./CartDropdown";
import UserMenu from "./UserMenu";
import LoginModal from "./LoginModal";

const HeaderIKEA = ({ navigateTo }) => {
  const { getCartCount, toggleCart } = useCart();
  const { user, openLoginModal } = useAuth();
  const cartCount = getCartCount();

  // Language dropdown items
  const languageItems = [
    { key: "1", label: "English" },
    { key: "2", label: "Svenska" },
    { key: "3", label: "Deutsch" },
    { key: "4", label: "Français" },
  ];
  // User menu items
  const userMenuItems = [
    {
      key: "profile",
      label: (
        <div className="py-2 px-1">
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "account",
      label: "Tài khoản của tôi",
      onClick: () => navigateTo("profile"),
    },
    {
      key: "orders",
      label: "Đơn hàng của tôi",
      onClick: () => {
        navigateTo("profile")
        // You could add logic to activate the orders tab
      },
    },
    {
      key: "wishlist",
      label: "Danh sách yêu thích",
      onClick: () => {
        navigateTo("profile")
        // You could add logic to activate the wishlist tab
      },
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: () => {
        // Implement logout logic
      },
    },
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
                <EnvironmentOutlined
                  className="mr-2"
                  style={{ color: "white" }}
                />
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
          <a
            href="#"
            className="flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
          >
            <div className="bg-blue-600 h-10 w-16 rounded flex items-center justify-center">
              <div className="bg-yellow-400 h-6 w-12 rounded flex items-center justify-center border-2 border-blue-600">
                <span className="text-blue-600 font-bold text-sm">IKEA</span>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl mx-4">
            <SearchBar navigateTo={navigateTo} />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-6">
            {user ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div className="flex items-center cursor-pointer">
                  <UserOutlined className="mr-2 text-lg" />
                  <span className="hidden md:inline">Hej, {user.name}</span>
                </div>
              </Dropdown>
            ) : (
              <Button type="text" onClick={openLoginModal} className="hidden md:flex items-center text-sm">
                <UserOutlined className="mr-2 text-lg" />
                <span>Hej! Đăng nhập hoặc đăng ký</span>
              </Button>
            )}
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
      <CartDropdown navigateTo={navigateTo} />

      {/* Login Modal */}
      <LoginModal />
    </div>
  );
};

export default HeaderIKEA;
