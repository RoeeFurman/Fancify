import React, { useState, useEffect } from "react";
import { playlistService } from "../services/playlistService";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";
import { PlaylistsList } from "./Playlistslist";
import { useParams } from "react-router-dom";

export const GenreList = () => {
  const params = useParams();

  useEffect(() => {
    loadPlaylists();
  }, []);

  // const dispatch = useDispatch();

  const [playlists, setplaylists] = useState([]);

  const loadPlaylists = async () => {
    const playlists = await playlistService.query(params.tag);
    console.log(playlists);
    setplaylists(playlists);
  };

  // const setVideoId = (song) => {
  //   console.log(song);
  //   dispatch(setSong(song));
  // };

  return (
    <div className="library">
      <div className="playlist-by-genre">{params.tag}</div>
      {playlists && (
        <div>
          <PlaylistsList playlists={playlists} />
        </div>
      )}
    </div>
  );
};
