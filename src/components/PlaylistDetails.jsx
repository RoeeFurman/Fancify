import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../services/playlistService";
import { useDispatch, useSelector } from "react-redux";
import {
  setSong,
  setMiniPlaylist,
  togglePlay,
} from "../store/actions/audio-player.action";
import getAverageColor from "get-average-color";
import { BsClock } from "react-icons/bs";
import { SearchSection } from "./SearchSection";

export const PlaylistDetails = () => {
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currImgAvgColor, setCurrImgAvgColor] = useState();
  const [isMenuOpen, setisMenuOpen] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { song, isPlaying } = useSelector(
    (storeState) => storeState.audioPlayerModule
  );

  useEffect(() => {
    getPlaylistDetails();
  }, []);

  useEffect(() => {
    getAvgColor(currPlaylist?.imgUrl);
  }, [currPlaylist?.imgUrl]);

  const getAvgColor = async (url) => {
    const rgb = await getAverageColor(url);
    console.log(rgb);
    setCurrImgAvgColor(rgb);
  };

  const getPlaylistDetails = async () => {
    console.log(id);
    const playlist = await playlistService.getById(id);
    console.log(...playlist);
    dispatch(
      setMiniPlaylist(playlist[0]._id, 0, playlist[0].songs, playlist[0].name)
    );
    setCurrPlaylist(...playlist);
  };

  const setVideoId = async (song) => {
    console.log(isPlaying);
    dispatch(setSong(song));
  };

  const onRemoveSong = async (ev, id) => {
    ev.stopPropagation();
    const updatedPlaylist = await playlistService.removeSong(id, currPlaylist);
    setCurrPlaylist(updatedPlaylist);
    dispatch(
      setMiniPlaylist(
        updatedPlaylist._id,
        0,
        updatedPlaylist.songs,
        updatedPlaylist.name
      )
    );
  };

  const onLikeSong = async (ev, id) => {
    ev.stopPropagation();
    const updatedPlaylist = await playlistService.toggleLike(id, currPlaylist);
    setCurrPlaylist(updatedPlaylist);
    dispatch(
      setMiniPlaylist(
        updatedPlaylist._id,
        0,
        updatedPlaylist.songs,
        updatedPlaylist.name
      )
    );
  };

  const openSongMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };

  const onAddSong = async (song) => {
    const songToAdd = {
      id: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default.url,
      title: song.snippet.title,
      channelTitle: song.snippet.channelTitle,
      initIdx: currPlaylist.songs.length,
    };
    const updatedPlaylist = await playlistService.addSong(
      songToAdd,
      currPlaylist
    );
    dispatch(
      setMiniPlaylist(
        updatedPlaylist,
        0,
        updatedPlaylist.songs,
        updatedPlaylist.name
      )
    );
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
          {currPlaylist?.songs?.map((currSong) => (
            <li key={currSong.id}>
              <div
                className="song-preview"
                onClick={() => setVideoId(currSong)}
              >
                {song?.id === currSong?.id && isPlaying ? (
                  <div className="idx">
                    <img
                      width="12"
                      height="12"
                      alt=""
                      className=" playing-gif"
                      src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif"
                    />
                  </div>
                ) : (
                  <div className="idx">{currSong.initIdx + 1}</div>
                )}
                <div className="song-details">
                  <img src={currSong.imgUrl} className="song-img-preview" />
                  <h4>{currSong.title}</h4>
                </div>
                <div onClick={(ev) => onLikeSong(ev, currSong.id)}>
                  {currSong?.isLiked ? (
                    <svg
                      role="img"
                      onClick={(ev) => onLikeSong(ev, currSong.id)}
                      height="16"
                      width="16"
                      viewBox="0 0 16 16"
                      className="like-btn"
                      fill="#1ed760"
                    >
                      <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                    </svg>
                  ) : (
                    <svg
                      role="img"
                      onClick={(ev) => onLikeSong(ev, currSong.id)}
                      height="16"
                      width="16"
                      viewBox="0 0 16 16"
                      className="like-btn liked"
                      fill="#c2bfbe"
                    >
                      <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path>
                    </svg>
                  )}
                </div>
                <h4>{currSong?.duration?.display}</h4>
                {isMenuOpen && (
                  <button onClick={(ev) => onRemoveSong(ev, currSong.id)}>
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
          <div className="search-in-plst">
            <h2 className="search-in-plst-title">
              Let's find something for your playlist
            </h2>
            <SearchSection onAddSong={onAddSong} />
          </div>
        </ul>
      )}
    </section>
  );
};

// function mapStateToProps(state) {
//   return {
//     song: state.audioPlayerModule.song,
//     miniPlaylist: state.audioPlayerModule.miniPlaylist,
//     // currTimePass: state.audioPlayerModule.currTimePass,
//     // isShuffled: state.audioPlayerModule.isShuffled,
//     // user: state.userModule.user
//   };
// }
// const mapDispatchToProps = {
//   // setPlayer,
//   // togglePlay,
//   // changeSong,
//   setSong,
//   // setCurrTimePass,
//   // toggleShuffle,
//   // toggleLike,
// };

// export const PlaylistDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_PlaylistDetails);
