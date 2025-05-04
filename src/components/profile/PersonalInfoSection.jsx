"use client"

import { useState } from "react"
import { Form, Input, Button, DatePicker, Select, Divider, message } from "antd"
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { useAuth } from "../../context/AuthContext"
import moment from "moment"

const PersonalInfoSection = ({ user }) => {
  const { updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // Initialize form with user data
  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    birthday: user.birthday ? moment(user.birthday) : null,
    gender: user.gender || "",
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      // In a real app, you would send this data to a backend
      // For demo purposes, we'll just update the local state
      await updateUserProfile({
        ...values,
        birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
      })
      message.success("Thông tin cá nhân đã được cập nhật")
      setIsEditing(false)
    } catch (error) {
        console.error("Error updating user profile:", error)
      message.error("Đã xảy ra lỗi khi cập nhật thông tin")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
        {!isEditing && (
          <Button type="primary" onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
            Chỉnh sửa
          </Button>
        )}
      </div>

      {isEditing ? (
        <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleSubmit} className="max-w-2xl">
          <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
            <Input prefix={<UserOutlined />} placeholder="Họ tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item name="birthday" label="Ngày sinh">
            <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày sinh" className="w-full" />
          </Form.Item>

          <Form.Item name="gender" label="Giới tính">
            <Select placeholder="Chọn giới tính">
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
              <Select.Option value="other">Khác</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex space-x-4">
              <Button type="primary" htmlType="submit" loading={loading} className="bg-blue-600 hover:bg-blue-700">
                Lưu thay đổi
              </Button>
              <Button onClick={() => setIsEditing(false)}>Hủy</Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm mb-1">Họ tên</p>
              <p className="font-medium">{user.name || "Chưa cập nhật"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Số điện thoại</p>
              <p className="font-medium">{user.phone || "Chưa cập nhật"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Ngày sinh</p>
              <p className="font-medium">
                {user.birthday ? moment(user.birthday).format("DD/MM/YYYY") : "Chưa cập nhật"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mb-1">Giới tính</p>
              <p className="font-medium">
                {user.gender === "male"
                  ? "Nam"
                  : user.gender === "female"
                    ? "Nữ"
                    : user.gender === "other"
                      ? "Khác"
                      : "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="font-medium mb-4">Bảo mật</h3>
            <Button>Đổi mật khẩu</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalInfoSection
