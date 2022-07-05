import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { playlistService } from "../services/playlistService";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";

export const PlaylistDetails = ({ match }) => {
  //   const history = useHistory();
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    getPlaylistDetails();
  }, []);

  const dispatch = useDispatch();

  const getPlaylistDetails = async () => {
    const playlist = await playlistService.getById(id);
    setCurrPlaylist(...playlist);
  };

  const setVideoId = (song) => {
    console.log(song);
    dispatch(setSong(song));
  };

  return (
    <section className="playlist-details">
      {/* <div>{JSON.stringify(currPlaylist)}</div> */}
      {currPlaylist && (
        <div className="playlist-header">
          <img src={currPlaylist.imgUrl} alt={currPlaylist.name} />
          <div className="titles">
            <h1>{currPlaylist.name}</h1>
            <h2>{currPlaylist.description}</h2>
          </div>
        </div>
      )}
      {currPlaylist && (
        <ul>
          {currPlaylist?.songs?.map((song) => (
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
      )}
    </section>
  );
};
