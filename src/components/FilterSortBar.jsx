import React, { useState } from "react";

const FilterSortBar = ({ onSortChange, onFilterChange }) => {
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [rooms, setRooms] = useState("");
  const [surface, setSurface] = useState("");
  const [postType, setPostType] = useState("");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    onSortChange(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  const handleRoomsChange = (e) => {
    const value = e.target.value;
    setRooms(value);
    // onRoomsChange(value); // Uncomment and implement this function to handle rooms filter change
  };

  const handleSurfaceChange = (e) => {
    const value = e.target.value;
    setSurface(value);
    // onSurfaceChange(value); // Uncomment and implement this function to handle surface filter change
  };

  const handlePostTypeChange = (e) => {
    const value = e.target.value;
    setPostType(value);
    // onPostTypeChange(value); // Uncomment and implement this function to handle post type filter change
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
          <option value="year-asc">Construction Year (Oldest to Newest)</option>
          <option value="year-desc">
            Construction Year (Newest to Oldest)
          </option>
        </select>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <label className="text-white mr-4">Filter by Type:</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="bg-gray-900 text-white px-3 py-2 rounded-md"
        >
          <option value="">All</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
        </select>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <label className="text-white mr-4">Rooms:</label>
        <select
          value={rooms}
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
          value={surface}
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
