"use client"

import { useState } from "react"
import { Button, Card, Modal, Form, Input, Select, Divider, Empty, message } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Nhà riêng",
      recipient: "Nguyễn Văn A",
      phone: "0987654321",
      address: "123 Đường Lê Lợi",
      ward: "Phường Bến Nghé",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      isDefault: true,
    },
    {
      id: 2,
      name: "Văn phòng",
      recipient: "Nguyễn Văn A",
      phone: "0987654321",
      address: "456 Đường Nguyễn Huệ",
      ward: "Phường Bến Nghé",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      isDefault: false,
    },
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentAddress, setCurrentAddress] = useState(null)
  const [form] = Form.useForm()

  const showModal = (address = null) => {
    setCurrentAddress(address)
    if (address) {
      form.setFieldsValue(address)
    } else {
      form.resetFields()
    }
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleSubmit = (values) => {
    if (currentAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === currentAddress.id
            ? { ...values, id: currentAddress.id, isDefault: values.isDefault ? true : addr.isDefault }
            : values.isDefault
              ? { ...addr, isDefault: false }
              : addr,
        ),
      )
      message.success("Địa chỉ đã được cập nhật")
    } else {
      // Add new address
      const newAddress = {
        ...values,
        id: Date.now(),
        isDefault: values.isDefault ? true : addresses.length === 0,
      }
      setAddresses(
        values.isDefault
          ? [newAddress, ...addresses.map((addr) => ({ ...addr, isDefault: false }))]
          : [...addresses, newAddress],
      )
      message.success("Địa chỉ đã được thêm")
    }
    setIsModalVisible(false)
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa địa chỉ này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        const updatedAddresses = addresses.filter((addr) => addr.id !== id)
        // If we deleted the default address and there are other addresses, make the first one default
        if (addresses.find((addr) => addr.id === id)?.isDefault && updatedAddresses.length > 0) {
          updatedAddresses[0].isDefault = true
        }
        setAddresses(updatedAddresses)
        message.success("Địa chỉ đã được xóa")
      },
    })
  }

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
    message.success("Đã đặt làm địa chỉ mặc định")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Địa chỉ của tôi</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Thêm địa chỉ mới
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Empty description="Bạn chưa có địa chỉ nào" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-blue-500" : ""}>
              {address.isDefault && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Mặc định</div>
              )}
              <div className="mb-1">
                <span className="font-medium">{address.name}</span>
              </div>
              <div className="text-gray-700 mb-3">
                <div>
                  {address.recipient} | {address.phone}
                </div>
                <div>{address.address}</div>
                <div>
                  {address.ward}, {address.district}, {address.city}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button icon={<EditOutlined />} size="small" onClick={() => showModal(address)}>
                  Sửa
                </Button>
                <Button icon={<DeleteOutlined />} size="small" danger onClick={() => handleDelete(address.id)}>
                  Xóa
                </Button>
                {!address.isDefault && (
                  <Button size="small" onClick={() => handleSetDefault(address.id)}>
                    Đặt làm mặc định
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={currentAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Tên địa chỉ" rules={[{ required: true, message: "Vui lòng nhập tên địa chỉ" }]}>
            <Input placeholder="Ví dụ: Nhà riêng, Văn phòng" />
          </Form.Item>

          <Form.Item
            name="recipient"
            label="Người nhận"
            rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
          >
            <Input placeholder="Họ tên người nhận" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input placeholder="Số điện thoại người nhận" />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
            <Input placeholder="Số nhà, tên đường" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              name="city"
              label="Tỉnh/Thành phố"
              rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
            >
              <Select placeholder="Chọn tỉnh/thành phố">
                <Select.Option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Select.Option>
                <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="district"
              label="Quận/Huyện"
              rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
            >
              <Select placeholder="Chọn quận/huyện">
                <Select.Option value="Quận 1">Quận 1</Select.Option>
                <Select.Option value="Quận 2">Quận 2</Select.Option>
                <Select.Option value="Quận 3">Quận 3</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="ward" label="Phường/Xã" rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}>
              <Select placeholder="Chọn phường/xã">
                <Select.Option value="Phường Bến Nghé">Phường Bến Nghé</Select.Option>
                <Select.Option value="Phường Bến Thành">Phường Bến Thành</Select.Option>
                <Select.Option value="Phường Đa Kao">Phường Đa Kao</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item name="isDefault" valuePropName="checked">
            <div className="flex items-center">
              <input type="checkbox" id="isDefault" className="mr-2" />
              <label htmlFor="isDefault">Đặt làm địa chỉ mặc định</label>
            </div>
          </Form.Item>

          <Divider />

          <div className="flex justify-end space-x-2">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
              {currentAddress ? "Cập nhật" : "Thêm địa chỉ"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AddressesSection
