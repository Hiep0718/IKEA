"use client";

import { useState, useEffect, useRef } from "react";
import { Input, Button } from "antd";
import {
  SearchOutlined,
  CameraOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, className = "" }) => {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Handle clicks outside the search component to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowRecentSearches(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    if (!query.trim()) return;

    const updatedSearches = [
      query,
      ...recentSearches.filter((s) => s !== query),
    ];
    if (updatedSearches.length > 5) updatedSearches.pop(); // Keep only 5 most recent

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Handle search submission
  const handleSearch = (e) => {
    if (e) e.preventDefault();

    if (!searchValue.trim()) return;

    saveRecentSearch(searchValue);

    // If onSearch prop is provided, use it (for in-page search)
    if (onSearch) {
      onSearch(searchValue);
    } else {
      // Otherwise navigate to search page
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }

    setShowRecentSearches(false);
  };

  // Handle pressing Enter in search field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle clicking on a recent search
  const handleRecentSearchClick = (query) => {
    setSearchValue(query);
    setTimeout(() => handleSearch(), 0);
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Clear current search input
  const clearSearch = () => {
    setSearchValue("");
  };

  // Recent searches dropdown menu
  const recentSearchesMenu = (
    <div className="bg-white shadow-lg rounded-md p-2 w-full">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <span className="font-medium">Recent searches</span>
        <Button type="text" size="small" onClick={clearRecentSearches}>
          Clear all
        </Button>
      </div>
      {recentSearches.length > 0 ? (
        <ul>
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleRecentSearchClick(search)}
            >
              <SearchOutlined className="mr-2 text-gray-400" />
              {search}
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-3 py-2 text-gray-500">No recent searches</div>
      )}
    </div>
  );

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="What are you looking for?"
          prefix={<SearchOutlined className="text-gray-400" />}
          suffix={
            <div className="flex items-center">
              {searchValue && (
                <Button
                  type="text"
                  className="flex items-center p-0 mr-2"
                  onClick={clearSearch}
                  icon={<CloseOutlined className="text-gray-400" />}
                />
              )}
              <Button
                type="text"
                className="flex items-center p-0"
                onClick={() => alert("Image search coming soon!")}
                icon={<CameraOutlined className="text-gray-400" />}
              />
            </div>
          }
          className="rounded-full py-1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowRecentSearches(true)}
        />
      </form>

      {/* Recent searches dropdown */}
      {showRecentSearches && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50">
          {recentSearchesMenu}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
