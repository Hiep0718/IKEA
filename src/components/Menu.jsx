import React from 'react';
import { Button, Dropdown } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

const IkeaNavigation = () => {
  // Fixed: Using items array for dropdown menu
  const categoryItems = [
    {
      key: 'products',
      type: 'group',
      label: 'Products',
      children: [
        { key: 'furniture', label: 'Furniture' },
        { key: 'kitchen', label: 'Kitchen & Appliances' },
        { key: 'beds', label: 'Beds & Mattresses' },
        { key: 'storage', label: 'Storage & Organization' }
      ]
    },
    {
      key: 'rooms',
      type: 'group',
      label: 'Rooms',
      children: [
        { key: 'living', label: 'Living Room' },
        { key: 'bedroom', label: 'Bedroom' },
        { key: 'kitchen-room', label: 'Kitchen' },
        { key: 'bathroom', label: 'Bathroom' }
      ]
    }
  ];

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
            <a href="#" className="px-4 py-3 hover:border-b-2 hover:border-black">Services & support</a>
          </div>
          
          <div className="lg:hidden flex items-center">
            {/* Fixed: Changed overlay to menu */}
            <Dropdown menu={{ items: categoryItems }} placement="bottomLeft" trigger={['click']}>
              <Button type="text" className="flex items-center" icon={<MenuOutlined />}>
                <span className="ml-2">Categories</span>
                <DownOutlined className="ml-1" />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* Apply scrollbar hiding using inline styles instead of JSX style */}
      <style dangerouslySetInnerHTML={{
        __html: `
          nav div::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </nav>
  );
};

export default IkeaNavigation;