"use client"

import { useState } from "react"
import { ConfigProvider } from "antd"
import IkeaHeader from "./components/HeaderIKEA"
import IkeaNavigation from "./components/IkeaNavigation"
import IkeaFooter from "./components/IkeaFooter"
import ProductPage from "./pages/ProductPage"
import { CartProvider } from "./context/CartContext"
import HomePage from "./pages/homePage"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  // Function to change the current page
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <ConfigProvider>
      <CartProvider>
        <div className="w-full min-h-screen flex flex-col">
          <IkeaHeader />
          <IkeaNavigation />
          <main className="flex-grow">
            {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
            {currentPage === "product" && <ProductPage navigateTo={navigateTo} />}
          </main>
          <IkeaFooter />
        </div>
      </CartProvider>
    </ConfigProvider>
  )
}

export default App
