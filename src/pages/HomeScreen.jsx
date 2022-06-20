import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Player } from "../components/Player";
import { SearchPage } from "../pages/SearchPage";

export const HomeScreen = () => {
  const [currSongId, setCurrSongId] = useState(null);

  const setVideoId = (id) => {
    console.log(id);
    setCurrSongId(id);
  };

  return (
    <section className="home-screen">
      <div className="upper-screen">
        <nav>
          <h1>this is Nav</h1>
          <Link to="/screen/">Home</Link>
          <Link to="/screen/search">Search</Link>
        </nav>
        <div className="main-screen">
          <Route exact path="/"></Route>
          <Route path="/screen/search">
            <SearchPage setVideoId={setVideoId} />
          </Route>
        </div>
      </div>
      <Player songId={currSongId} />
    </section>
  );
};
