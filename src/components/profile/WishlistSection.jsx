"use client"

import { useState } from "react"
import { Card, Button, Empty, message } from "antd"
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { useCart } from "../../context/CartContext"
import { getProductImage } from "../../utils/imageUtils"

const WishlistSection = () => {
  // Mock data for wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "billy-bookcase",
      key: "billy",
      name: "BILLY Bookcase",
      price: 49.99,
      image: "billy",
    },
    {
      id: "malm-bed",
      key: "malm",
      name: "MALM Bed frame",
      price: 179.0,
      image: "malm",
    },
    {
      id: "poang-chair",
      key: "poang",
      name: "POÄNG Armchair",
      price: 99.0,
      image: "poang",
    },
  ])

  const { addToCart } = useCart() || {}

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
    message.success("Đã xóa sản phẩm khỏi danh sách yêu thích")
  }

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product, 1)
      message.success("Đã thêm sản phẩm vào giỏ hàng")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Danh sách yêu thích</h2>

      {wishlistItems.length === 0 ? (
        <Empty description="Danh sách yêu thích của bạn đang trống" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              cover={
                <img
                  alt={item.name}
                  src={getProductImage(item.key) || "/placeholder.svg"}
                  className="h-48 object-cover"
                />
              }
              actions={[
                <Button key="add" icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart(item)}>
                  Thêm vào giỏ
                </Button>,
                <Button key="remove" icon={<DeleteOutlined />} danger onClick={() => handleRemoveFromWishlist(item.id)}>
                  Xóa
                </Button>,
              ]}
            >
              <Card.Meta title={item.name} description={`$${item.price}`} />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default WishlistSection
