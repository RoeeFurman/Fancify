import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import ReactPlayer from "react-player/youtube";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="home-page">
      <h1>Fancify</h1>
      <Link to="/screen/search">Try Now</Link>
    </div>
  );
};
