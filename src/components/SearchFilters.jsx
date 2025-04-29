"use client";
import {
  Card,
  Checkbox,
  Collapse,
  Radio,
  Space,
  Button,
  Typography,
} from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const SearchFilters = ({ categories, activeFilters, onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange("categoryId", e.target.value);
  };

  const handleSpecialFilterChange = (filterType) => {
    onFilterChange(filterType, activeFilters[filterType] ? null : true);
  };

  const handlePriceRangeChange = (e) => {
    onFilterChange("priceRange", e.target.value);
  };

  const clearAllFilters = () => {
    // Clear all filters by setting each to null/undefined
    onFilterChange("categoryId", null);
    onFilterChange("priceRange", null);
    onFilterChange("bestSeller", null);
    onFilterChange("lastChance", null);
  };

  const priceRanges = [
    { value: "0-100", label: "Under $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-5000", label: "$1,000 - $5,000" },
    { value: "5000+", label: "Over $5,000" },
  ];

  return (
    <Card className="sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">
          Filters
        </Title>
        <Button type="link" onClick={clearAllFilters}>
          Clear all
        </Button>
      </div>

      <Collapse defaultActiveKey={["category", "price", "special"]} ghost>
        <Panel header="Categories" key="category">
          <Radio.Group
            value={activeFilters.categoryId}
            onChange={handleCategoryChange}
          >
            <Space direction="vertical">
              {categories.map((category) => (
                <Radio key={category.id} value={category.id}>
                  {category.name}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Panel>

        <Panel header="Price" key="price">
          <Radio.Group
            value={activeFilters.priceRange}
            onChange={handlePriceRangeChange}
          >
            <Space direction="vertical">
              {priceRanges.map((range) => (
                <Radio key={range.value} value={range.value}>
                  {range.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Panel>

        <Panel header="Special" key="special">
          <Space direction="vertical">
            <Checkbox
              checked={activeFilters.bestSeller === true}
              onChange={() => handleSpecialFilterChange("bestSeller")}
            >
              Best Seller
            </Checkbox>
            <Checkbox
              checked={activeFilters.lastChance === true}
              onChange={() => handleSpecialFilterChange("lastChance")}
            >
              Last Chance
            </Checkbox>
          </Space>
        </Panel>
      </Collapse>
    </Card>
  );
};

export default SearchFilters;
