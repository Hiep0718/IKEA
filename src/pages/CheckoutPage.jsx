"use client"

import { useState, useEffect } from "react"
import { Steps, Button, message } from "antd"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import Breadcrumb from "../components/Breadcrumb"
import CartSummary from "../components/checkout/CartSummary"
import ShippingForm from "../components/checkout/ShippingForm"
import PaymentMethod from "../components/checkout/PaymentMethod"
import OrderReview from "../components/checkout/OrderReview"
import OrderConfirmation from "../components/checkout/OrderConfirmation"

const CheckoutPage = ({ navigateTo }) => {
  const { user } = useAuth()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [shippingInfo, setShippingInfo] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [orderNumber, setOrderNumber] = useState(null)
  const [loading, setLoading] = useState(false)

  // Breadcrumb items for checkout page
  const breadcrumbItems = [
    { label: "Trang chủ", path: "#" },
    { label: "Giỏ hàng", path: "#" },
    { label: "Thanh toán", path: "#" },
  ]

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && currentStep === 0) {
      message.info("Giỏ hàng của bạn đang trống")
      navigateTo && navigateTo("home")
    }
  }, [cartItems, navigateTo, currentStep])

  // Handle next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  // Handle previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Handle shipping form submission
  const handleShippingSubmit = (values) => {
    setShippingInfo(values)
    nextStep()
  }

  // Handle payment method selection
  const handlePaymentSelect = (method) => {
    setPaymentMethod(method)
    nextStep()
  }

  // Handle order placement
  const handlePlaceOrder = () => {
    setLoading(true)
    // Simulate API call to place order
    setTimeout(() => {
      // Generate random order number
      const newOrderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000)
      setOrderNumber(newOrderNumber)
      clearCart()
      setLoading(false)
      nextStep()
    }, 1500)
  }

  // Steps for checkout process
  const steps = [
    {
      title: "Thông tin giao hàng",
      content: <ShippingForm onSubmit={handleShippingSubmit} user={user} />,
    },
    {
      title: "Phương thức thanh toán",
      content: <PaymentMethod onSelect={handlePaymentSelect} />,
    },
    {
      title: "Xác nhận đơn hàng",
      content: (
        <OrderReview
          cartItems={cartItems}
          shippingInfo={shippingInfo}
          paymentMethod={paymentMethod}
          total={getCartTotal()}
          onPlaceOrder={handlePlaceOrder}
          loading={loading}
        />
      ),
    },
    {
      title: "Hoàn tất",
      content: <OrderConfirmation orderNumber={orderNumber} navigateTo={navigateTo} />,
    },
  ]

  return (
    <div className="bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button to return to home */}
        <button onClick={() => navigateTo("home")} className="mb-6 text-blue-600 hover:underline flex items-center">
          ← Quay lại trang chủ
        </button>

        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main checkout content */}
          <div className="lg:w-2/3">
            <Steps current={currentStep} items={steps.map((item) => ({ title: item.title }))} className="mb-8" />

            <div className="bg-white p-6 border border-gray-200 rounded-lg mb-6">{steps[currentStep].content}</div>

            {/* Navigation buttons */}
            {currentStep < steps.length - 1 && currentStep > 0 && (
              <div className="flex justify-between mt-4">
                <Button onClick={prevStep}>Quay lại</Button>
                {currentStep !== 2 && (
                  <Button type="primary" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Tiếp tục
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:w-1/3">
            {currentStep < 3 && <CartSummary cartItems={cartItems} total={getCartTotal()} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
