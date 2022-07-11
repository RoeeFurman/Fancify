import React, { useState } from "react";

export const SearchBar = ({ getResults }) => {
  const [song, setSong] = useState("");

  const searchByKeyboard = (key) => {
    if (key === "Enter") getResults(song);
  };

  const handleChange = (value) => {
    setSong(value);
    getResults(value);
  };

  return (
    <div className="search-bar">
      <span>
        <input
          name="text"
          value={song}
          onKeyUp={(e) => searchByKeyboard(e.key)}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Artists, songs, or podcasts..."
        />
        <button className="search-btn" onClick={() => getResults(song)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </span>
    </div>
  );
};
