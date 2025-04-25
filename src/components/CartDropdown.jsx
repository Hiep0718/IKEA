"use client"

import { useCart } from "../context/CartContext"
import { Button, InputNumber } from "antd"
import { CloseOutlined, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { getProductImage } from "../utils/imageUtils"

const CartDropdown = () => {
  const { cartItems, isCartOpen, getCartTotal, updateQuantity, removeFromCart, closeCart } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Semi-transparent backdrop - FIXED: reduced opacity from 0.5 to 0.2 */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={closeCart}></div>

      {/* Cart panel - UPDATED: changed to light blue background */}
      <div className="relative w-full max-w-md bg-[#e6f0f9] h-full overflow-auto shadow-xl">
        {/* Cart header */}
        <div className="sticky top-0 bg-[#e6f0f9] z-10 flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <ShoppingCartOutlined className="text-xl mr-2" />
            <h2 className="text-lg font-medium">Your cart ({cartItems.length})</h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-blue-100 rounded-full" aria-label="Close cart">
            <CloseOutlined />
          </button>
        </div>

        {/* Cart content */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 mb-4 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
              </div>
              <p className="text-gray-500 text-center">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b pb-4">
                  {/* Product image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={getProductImage(item.key) || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">${item.price}</p>

                    {/* Quantity control */}
                    <div className="mt-2 flex items-center">
                      <span className="text-sm mr-2">Qty:</span>
                      <InputNumber
                        min={1}
                        max={99}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value)}
                        className="w-16"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart footer */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-[#e6f0f9] border-t p-4 space-y-4">
            <div className="flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>${getCartTotal()}</span>
            </div>
            <p className="text-xs text-gray-500">Shipping and taxes calculated at checkout</p>
            <Button type="primary" size="large" block className="bg-blue-600 hover:bg-blue-700">
              Checkout
            </Button>
            <Button size="large" block onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDropdown
