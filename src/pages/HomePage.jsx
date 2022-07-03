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
      <h1>Welcome to Fancify</h1>
      <Link to="/screen/search">
        <img
          className="logo-img-hp"
          src="https://www.shareicon.net/data/512x512/2016/11/05/850979_music_512x512.png"
        />
        <div className="bottom-title">Click here to start, it's free</div>
      </Link>
    </div>
  );
};
