import React, { useState, useEffect } from "react";
import { firebaseService } from "../services/firebaseService";
import { PlaylistsList } from "./Playlistslist";
import { useDispatch, useSelector } from "react-redux";
import { playlistService } from "../services/playlistService";

export const Collection = () => {
  const { user } = useSelector((storeState) => storeState.userModule);

  useEffect(() => {
    console.log(user);
    getLikedPlaylists();
  }, [user]);

  const [data, setData] = useState([]);

  const getLikedPlaylists = async () => {
    const data = await Promise.all(
      user.likedPlaylists.map(async (plst) => {
        const hii = await playlistService.getById(plst);
        return hii;
      })
    );
    setData(data);
  };

  return (
    <div className="library">
      <PlaylistsList playlists={data} />
    </div>
  );
};
