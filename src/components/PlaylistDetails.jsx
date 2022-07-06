import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../services/playlistService";
import { useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";
import getAverageColor from "get-average-color";
// import { SearchPage } from "../pages/SearchPage";
import { BsClock } from "react-icons/bs";

export const PlaylistDetails = ({ match }) => {
  //   const history = useHistory();
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currImgAvgColor, setCurrImgAvgColor] = useState();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    getPlaylistDetails();
  }, []);

  useEffect(() => {
    getAvgColor(currPlaylist?.imgUrl);
  }, currPlaylist?.imgUrl);

  const getAvgColor = async (url) => {
    const rgb = await getAverageColor(url);
    console.log(rgb);
    setCurrImgAvgColor(rgb);
    // updateColor(`rgb(${rgb.r},${rgb.g}, ${rgb.b})`);
  };

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
      {currPlaylist && (
        <>
          <div
            className="playlist-header"
            style={{
              backgroundColor: `rgb(${currImgAvgColor?.r},${currImgAvgColor?.g},${currImgAvgColor?.b})`,
            }}
          >
            <img src={currPlaylist.imgUrl} alt={currPlaylist.name} />
            <div className="titles">
              <h1>{currPlaylist.name}</h1>
              <h2>{currPlaylist.description}</h2>
            </div>
          </div>
        </>
      )}
      {currPlaylist && (
        <ul>
          <div className="header">
            <div className="idx">#</div>
            <div className="song-details">TITLE</div>
            <div>
              <BsClock />
            </div>
          </div>
          {currPlaylist?.songs?.map((song) => (
            <li key={song.id}>
              <div className="song-preview" onClick={() => setVideoId(song)}>
                <div className="idx">{song.initIdx + 1}</div>
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
      {/* <SearchPage /> */}
    </section>
  );
};
