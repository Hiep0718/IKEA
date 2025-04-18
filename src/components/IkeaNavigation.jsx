import React, { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

const IkeaNavigation = () => {
  const [activeSection, setActiveSection] = useState('products');
  
  // Navigation items
  const navItems = [
    { key: 'products', label: 'Products', icon: 'package' },
    { key: 'rooms', label: 'Rooms', icon: 'home' },
    { key: 'deals', label: 'Deals', icon: null },
    { key: 'spring-home-ideas', label: 'Spring home ideas', icon: null },
    { key: 'home-accessories', label: 'Home accessories', icon: null },
    { key: 'ideas-inspiration', label: 'Ideas & inspiration', icon: null },
    { key: 'design-planning', label: 'Design & planning', icon: null },
    { key: 'ikea-business', label: 'IKEA for Business', icon: null },
    { key: 'services-support', label: 'Services & support', icon: null }
  ];

  // Dropdown menu items for mobile view
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

  // Content for Products section
  const ProductsContent = () => (
    <div className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-orange-500 p-4 rounded-md mb-2">
            <span className="text-white font-bold">New</span>
          </div>
          <span className="text-sm">New & trending</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 p-4 rounded-md mb-2">
            <span className="font-bold">DEALS</span>
          </div>
          <span className="text-sm">Offers</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <span className="text-sm">Storage & organization</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="8" width="20" height="12" rx="2" />
              <path d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v2" />
            </svg>
          </div>
          <span className="text-sm">Sofas & armchairs</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-sm">Outdoor</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="6" width="20" height="12" rx="2" />
            </svg>
          </div>
          <span className="text-sm">Beds & mattresses</span>
        </div>
      </div>
    </div>
  );

  // Content for Rooms section
  const RoomsContent = () => (
    <div className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2 w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 10h18" />
              <path d="M10 3v18" />
            </svg>
          </div>
          <span className="text-sm">Bedroom</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2 w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-sm">Outdoor</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2 w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <path d="M3 9h6" />
              <path d="M3 15h6" />
            </svg>
          </div>
          <span className="text-sm">Living room</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2 w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16v16H4z" />
              <path d="M4 12h16" />
              <path d="M12 4v16" />
            </svg>
          </div>
          <span className="text-sm">Kitchen & appliances</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2 w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
          </div>
          <span className="text-sm">Home office</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-md mb-2 w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <span className="text-sm">Dining</span>
        </div>
      </div>
    </div>
  );

  // Content for Spring home ideas section
  const SpringIdeasContent = () => (
    <div className="py-8">
      <h2 className="text-xl font-medium mb-6">Spring home ideas</h2>
      <div className="space-y-4">
        <a href="#" className="block hover:underline">See all in Spring home ideas</a>
        <a href="#" className="block hover:underline">Enjoy the sun in new outdoor furniture</a>
        <a href="#" className="block hover:underline">Celebrate mom with Mother's Day gifts she'll love</a>
      </div>
    </div>
  );

  // Content for other sections - simplified for now
  const GenericContent = () => (
    <div className="py-8">
      <h2 className="text-xl font-medium mb-6">{navItems.find(item => item.key === activeSection)?.label}</h2>
      <p>Content for {navItems.find(item => item.key === activeSection)?.label} would go here.</p>
    </div>
  );

  // Render the appropriate content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <ProductsContent />;
      case 'rooms':
        return <RoomsContent />;
      case 'spring-home-ideas':
        return <SpringIdeasContent />;
      default:
        return <GenericContent />;
    }
  };

  // Handle click on navigation item
  const handleNavClick = (key) => {
    setActiveSection(key);
  };

  return (
    <div className="bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <a 
                  key={item.key}
                  href="#" 
                  className={`px-4 py-3 hover:border-b-2 hover:border-black flex items-center ${
                    activeSection === item.key ? 'border-b-2 border-black' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.key);
                  }}
                >
                  {item.icon === 'package' && (
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 8H4V18H20V8Z" />
                      <path d="M2 5H22" />
                    </svg>
                  )}
                  {item.icon === 'home' && (
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 20H21V8L12 3L3 8V20Z" />
                      <path d="M9 20V12H15V20" />
                    </svg>
                  )}
                  {item.label}
                </a>
              ))}
            </div>
            
            <div className="lg:hidden flex items-center">
              <Dropdown menu={{ items: categoryItems, onClick: ({key}) => handleNavClick(key) }} placement="bottomLeft" trigger={['click']}>
                <Button type="text" className="flex items-center" icon={<MenuOutlined />}>
                  <span className="ml-2">Categories</span>
                  <DownOutlined className="ml-1" />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            nav div::-webkit-scrollbar {
              display: none;
            }
          `
        }} />
      </nav>

      {/* Dynamic content section based on active menu item */}
      <div className="max-w-7xl mx-auto px-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default IkeaNavigation;