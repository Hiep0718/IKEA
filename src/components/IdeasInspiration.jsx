import { Card } from "antd"

const IdeasInspiration = () => {
  const ideas = [
    {
      id: 1,
      title: "Small space living ideas",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      title: "Bedroom inspiration",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      title: "Kitchen organization tips",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Ideas & Inspiration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <Card
              key={idea.id}
              cover={<img alt={idea.title} src={idea.image || "/placeholder.svg"} />}
              className="overflow-hidden"
            >
              <h3 className="text-lg font-medium">{idea.title}</h3>
              <button className="text-blue-600 font-medium mt-2">Explore more</button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IdeasInspiration
