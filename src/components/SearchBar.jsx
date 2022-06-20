import React, { useState } from "react";

export const SearchBar = ({ getResults }) => {
  const [song, setSong] = useState("");

  return (
    <div className="search-bar">
      <span>
        Search
        <input
          name="text"
          value={song}
          onChange={(e) => setSong(e.target.value)}
        />
        <button onClick={() => getResults(song)}>Search</button>
      </span>
    </div>
  );
};
