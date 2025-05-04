"use client"

import { useState } from "react"
import { Tabs, Table, Tag, Button, Empty } from "antd"
import { EyeOutlined } from "@ant-design/icons"

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data for orders
  const orders = [
    {
      id: "ORD-12345",
      date: "2023-05-15",
      total: 1299000,
      status: "completed",
      items: [
        { id: 1, name: "BILLY Bookcase", quantity: 1, price: 499000 },
        { id: 2, name: "POÄNG Armchair", quantity: 1, price: 800000 },
      ],
      tracking: "VN123456789",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-12346",
      date: "2023-06-20",
      total: 2499000,
      status: "processing",
      items: [{ id: 3, name: "MALM Bed frame", quantity: 1, price: 2499000 }],
      tracking: "",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "ORD-12347",
      date: "2023-07-05",
      total: 799000,
      status: "shipped",
      items: [{ id: 4, name: "KALLAX Shelf unit", quantity: 1, price: 799000 }],
      tracking: "VN987654321",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD-12348",
      date: "2023-08-10",
      total: 349000,
      status: "cancelled",
      items: [{ id: 5, name: "LACK Side table", quantity: 1, price: 349000 }],
      tracking: "",
      paymentMethod: "Cash on Delivery",
    },
  ]

  // Filter orders based on active tab
  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN")
  }

  // Status tag color mapping
  const statusColors = {
    processing: "blue",
    shipped: "orange",
    completed: "green",
    cancelled: "red",
  }

  // Status text mapping
  const statusText = {
    processing: "Đang xử lý",
    shipped: "Đang giao hàng",
    completed: "Đã giao hàng",
    cancelled: "Đã hủy",
  }

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (date) => formatDate(date),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => formatCurrency(total),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColors[status]}>{statusText[status]}</Tag>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        console.log(record) || (
          <Button icon={<EyeOutlined />} size="small" onClick={() => console.log(record)}>
            Chi tiết
          </Button>
        ),
        <Button icon={<EyeOutlined />} size="small">
          Chi tiết
        </Button>
      ),
    },
  ]

  const tabItems = [
    {
      key: "all",
      label: "Tất cả",
    },
    {
      key: "processing",
      label: "Đang xử lý",
    },
    {
      key: "shipped",
      label: "Đang giao hàng",
    },
    {
      key: "completed",
      label: "Đã giao hàng",
    },
    {
      key: "cancelled",
      label: "Đã hủy",
    },
  ]

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Đơn hàng của tôi</h2>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

      {filteredOrders.length === 0 ? (
        <Empty description="Không có đơn hàng nào" />
      ) : (
        <Table columns={columns} dataSource={filteredOrders} rowKey="id" pagination={{ pageSize: 5 }} />
      )}
    </div>
  )
}

export default OrdersSection
