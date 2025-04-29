"use client";

import { Card, Rate, Button, Badge, Typography } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useCart } from "../context/CartContext";

const { Text, Title } = Typography;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderBadge = () => {
    if (product.bestSeller) {
      return <Badge.Ribbon text="Best Seller" color="gold" />;
    }
    if (product.lastChance) {
      return <Badge.Ribbon text="Last Chance" color="orange" />;
    }
    return null;
  };

  return (
    <Badge.Ribbon {...(renderBadge() ? {} : { style: { display: "none" } })}>
      <Card
        hoverable
        cover={
          <div className="aspect-square overflow-hidden">
            <img
              alt={product.name}
              src={product.image || "/placeholder.svg?height=300&width=300"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        }
        bodyStyle={{ padding: "12px" }}
        actions={[
          <Button
            key="add"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>,
          <Button key="favorite" icon={<HeartOutlined />} />,
        ]}
      >
        <Title level={5} className="mb-1">
          {product.name}
        </Title>
        <Text type="secondary" className="block mb-2">
          {product.description}
        </Text>
        <div className="flex justify-between items-center mb-2">
          <Text strong className="text-lg">
            ${product.price}
          </Text>
          <div className="flex items-center">
            <Rate
              disabled
              defaultValue={product.rating}
              allowHalf
              className="text-sm"
            />
            <Text type="secondary" className="ml-1">
              ({product.reviews})
            </Text>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default ProductCard;
