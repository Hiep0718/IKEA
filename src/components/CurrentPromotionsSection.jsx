import { Link } from "react-router-dom"
import { ArrowRightOutlined } from "@ant-design/icons"
import { getImage } from "../utils/imageUtils"

const CurrentPromotionsSection = () => {
  const promotions = [
    {
      id: "small-business",
      title: "Celebrate Small Business Month!",
      image: "https://www.ikea.com/ext/ingkadam/m/1b7b0ca70af83e37/original/PH198178.JPG?f=xs",
      path: "/campaigns/small-business",
    },
    {
      id: "fathers-day",
      title: "Get Father's Day gift ideas",
      image: "https://www.ikea.com/ext/ingkadam/m/2a6614706a298350/original/PH188721.jpg?f=sg",
      path: "/campaigns/fathers-day",
    },
    {
      id: "mothers-day",
      title: "Mother's Day gift ideas",
      image: "https://www.ikea.com/ext/ingkadam/m/5fc206dc1ae77125/original/PH170899.jpg?f=sg",
      path: "/campaigns/mothers-day",
    },
    {
      id: "summer",
      title: "Shop summer-ready essentials",
      image: "https://www.ikea.com/ext/ingkadam/m/6a9346536ed5e0cd/original/PH202305.jpg?f=s&r=3:4&p=0.2,0.5",
      path: "/campaigns/summer-essentials",
    },
    {
      id: "college",
      title: "Find college living must-haves",
      image: "https://www.ikea.com/images/d4/b7/d4b74fdd0b22c84f454e38ef72c10c44.jpg?f=xl",
      path: "/campaigns/college-living",
    },
    {
      id: "refresh",
      title: "Refresh for the season",
      image: "https://www.ikea.com/ext/ingkadam/m/1ea25458cc27ebd4/original/PE952301.jpg?f=xs",
      path: "/campaigns/seasonal-refresh",
    },
  ]

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Right now at IKEA</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {promotions.map((promo) => (
            <Link to={promo.path} key={promo.id} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-md mb-2">
                <img
                  src={promo.image || getImage("placeholders.banner")}
                  alt={promo.title}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center">
                <span className="font-medium text-sm">{promo.title}</span>
                <ArrowRightOutlined className="ml-1 text-xs" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CurrentPromotionsSection
