"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ConfigProvider } from "antd"
import IkeaHeader from "./components/HeaderIKEA"
import IkeaNavigation from "./components/IkeaNavigation"
import IkeaFooter from "./components/IkeaFooter"
import ProductPage from "./pages/ProductPage"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import ProfilePage from "./pages/ProfilePage"
import CheckoutPage from "./pages/CheckoutPage"
import ProductsPage from "./pages/ProductsPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Router>
      <ConfigProvider>
        <AuthProvider>
          <CartProvider>
            <div className="w-full min-h-screen flex flex-col">
              <IkeaHeader />
              <IkeaNavigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
              <IkeaFooter />
            </div>
          </CartProvider>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  )
}

export default App
