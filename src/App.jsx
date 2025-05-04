"use client";

import { useState } from "react";
import { ConfigProvider } from "antd";
import IkeaHeader from "./components/HeaderIKEA";
import IkeaNavigation from "./components/IkeaNavigation";
import IkeaFooter from "./components/IkeaFooter";
import ProductPage from "./pages/ProductPage";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageParams, setPageParams] = useState({});

  // Function to change the current page
  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
  };

  return (
    <ConfigProvider>
      <AuthProvider>
        <CartProvider>
          <div className="w-full min-h-screen flex flex-col">
            <IkeaHeader navigateTo={navigateTo} />
            <IkeaNavigation navigateTo={navigateTo} />
            <main className="flex-grow">
              {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
              {currentPage === "product" && (
                <ProductPage
                  navigateTo={navigateTo}
                  productId={pageParams.productId}
                />
              )}
              {currentPage === "search" && (
                <SearchPage navigateTo={navigateTo} searchParams={pageParams} />
              )}
              {currentPage === "profile" && <ProfilePage navigateTo={navigateTo} />}
              {currentPage === "checkout" && <CheckoutPage navigateTo={navigateTo} />}
              {currentPage === "products" && <ProductsPage navigateTo={navigateTo} />}
            </main>
            <IkeaFooter />
          </div>
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
