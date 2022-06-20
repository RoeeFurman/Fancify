import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import ReactPlayer from "react-player/youtube";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {}, []);

  return (
    <div>
      <SearchBar></SearchBar>
    </div>
  );
};
