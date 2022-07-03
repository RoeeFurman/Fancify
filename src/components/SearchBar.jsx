import React, { useState } from "react";

export const SearchBar = ({ getResults }) => {
  const [song, setSong] = useState("");

  return (
    <div className="search-bar">
      <span>
        <input
          name="text"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          placeholder="Artists, songs, or podcasts"
        />
        <button className="search-btn" onClick={() => getResults(song)}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </span>
    </div>
  );
};
