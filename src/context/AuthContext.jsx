"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the auth context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

// Auth provider component
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("ikeaUser")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("ikeaUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("ikeaUser")
    }
  }, [user])

  // Login function
  const login = (email, password) => {
    // In a real app, you would validate credentials with a backend
    // For demo purposes, we'll accept any email with a password length > 5
    if (password.length > 5) {
      const newUser = {
        email,
        name: email.split("@")[0], // Use part of email as name
        isLoggedIn: true,
      }
      setUser(newUser)
      setIsLoginModalOpen(false)
      return { success: true }
    }
    return {
      success: false,
      error: "Mật khẩu phải có ít nhất 6 ký tự",
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
  }

  // Register function
  const register = (email, password, name) => {
    // In a real app, you would send this data to a backend
    // For demo purposes, we'll accept any registration with valid format
    if (password.length > 5 && email.includes("@")) {
      const newUser = {
        email,
        name: name || email.split("@")[0],
        isLoggedIn: true,
      }
      setUser(newUser)
      setIsLoginModalOpen(false)
      return { success: true }
    }
    return {
      success: false,
      error: "Email không hợp lệ hoặc mật khẩu phải có ít nhất 6 ký tự",
    }
  }

  // Open login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  // Close login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const value = {
    user,
    isLoginModalOpen,
    login,
    logout,
    register,
    openLoginModal,
    closeLoginModal,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
