import React, { useState, useEffect } from "react";
import { playlistService } from "../services/playlistService";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";

export const Library = () => {
  useEffect(() => {
    loadPlaylists();
  }, []);

  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);

  const loadPlaylists = async () => {
    const playlist = await playlistService.query();
    setPlaylists(playlist);
    console.log(playlist);
  };

  const setVideoId = (song) => {
    console.log(song);
    dispatch(setSong(song));
  };

  return (
    <div className="library">
      <h1>Library</h1>
      {playlists && (
        <div>
          <h1>{playlists.name}</h1>
          <ul>
            {playlists?.songs?.map((song) => (
              <li key={song.id}>
                <div className="song-preview" onClick={() => setVideoId(song)}>
                  <div className="song-details">
                    <img src={song.imgUrl} />
                    <h4>{song.title}</h4>
                  </div>
                  <h4>{song.duration.display}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
