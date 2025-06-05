import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchFilterProps } from "@/types/searchFilter/types";

const SearchFilter: React.FC<SearchFilterProps> = ({
  placeholder = "Buscar...",
  value,
  onChange,
  className = "",
  loading = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`search-filter-container ${className}`}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined className="text-gray-500" />}
        value={value}
        onChange={handleChange}
        size="large"
        className="search-input"
        allowClear
      />
    </div>
  );
};

export default SearchFilter;