import { Link } from "react-router-dom"
import { Button } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { getRoomImage } from "../utils/imageUtils"

const RoomInspirationSection = () => {
  const roomTypes = [
    { id: "bedroom", name: "Bedroom", path: "/rooms/bedroom" },
    { id: "kitchen", name: "Kitchen", path: "/rooms/kitchen" },
    { id: "livingRoom", name: "Living room", path: "/rooms/living-room" },
    { id: "homeOffice", name: "Home office", path: "/rooms/home-office" },
    { id: "outdoor", name: "Outdoor", path: "/rooms/outdoor" },
    { id: "kidsRoom", name: "Kids room", path: "/rooms/kids-room" },
    { id: "bathroom", name: "Bathroom", path: "/rooms/bathroom" },
  ]

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Inspiration for every room</h2>
          <Button type="default" className="flex items-center">
            See all room inspiration <ArrowRightOutlined className="ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 overflow-x-auto pb-4">
          {roomTypes.map((room) => (
            <Link to={room.path} key={room.id} className="group flex flex-col items-center">
              <div className="relative overflow-hidden rounded-md mb-2">
                <img
                  src={getRoomImage(room.id) || "/placeholder.svg?height=200&width=200"}
                  alt={`${room.name} inspiration`}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center">
                <span className="font-medium">{room.name}</span>
                <ArrowRightOutlined className="ml-1 text-xs" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RoomInspirationSection
