import { RightOutlined } from "@ant-design/icons"

const Breadcrumb = ({ items = [] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <nav className="flex items-center text-sm">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <RightOutlined className="text-gray-400 mx-2 text-xs" />}
            {index === items.length - 1 ? (
              <span className="text-gray-600">{item.label}</span>
            ) : (
              <a href={item.path} className="text-gray-900 hover:underline">
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Breadcrumb
