import React, { useState, useEffect } from "react";
import { firebaseService } from "../services/firebaseServise";
import { PlaylistsList } from "./Playlistslist";
import { useParams } from "react-router-dom";

export const GenreList = () => {
  const params = useParams();

  useEffect(() => {
    loadPlaylists();
  }, []);

  const [playlists, setplaylists] = useState([]);

  const loadPlaylists = async () => {
    const playlists = await firebaseService.getDocuments();
    setplaylists(
      playlists.filter((playlist) => playlist.tags.includes(params.tag))
    );
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
