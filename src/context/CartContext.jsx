"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the cart context
const CartContext = createContext()

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext)
}

// Cart provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("ikeaCart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ikeaCart", JSON.stringify(cartItems))
  }, [cartItems])

  // Get total number of items in cart
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Get total price of items in cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { ...product, quantity }]
      }
    })

    // Open the cart when adding items
    setIsCartOpen(true)
  }

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([])
  }

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState)
  }

  // Close cart
  const closeCart = () => {
    setIsCartOpen(false)
  }

  const value = {
    cartItems,
    isCartOpen,
    getCartCount,
    getCartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleCart,
    closeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
