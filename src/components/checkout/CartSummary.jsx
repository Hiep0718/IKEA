"use client"

import { Divider } from "antd"

const CartSummary = ({ cartItems, total }) => {
  // Format currency
    

  // Calculate subtotal
  const subtotal = total

  // Calculate shipping cost (free for orders over 1,000,000 VND)
  const shippingCost = subtotal > 1000000 ? 0 : 50000

  // Calculate total with shipping
  const totalWithShipping = subtotal + shippingCost

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

      {/* Cart items */}
      <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start">
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={item.image|| "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3 flex-grow">
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">Số lượng: {item.quantity}</p>
              <p className="text-gray-700">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* Price summary */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{shippingCost === 0 ? "Miễn phí" : `$${shippingCost}`}</span>
        </div>
        {shippingCost === 0 && (
          <div className="text-green-600 text-sm">Miễn phí vận chuyển cho đơn hàng trên $1,000,000</div>
        )}
      </div>

      <Divider />

      {/* Total */}
      <div className="flex justify-between font-bold text-lg">
        <span>Tổng cộng</span>
        <span>${totalWithShipping}</span>
      </div>
    </div>
  )
}

export default CartSummary
