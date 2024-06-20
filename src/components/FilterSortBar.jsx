import React, { useState } from "react";

const FilterSortBar = ({ onSortChange, onFilterChange }) => {
  const [sort, setSort] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [usefulSurface, setUsefulSurface] = useState("");
  const [postType, setPostType] = useState("");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    onSortChange(value);
  };

  const handlePropertyTypeChange = (e) => {
    const value = e.target.value;
    setPropertyType(value);
    onFilterChange({
      propertyType: value,
      numberOfRooms,
      usefulSurface,
      postType,
    });
  };

  const handleRoomsChange = (e) => {
    const value = e.target.value;
    setNumberOfRooms(value);
    onFilterChange({
      propertyType,
      numberOfRooms: value,
      usefulSurface,
      postType,
    });
  };

  const handleSurfaceChange = (e) => {
    const value = e.target.value;
    setUsefulSurface(value);
    onFilterChange({
      propertyType,
      numberOfRooms,
      usefulSurface: value,
      postType,
    });
  };

  const handlePostTypeChange = (e) => {
    const value = e.target.value;
    setPostType(value);
    onFilterChange({
      propertyType,
      numberOfRooms,
      usefulSurface,
      postType: value,
    });
  };

  return (
    <div className="flex flex-wrap justify-between items-center mb-8 p-4 bg-gray-700 rounded-lg shadow-lg">
      <div className="flex items-center mb-4 md:mb-0">
        <label className="text-white mr-4">Sort by:</label>
        <select
          value={sort}
          onChange={handleSortChange}
          className="bg-gray-900 text-white px-3 py-2 rounded-md"
        >
          <option value="">Select</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <div className="flex items-center mb-4 md:mb-0 ml-2">
        <label className="text-white mr-4">Filter by Type:</label>
        <select
          value={propertyType}
          onChange={handlePropertyTypeChange}
          className="bg-gray-900 text-white px-3 py-2 rounded-md"
        >
          <option value="">All</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
        </select>
      </div>
      <div className="flex items-center mb-4 md:mb-0 ml-2">
        <label className="text-white mr-4">Rooms:</label>
        <select
          value={numberOfRooms}
          onChange={handleRoomsChange}
          className="bg-gray-900 text-white px-3 py-2 rounded-md"
        >
          <option value="">Any</option>
          <option value="1">1 Room</option>
          <option value="2">2 Rooms</option>
          <option value="3">3+ Rooms</option>
        </select>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <label className="text-white mr-4">Surface:</label>
        <select
          value={usefulSurface}
          onChange={handleSurfaceChange}
          className="bg-gray-900 text-white px-3 py-2 rounded-md"
        >
          <option value="">Any</option>
          <option value="50">Up to 50 sqm</option>
          <option value="100">50-100 sqm</option>
          <option value="150">100-150 sqm</option>
          <option value="200">150+ sqm</option>
        </select>
      </div>
      <div className="flex items-center mt-4 md:mb-0">
        <label className="text-white mr-4">Post Type:</label>
        <select
          value={postType}
          onChange={handlePostTypeChange}
          className="bg-gray-900 text-white px-3 py-2 rounded-md"
        >
          <option value="">All</option>
          <option value="FOR_SALE">For Sale</option>
          <option value="FOR_LOAN">For Loan</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;
