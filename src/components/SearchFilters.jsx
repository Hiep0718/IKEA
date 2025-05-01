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

  const handleColorChange = (e) => {
    onFilterChange("color", e.target.value);
  };

  const handleMaterialChange = (e) => {
    onFilterChange("material", e.target.value);
  };

  const clearAllFilters = () => {
    // Clear all filters by setting each to null
    onFilterChange("categoryId", null);
    onFilterChange("priceRange", null);
    onFilterChange("bestSeller", null);
    onFilterChange("lastChance", null);
    onFilterChange("color", null);
    onFilterChange("material", null);
  };

  const priceRanges = [
    { value: "0-100", label: "Under $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-5000", label: "$1,000 - $5,000" },
    { value: "5000+", label: "Over $5,000" },
  ];

  const colors = [
    { value: "white", label: "White" },
    { value: "black", label: "Black" },
    { value: "gray", label: "Gray" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "brown", label: "Brown" },
    { value: "beige", label: "Beige" },
  ];

  const materials = [
    { value: "wood", label: "Wood" },
    { value: "fabric", label: "Fabric" },
    { value: "plastic", label: "Plastic" },
    { value: "metal", label: "Metal" },
    { value: "rattan", label: "Rattan" },
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

      <Collapse
        defaultActiveKey={["category", "price", "special", "color", "material"]}
        ghost
      >
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

        <Panel header="Color" key="color">
          <Radio.Group value={activeFilters.color} onChange={handleColorChange}>
            <Space direction="vertical">
              {colors.map((color) => (
                <Radio key={color.value} value={color.value}>
                  {color.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Panel>

        <Panel header="Material" key="material">
          <Radio.Group
            value={activeFilters.material}
            onChange={handleMaterialChange}
          >
            <Space direction="vertical">
              {materials.map((material) => (
                <Radio key={material.value} value={material.value}>
                  {material.label}
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
