"use client"

import { useState, useEffect } from "react"
import { Form, Input, Select, Button, Radio, Divider } from "antd"
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons"

const ShippingForm = ({ onSubmit, user }) => {
  const [form] = Form.useForm()
  const [addressType, setAddressType] = useState("existing")
  const [loading, setLoading] = useState(false)
  // Mock saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: "Nhà riêng",
      recipient: user?.name || "Nguyễn Văn A",
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
      recipient: user?.name || "Nguyễn Văn A",
      phone: "0987654321",
      address: "456 Đường Nguyễn Huệ",
      ward: "Phường Bến Nghé",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      isDefault: false,
    },
  ])

  // Set default values based on user data
  useEffect(() => {
    if (user && addressType === "new") {
      form.setFieldsValue({
        recipient: user.name,
        phone: user.phone,
      })
    }
  }, [user, form, addressType])

  const handleSubmit = (values) => {
    setLoading(true)

    // If using existing address, find the selected address
    if (addressType === "existing" && values.addressId) {
      const selectedAddress = savedAddresses.find((addr) => addr.id === values.addressId)
      if (selectedAddress) {
        setTimeout(() => {
          onSubmit(selectedAddress)
          setLoading(false)
        }, 500)
        return
      }
    }

    // Otherwise use the new address
    setTimeout(() => {
      onSubmit(values)
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

      <Radio.Group value={addressType} onChange={(e) => setAddressType(e.target.value)} className="mb-6">
        <Radio.Button value="existing">Địa chỉ đã lưu</Radio.Button>
        <Radio.Button value="new">Địa chỉ mới</Radio.Button>
      </Radio.Group>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ addressId: savedAddresses.find((addr) => addr.isDefault)?.id }}
      >
        {addressType === "existing" ? (
          <div className="space-y-4">
            <Form.Item name="addressId" rules={[{ required: true, message: "Vui lòng chọn địa chỉ giao hàng" }]}>
              <Radio.Group className="w-full">
                {savedAddresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4 mb-3 w-full">
                    <Radio value={address.id} className="w-full">
                      <div className="ml-2">
                        <div className="font-medium">{address.name}</div>
                        <div className="text-sm text-gray-600">
                          <div>
                            {address.recipient} | {address.phone}
                          </div>
                          <div>{address.address}</div>
                          <div>
                            {address.ward}, {address.district}, {address.city}
                          </div>
                        </div>
                      </div>
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="recipient"
              label="Người nhận"
              rules={[{ required: true, message: "Vui lòng nhập tên người nhận" }]}
              className="md:col-span-2"
            >
              <Input prefix={<UserOutlined />} placeholder="Họ tên người nhận" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              className="md:col-span-2"
            >
              <Input prefix={<HomeOutlined />} placeholder="Số nhà, tên đường" />
            </Form.Item>

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

            <Form.Item name="saveAddress" valuePropName="checked" className="md:col-span-2">
              <div className="flex items-center">
                <input type="checkbox" id="saveAddress" className="mr-2" />
                <label htmlFor="saveAddress">Lưu địa chỉ này cho lần sau</label>
              </div>
            </Form.Item>
          </div>
        )}

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-600 hover:bg-blue-700">
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ShippingForm
