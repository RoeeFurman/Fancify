import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { Player } from "../components/Player";
import { Library } from "../components/Library";
import { SearchPage } from "../pages/SearchPage";
import { PlaylistDetails } from "../components/PlaylistDetails";
import { MdHomeFilled } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { BsFillPlusSquareFill } from "react-icons/bs";

export const HomeScreen = () => {
  const [currSong, setCurrSongId] = useState(null);

  const setVideoId = (id) => {
    console.log(id, "currsongid");
    setCurrSongId(id);
  };

  return (
    <section className="home-screen">
      <div className="upper-screen">
        <nav>
          <div to="/">
            <div className="logo">
              <img
                className="logo-img"
                src="https://www.shareicon.net/data/512x512/2016/11/05/850979_music_512x512.png"
              />
              <h1>Fancify</h1>
            </div>
          </div>
          <Link to="/screen/">
            <MdHomeFilled />
            Library
          </Link>
          <Link to="/screen/search">
            <RiSearchLine />
            Search
          </Link>
        </nav>
        <div className="main-screen">
          <Route exact path="/screen/">
            <Library />
          </Route>
          <Route path="/screen/search">
            <SearchPage />
          </Route>
          <Route path="/screen/library/:id">
            <PlaylistDetails />
          </Route>
        </div>
      </div>
      <Player />
    </section>
  );
};
