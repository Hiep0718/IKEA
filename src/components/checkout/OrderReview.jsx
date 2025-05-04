"use client"

import { Button, Divider, Descriptions } from "antd"
import { getProductImage } from "../../utils/imageUtils"

const OrderReview = ({ cartItems, shippingInfo, paymentMethod, total, onPlaceOrder, loading }) => {
  

  // Calculate subtotal
  const subtotal = total

  // Calculate shipping cost (free for orders over 1,000,000 VND)
  const shippingCost = subtotal > 1000000 ? 0 : 50000

  // Calculate total with shipping
  const totalWithShipping = subtotal + shippingCost

  // Get payment method display text
  const getPaymentMethodText = () => {
    switch (paymentMethod?.method) {
      case "credit-card":
        return "Thẻ tín dụng / Thẻ ghi nợ"
      case "bank-transfer":
        return "Chuyển khoản ngân hàng"
      case "cod":
        return "Thanh toán khi nhận hàng (COD)"
      default:
        return "Không xác định"
    }
  }

  // Get payment method details
  const getPaymentDetails = () => {
    if (paymentMethod?.method === "credit-card" && paymentMethod?.details?.cardNumber) {
      return `**** **** **** ${paymentMethod.details.cardNumber.slice(-4)}`
    }
    return null
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Xác nhận đơn hàng</h2>

      {/* Shipping information */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Thông tin giao hàng</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p className="font-medium">{shippingInfo?.recipient}</p>
          <p>{shippingInfo?.phone}</p>
          <p>{shippingInfo?.address}</p>
          <p>
            {shippingInfo?.ward}, {shippingInfo?.district}, {shippingInfo?.city}
          </p>
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Phương thức thanh toán</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p>{getPaymentMethodText()}</p>
          {getPaymentDetails() && <p className="text-gray-600">{getPaymentDetails()}</p>}
        </div>
      </div>

      {/* Order items */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Sản phẩm</h3>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-start border-b pb-4">
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={getProductImage(item.key) || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 flex-grow">
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">Số lượng: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${item.price * item.quantity}</p>
                <p className="text-gray-500 text-sm">${item.price} / sản phẩm</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Tóm tắt đơn hàng</h3>
        <div className="bg-gray-50 p-4 rounded">
          <Descriptions column={1} colon={false}>
            <Descriptions.Item label="Tạm tính">${subtotal}</Descriptions.Item>
            <Descriptions.Item label="Phí vận chuyển">
              {shippingCost === 0 ? "Miễn phí" : `$${shippingCost}`}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng cộng" className="font-bold">
              ${totalWithShipping}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>

      <Divider />

      {/* Place order button */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Tổng thanh toán</p>
          <p className="text-2xl font-bold">${totalWithShipping}</p>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={onPlaceOrder}
          loading={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Đặt hàng
        </Button>
      </div>
    </div>
  )
}

export default OrderReview
