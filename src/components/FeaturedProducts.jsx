import { Card } from "antd"

const { Meta } = Card

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "BILLY Bookcase",
      price: "$49.99",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "MALM Bed frame",
      price: "$179.00",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "POÄNG Armchair",
      price: "$99.00",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "KALLAX Shelf unit",
      price: "$79.99",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Popular products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              hoverable
              cover={<img alt={product.name} src={product.image || "/placeholder.svg"} />}
              className="overflow-hidden"
            >
              <Meta title={product.name} description={product.price} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
