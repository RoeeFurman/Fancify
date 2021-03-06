import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { Player } from "../components/Player";
import { Library } from "../components/Library";
import { Collection } from "../components/Collection";
import { GenreList } from "../components/GenreList";
import { SearchPage } from "../pages/SearchPage";
import { CreateNewPlaylist } from "../components/CreateNewPlaylist";
import { PlaylistDetails } from "../components/PlaylistDetails";
import { MdHomeFilled } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { Login } from "../components/Login";
import { useEffect } from "react";
import { onLogin } from "../store/actions/user.actions";
import { userService } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";

export const HomeScreen = () => {
  const [isMenueOpen, setMenuOpen] = useState(false);
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const [loggedUser, setUser] = useState("");
  const { user } = useSelector((storeState) => storeState.userModule);

  const dispatch = useDispatch();

  useEffect(() => {
    getLoggedUser();
  }, []);

  const getLoggedUser = async () => {
    const user = await userService.getUser();
    dispatch(onLogin(user));
    setUser(user);
    console.log(user);
  };

  return (
    <section className="home-screen">
      <nav>
        <div to="/">
          <div className="logo">
            <img
              className="logo-img"
              alt="logo"
              src="https://www.shareicon.net/data/512x512/2016/11/05/850979_music_512x512.png"
            />
            <h1>Fancify</h1>
          </div>
        </div>
        <Link to="/screen/">
          <MdHomeFilled className="icon" />
          Home
        </Link>
        <Link to="/screen/search">
          <RiSearchLine className="icon" />
          Search
        </Link>
        <Link to="/screen/collection">
          <svg
            className="library-logo"
            role="img"
            height="24"
            width="24"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"></path>
          </svg>
          Your Library
        </Link>
        <Link to="/screen/createnewplaylist" className="create-playlist-div">
          <div className="btn-container">
            <svg
              role="img"
              height="12"
              width="12"
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="new-playlist-btn"
            >
              <path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path>
            </svg>
          </div>
          Create Playlist
        </Link>
      </nav>
      <button
        className="little-menu-btn"
        onClick={() => setMenuOpen(!isMenueOpen)}
      >
        <img
          src="https://icon-library.com/images/svg-menu-icon/svg-menu-icon-3.jpg"
          alt="Hamburger-menu icons | Noun Project"
          id="cpimg"
          className="menu-brgr"
        />
        {isMenueOpen && (
          <div className="litle-nav">
            <Link to="/screen/">
              <MdHomeFilled className="icon" />
              Home
            </Link>
            <Link to="/screen/search">
              <RiSearchLine className="icon" />
              Search
            </Link>
          </div>
        )}
      </button>
      <div className="main-screen">
        <header>
          <div className="login">
            {user && (
              <>
                <img
                  className="profile-pic"
                  src={user.imgUrl}
                  alt="Profile pic"
                />
                <span>{user.username}</span>
                {/* <button onClick={() => setLoginMenuOpen(!isLoginMenuOpen)}> */}
                <button>
                  {isLoginMenuOpen ? (
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      viewBox="0 0 16 16"
                      fill="white"
                    >
                      <path d="M14 6l-6 6-6-6h12z"></path>
                    </svg>
                  ) : (
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 10L8 4l-6 6h12z"></path>
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>
        </header>

        <Route exact path="/screen/">
          <Library />
        </Route>
        <Route path="/screen/search">
          <SearchPage />
        </Route>
        <Route path="/screen/library/:id">
          <PlaylistDetails />
        </Route>
        <Route path="/screen/genre/:tag">
          <GenreList />
        </Route>
        <Route path="/screen/collection">
          <Collection />
        </Route>
        <Route path="/screen/createnewplaylist">
          <CreateNewPlaylist />
        </Route>
        <div id="product-component-1658216423685"></div>
      </div>
      {isLoginMenuOpen && <Login />}

      <Player />
    </section>
  );
};
