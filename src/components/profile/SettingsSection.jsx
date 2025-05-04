"use client"

import { useState } from "react"
import { Form, Input, Button, Switch, Divider, message, Modal } from "antd"
import { LockOutlined, GlobalOutlined, DeleteOutlined } from "@ant-design/icons"
import { useAuth } from "../../context/AuthContext"

const SettingsSection = () => {
  const { logout } = useAuth()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleChangePassword = (values) => {
    console.log("Change password values:", values)
    setLoading(true)
    // In a real app, you would send this data to a backend
    setTimeout(() => {
      message.success("Mật khẩu đã được thay đổi thành công")
      form.resetFields()
      setLoading(false)
    }, 1000)
  }

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: "Xác nhận xóa tài khoản",
      content: "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.",
      okText: "Xóa tài khoản",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // In a real app, you would send this request to a backend
        setTimeout(() => {
          message.success("Tài khoản đã được xóa")
          logout()
        }, 1000)
      },
    })
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Cài đặt tài khoản</h2>

      <div className="max-w-2xl">
        <h3 className="font-medium mb-4">Đổi mật khẩu</h3>
        <Form form={form} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu hiện tại" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error("Mật khẩu xác nhận không khớp"))
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-600 hover:bg-blue-700">
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <h3 className="font-medium mb-4">Thông báo</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Thông báo qua email</div>
              <div className="text-gray-500 text-sm">Nhận thông báo về đơn hàng và khuyến mãi qua email</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Thông báo đẩy</div>
              <div className="text-gray-500 text-sm">Nhận thông báo đẩy trên trình duyệt</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <Divider />

        <h3 className="font-medium mb-4">Ngôn ngữ và khu vực</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Ngôn ngữ</div>
              <div className="text-gray-500 text-sm">Chọn ngôn ngữ hiển thị</div>
            </div>
            <Button icon={<GlobalOutlined />}>Tiếng Việt</Button>
          </div>
        </div>

        <Divider />

        <h3 className="font-medium mb-4 text-red-600">Xóa tài khoản</h3>
        <p className="text-gray-500 mb-4">
          Khi bạn xóa tài khoản, tất cả dữ liệu cá nhân của bạn sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
        </p>
        <Button danger icon={<DeleteOutlined />} onClick={handleDeleteAccount}>
          Xóa tài khoản
        </Button>
      </div>
    </div>
  )
}

export default SettingsSection
