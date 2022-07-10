import React, { useEffect, useState, useRef } from "react";

export const SearchBar = ({ getResults }) => {
  const [song, setSong] = useState("");
  const searchInput = useRef();

  useEffect(() => {
    // searchInput.current.focus();
  }, []);

  const searchByKeyboard = (key) => {
    if (key === "Enter") getResults(song);
  };

  return (
    <div className="search-bar">
      <span>
        <input
          name="text"
          value={song}
          onKeyUp={(e) => searchByKeyboard(e.key)}
          onChange={(e) => setSong(e.target.value)}
          placeholder="Artists, songs, or podcasts..."
          ref={searchInput}
        />
        <button className="search-btn" onClick={() => getResults(song)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </span>
    </div>
  );
};
