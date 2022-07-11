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

  const [playlists, setplaylists] = useState([]);

  const loadPlaylists = async () => {
    const playlists = await playlistService.query(params.tag);
    setplaylists(playlists);
  };

  return (
    <div className="genre-list">
      <div className="playlist-by-genre">{params.tag}</div>
      {playlists && (
        <div className="grid">
          <PlaylistsList playlists={playlists} />
        </div>
      )}
    </div>
  );
};