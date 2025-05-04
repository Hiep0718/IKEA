"use client"

import { Result, Button } from "antd"
import { CheckCircleOutlined, HomeOutlined, FileTextOutlined } from "@ant-design/icons"

const OrderConfirmation = ({ orderNumber, navigateTo }) => {
  return (
    <Result
      icon={<CheckCircleOutlined className="text-green-500" />}
      title="Đặt hàng thành công!"
      subTitle={
        <div className="text-center">
          <p>Cảm ơn bạn đã mua sắm tại IKEA.</p>
          <p className="font-medium">
            Mã đơn hàng: <span className="text-blue-600">{orderNumber}</span>
          </p>
          <p className="mt-2">
            Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn. Bạn có thể theo dõi trạng thái đơn hàng
            trong trang "Đơn hàng của tôi".
          </p>
        </div>
      }
      extra={[
        <Button
          key="home"
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => navigateTo("home")}
          className="bg-blue-600 hover:bg-blue-700 mr-4"
        >
          Tiếp tục mua sắm
        </Button>,
        <Button key="orders" icon={<FileTextOutlined />} onClick={() => navigateTo("profile")}>
          Xem đơn hàng của tôi
        </Button>,
      ]}
    />
  )
}

export default OrderConfirmation
