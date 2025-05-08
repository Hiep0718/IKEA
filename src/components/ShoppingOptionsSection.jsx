import { Link } from "react-router-dom"

const ShoppingOptionsSection = () => {
  const shoppingOptions = [
    {
      id: "free-shipping",
      title: "Free shipping on small orders over $50. It's easy and convenient!",
      description:
        "IKEA Family members get free shipping on qualifying orders of in-stock home accessories, décor, and select small furniture to your home or one of our 15,000 convenient pick-up locations. Some restrictions apply.",
      image: "https://www.ikea.com/images/5f/aa/5faab210c238c27a9d7fa129405601aa.jpg?f=s",
      learnMoreLink: "/customer-service/shipping",
    },
    {
      id: "click-collect",
      title: "Need it fast? Try Click & collect!",
      description:
        "Order online and pick up at your local store. Just select pick up at checkout, choose a time that's most convenient and we'll even bring it to your car!",
      image: "https://www.ikea.com/images/a3/16/a316e78b331bd2d26bcaeb50163350b9.jpg?f=s",
      learnMoreLink: "/customer-service/click-and-collect",
    },
    {
      id: "standard-delivery",
      title: "Standard delivery starts at $19",
      description:
        "With affordable delivery, shopping is easier than ever. Select scheduled doorstep or in-home delivery for even more convenience.",
      image: "https://www.ikea.com/images/f9/cf/f9cf2428eb52f1c39f372e2db0f477fb.jpg?f=s",
      learnMoreLink: "/customer-service/delivery",
    },
  ]

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Discover how convenient shopping at IKEA can be!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {shoppingOptions.map((option) => (
            <div key={option.id} className="flex flex-col">
              <div className="mb-4 overflow-hidden rounded-md">
                <img
                  src={option.image || "/placeholder.svg"}
                  alt={option.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{option.title}</h3>
              <p className="text-gray-700 mb-4 flex-grow">{option.description}</p>
              <Link to={option.learnMoreLink} className="text-blue-600 font-medium hover:underline">
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShoppingOptionsSection
