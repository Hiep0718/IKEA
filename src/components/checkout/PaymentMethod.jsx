"use client"

import { useState } from "react"
import { Radio, Form, Input, Button, Divider, Collapse } from "antd"
import { CreditCardOutlined, BankOutlined, DollarOutlined, SafetyOutlined } from "@ant-design/icons"

const { Panel } = Collapse

const PaymentMethod = ({ onSelect }) => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    setLoading(true)
    setTimeout(() => {
      onSelect({
        method: paymentMethod,
        details: values,
      })
      setLoading(false)
    }, 500)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="paymentMethod" className="mb-6">
          <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <Radio value="credit-card" className="w-full">
                  <div className="flex items-center ml-2">
                    <CreditCardOutlined className="text-xl mr-2" />
                    <span>Thẻ tín dụng / Thẻ ghi nợ</span>
                  </div>
                </Radio>

                {paymentMethod === "credit-card" && (
                  <div className="mt-4 ml-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        name="cardNumber"
                        label="Số thẻ"
                        rules={[{ required: true, message: "Vui lòng nhập số thẻ" }]}
                        className="md:col-span-2"
                      >
                        <Input placeholder="1234 5678 9012 3456" />
                      </Form.Item>

                      <Form.Item
                        name="cardName"
                        label="Tên chủ thẻ"
                        rules={[{ required: true, message: "Vui lòng nhập tên chủ thẻ" }]}
                      >
                        <Input placeholder="NGUYEN VAN A" />
                      </Form.Item>

                      <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                          name="expiry"
                          label="Ngày hết hạn"
                          rules={[{ required: true, message: "Vui lòng nhập ngày hết hạn" }]}
                        >
                          <Input placeholder="MM/YY" />
                        </Form.Item>

                        <Form.Item name="cvv" label="CVV" rules={[{ required: true, message: "Vui lòng nhập mã CVV" }]}>
                          <Input placeholder="123" />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <SafetyOutlined className="mr-1" />
                      <span>Thông tin thẻ của bạn được bảo mật</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <Radio value="bank-transfer" className="w-full">
                  <div className="flex items-center ml-2">
                    <BankOutlined className="text-xl mr-2" />
                    <span>Chuyển khoản ngân hàng</span>
                  </div>
                </Radio>

                {paymentMethod === "bank-transfer" && (
                  <div className="mt-4 ml-6">
                    <Collapse ghost>
                      <Panel header="Thông tin chuyển khoản" key="1">
                        <div className="bg-gray-50 p-4 rounded">
                          <p className="font-medium">Ngân hàng: VIETCOMBANK</p>
                          <p>Số tài khoản: 1234567890</p>
                          <p>Chủ tài khoản: CÔNG TY TNHH IKEA VIỆT NAM</p>
                          <p>Nội dung: [Họ tên] - [Số điện thoại]</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Vui lòng chuyển khoản trong vòng 24 giờ. Đơn hàng sẽ được xử lý sau khi chúng tôi nhận được
                            thanh toán.
                          </p>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <Radio value="cod" className="w-full">
                  <div className="flex items-center ml-2">
                    <DollarOutlined className="text-xl mr-2" />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </div>
                </Radio>
              </div>
            </div>
          </Radio.Group>
        </Form.Item>

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

export default PaymentMethod
