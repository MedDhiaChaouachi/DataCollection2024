import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Uncategorized", "Technology", "Programming", "Business", "Marketing", 
  "Health", "Travel", "Food", "Fashion", "Sports", "Entertainment", 
  "Lifestyle", "Gaming", "Music", "Movies", "TV", "Books", "News", 
  "Politics", "Science", "Education", "Environment", "History", 
  "Art", "Design", "Photography", "Economics", "Finance", "Law", 
  "Religion", "Philosophy"
];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFocused) {
      setSuggestions([]);
    }
  }, [isFocused]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSuggestions(
      categories.filter((category) =>
        category.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    navigate("/");
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="p-2 border border-gray-300 rounded-l-md"
        placeholder="Search by category..."
        style={{ width: "300px", height: "42px" }}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onMouseDown={() => {
                setQuery(suggestion);
                setSuggestions([]);
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
        style={{ height: "42px" }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
