import { Button } from "antd"
import { CheckCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const OrderConfirmation = ({ orderNumber }) => {
  return (
    <div className="text-center py-8">
      <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
      <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
      <p className="text-gray-600 mb-6">
        Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là <strong>{orderNumber}</strong>
      </p>
      <p className="text-gray-600 mb-8">
        Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn. Bạn có thể theo dõi đơn hàng trong phần "Đơn
        hàng của tôi" trong tài khoản của bạn.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
          <Link to="/profile">Xem đơn hàng của tôi</Link>
        </Button>
        <Button size="large">
          <Link to="/">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    </div>
  )
}

export default OrderConfirmation
