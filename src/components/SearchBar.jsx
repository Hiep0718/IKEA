import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

const SearchBar = () => {
  return (
    <div className="max-w-xl w-full">
      <Input
        size="large"
        placeholder="What are you looking for?"
        prefix={<SearchOutlined />}
        suffix={<span className="cursor-pointer">📷</span>}
        className="rounded-full"
      />
    </div>
  )
}

export default SearchBar
