"use client"

import { useState } from "react"
import { Modal, Form, Input, Button, Tabs, message } from "antd"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"
import { useAuth } from "../context/AuthContext"

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login, register } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values) => {
    setLoading(true)
    try {
      const result = await login(values.email, values.password)
      if (!result.success) {
        message.error(result.error)
      } else {
        message.success("Đăng nhập thành công!")
        loginForm.resetFields()
      }
    } catch (error) {
        console.log(error)
      message.error("Đã xảy ra lỗi khi đăng nhập")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (values) => {
    setLoading(true)
    try {
      const result = await register(values.email, values.password, values.name)
      if (!result.success) {
        message.error(result.error)
      } else {
        message.success("Đăng ký thành công!")
        registerForm.resetFields()
      }
    } catch (error) {
        console.log(error)
      message.error("Đã xảy ra lỗi khi đăng ký")
    } finally {
      setLoading(false)
    }
  }

  const items = [
    {
      key: "login",
      label: "Đăng nhập",
      children: (
        <Form form={loginForm} name="login" onFinish={handleLogin} layout="vertical" requiredMark={false}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="text-center">
            <a href="#" className="text-blue-600">
              Quên mật khẩu?
            </a>
          </div>
        </Form>
      ),
    },
    {
      key: "register",
      label: "Đăng ký",
      children: (
        <Form form={registerForm} name="register" onFinish={handleRegister} layout="vertical" requiredMark={false}>
          <Form.Item name="name" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
            <Input prefix={<UserOutlined />} placeholder="Họ tên" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Đăng ký
            </Button>
          </Form.Item>
          <p className="text-center text-sm text-gray-500">
            Bằng cách đăng ký, bạn đồng ý với các điều khoản và điều kiện của IKEA
          </p>
        </Form>
      ),
    },
  ]

  return (
    <Modal
      open={isLoginModalOpen}
      onCancel={closeLoginModal}
      footer={null}
      width={400}
      centered
      title={null}
    >
      <div className="mb-6 text-center">
        <div className="inline-block h-10 w-16 rounded-4xl items-center justify-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/800px-Ikea_logo.svg.png" alt="" />
        </div>
        <h2 className="text-2xl font-bold">Hej! Chào mừng đến với IKEA</h2>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} centered />
    </Modal>
  )
}

export default LoginModal
