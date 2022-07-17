import React, { useState, useEffect } from "react";
import { firebaseService } from "../services/firebaseService";
import { PlaylistsList } from "./Playlistslist";
import { useDispatch, useSelector } from "react-redux";

export const Collection = () => {
  const { user } = useSelector((storeState) => storeState.userModule);

  useEffect(() => {
    console.log(user);
  }, []);

  const [playlists, setplaylists] = useState([]);

  return <div className="genre-list">{JSON.stringify(user)}</div>;
};
