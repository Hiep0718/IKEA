import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

const IkeaNavigation = () => {
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

      {/* Hide scrollbar style */}
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export default IkeaNavigation;