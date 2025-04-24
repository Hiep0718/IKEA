import { TruckOutlined } from "@ant-design/icons"

const ShippingBanner = () => {
  return (
    <div className="border-t border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center text-sm">
          <TruckOutlined className="mr-2 text-blue-600" />
          <span>Free shipping on qualifying small orders over $50 for IKEA Family members</span>
        </div>
      </div>
    </div>
  )
}

export default ShippingBanner
