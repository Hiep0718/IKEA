import React, { useState } from 'react';
import { 
  Input, 
  Button, 
  Dropdown, 
  Badge 
} from 'antd';
import { 
  SearchOutlined, 
  HeartOutlined, 
  ShoppingCartOutlined,
  GlobalOutlined,
  CarOutlined,
  UserOutlined,
  CameraOutlined
} from '@ant-design/icons';

const IkeaHeader = () => {
  const [searchValue, setSearchValue] = useState('');

  // Fixed: using items array instead of Menu component
  const languageItems = [
    { key: '1', label: 'English' },
    { key: '2', label: 'Svenska' },
    { key: '3', label: 'Deutsch' },
    { key: '4', label: 'Français' }
  ];

  return (
    <div className="font-sans">
      {/* Top bar */}
      <div className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Left side - Language selector */}
          <div className="flex items-center">
            {/* Fixed: using menu prop instead of overlay */}
            <Dropdown menu={{ items: languageItems }} placement="bottomLeft">
                <Button type="text" className="text-white flex items-center" icon={<GlobalOutlined style={{ color: 'white' }}/>}>
                <span className="ml-2 mr-1 text-white flex items-center">US</span>
                <span className="mx-1 text-gray-400">|</span>
                <span className="text-white flex items-center">English</span>
                </Button>
            </Dropdown>
          </div>

          {/* Middle - Delivery info */}
          <div className="flex items-center">
            <CarOutlined className="mr-2" />
            <span>Standard delivery starting at $19</span>
          </div>

          {/* Right side - Store selectors */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <CarOutlined className="mr-2" />
              <span>Enter ZIP code</span>
            </div>
            <div className="flex items-center">
              <Button type="text" className="text-white flex items-center p-0">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'white' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className='text-white'>Select store</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* IKEA Logo */}
          <a href="#" className="flex-shrink-0">
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
                <div className="flex items-center">
                  <Button type="text" icon={<CameraOutlined className="text-gray-400" />} />
                </div>
              }
              className="rounded-full py-1 pl-3 pr-10"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center text-sm">
              <UserOutlined className="mr-2 text-lg" />
              <span>Hej! Log in or sign up</span>
            </a>
            <Button type="text" icon={<HeartOutlined style={{ fontSize: '24px' }} />} />
            <Badge count={0} showZero={false}>
              <Button type="text" icon={<ShoppingCartOutlined style={{ fontSize: '24px' }} />} />
            </Badge>
          </div>
        </div>
      </header>
    </div>
  );
};

export default IkeaHeader;