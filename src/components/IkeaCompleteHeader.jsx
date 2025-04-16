import React, { useState } from 'react';
import { 
  Input, 
  Button, 
  Space, 
  Dropdown, 
  Menu, 
  Badge,
  Avatar
} from 'antd';
import { 
  SearchOutlined, 
  CameraOutlined, 
  HeartOutlined, 
  ShoppingOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  CarOutlined,
  UserOutlined,
  MenuOutlined,
  DownOutlined
} from '@ant-design/icons';

const { Search } = Input;

const IkeaHeader1 = () => {
  const [searchValue, setSearchValue] = useState('');

  const languageMenu = (
    <Menu>
      <Menu.Item key="1">English</Menu.Item>
      <Menu.Item key="2">Svenska</Menu.Item>
      <Menu.Item key="3">Deutsch</Menu.Item>
      <Menu.Item key="4">Français</Menu.Item>
    </Menu>
  );

  const categoryMenu = (
    <Menu className="w-64">
      <Menu.ItemGroup title="Products">
        <Menu.Item key="furniture">Furniture</Menu.Item>
        <Menu.Item key="kitchen">Kitchen & Appliances</Menu.Item>
        <Menu.Item key="beds">Beds & Mattresses</Menu.Item>
        <Menu.Item key="storage">Storage & Organization</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup title="Rooms">
        <Menu.Item key="living">Living Room</Menu.Item>
        <Menu.Item key="bedroom">Bedroom</Menu.Item>
        <Menu.Item key="kitchen-room">Kitchen</Menu.Item>
        <Menu.Item key="bathroom">Bathroom</Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div className="font-sans">
      {/* Top bar */}
      <div className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Left side - Language selector */}
          <div className="flex items-center">
            <Dropdown overlay={languageMenu} placement="bottomLeft">
              <Button type="text" className="text-white flex items-center" icon={<GlobalOutlined />}>
                <span className="ml-2 mr-1">US</span>
                <span className="text-gray-400 mr-1">|</span>
                <span>English</span>
              </Button>
            </Dropdown>
          </div>

          {/* Middle - Delivery info */}
          <div className="hidden md:flex items-center">
            <CarOutlined className="mr-2" />
            <span>Standard delivery starting at $19</span>
          </div>

          {/* Right side - Store selector */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <CarOutlined className="mr-2" />
              <span>Enter ZIP code</span>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined className="mr-2" />
              <span>Select store</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* IKEA Logo */}
          <a href="#" className="flex-shrink-0">
            <div className="bg-blue-600 h-8 w-14 rounded-sm flex items-center justify-center">
              <div className="bg-yellow-400 h-5 w-10 rounded-sm flex items-center justify-center border-2 border-blue-600">
                <span className="text-blue-600 font-bold text-xs">IKEA</span>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-grow max-w-2xl mx-4">
            <Input
              placeholder="What are you looking for?"
              prefix={<SearchOutlined className="text-gray-400" />}
              suffix={<CameraOutlined className="text-gray-400" />}
              className="rounded-full py-1"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-6">
            <a href="#" className="hidden md:flex items-center text-sm whitespace-nowrap">
              <UserOutlined className="mr-1" />
              <span>Hej! Log in or sign up</span>
            </a>
            <Button type="text" icon={<HeartOutlined style={{ fontSize: '22px' }} />} />
            <Badge count={0} showZero={false}>
              <Button type="text" icon={<ShoppingOutlined style={{ fontSize: '22px' }} />} />
            </Badge>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="hidden lg:flex space-x-1">
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 8H4V18H20V8Z" />
                  <path d="M2 5H22" />
                </svg>
                Products
              </a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 20H21V8L12 3L3 8V20Z" />
                  <path d="M9 20V12H15V20" />
                </svg>
                Rooms
              </a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">Deals</a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">Spring home ideas</a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">Home accessories</a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">Ideas & inspiration</a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">Design & planning</a>
              <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">IKEA for Business</a>
              <a href="#" className="px-4 py-3 border-b-2 border-blue-600 text-blue-600">Services & support</a>
            </div>
            
            <div className="lg:hidden flex items-center">
              <Dropdown overlay={categoryMenu} placement="bottomLeft" trigger={['click']}>
                <Button type="text" className="flex items-center" icon={<MenuOutlined />}>
                  <span className="ml-2">Categories</span>
                  <DownOutlined className="ml-1" />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      {/* Hide scrollbar style */}
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default IkeaHeader1;