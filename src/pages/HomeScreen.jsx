import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { Player } from "../components/Player";
import { Library } from "../components/Library";
import { GenreList } from "../components/GenreList";
import { SearchPage } from "../pages/SearchPage";
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
                <button onClick={() => setLoginMenuOpen(!isLoginMenuOpen)}>
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
      </div>
      {isLoginMenuOpen && <Login />}

      <Player />
    </section>
  );
};
