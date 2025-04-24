import { Menu } from "antd"

const MainNavigation = () => {
  const menuItems = [
    {
      key: "products",
      label: "Products",
    },
    {
      key: "rooms",
      label: "Rooms",
    },
    {
      key: "deals",
      label: "Deals",
    },
    {
      key: "spring-home",
      label: "Spring home ideas",
    },
    {
      key: "home-accessories",
      label: "Home accessories",
    },
    {
      key: "ideas-inspiration",
      label: "Ideas & Inspiration",
    },
    {
      key: "design-planning",
      label: "Design & planning",
    },
    {
      key: "business",
      label: "IKEA for Business",
    },
    {
      key: "services",
      label: "Services & support",
    },
  ]

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto">
        <Menu mode="horizontal" items={menuItems} className="border-0" />
      </div>
    </div>
  )
}

export default MainNavigation
