import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../services/playlistService";
import { useDispatch, useSelector } from "react-redux";
import { setSong, setMiniPlaylist } from "../store/actions/audio-player.action";
import getAverageColor from "get-average-color";
import { BsClock } from "react-icons/bs";
import { SearchSection } from "./SearchSection";
import { firebaseService } from "../services/firebaseService";
import { onLogin } from "../store/actions/user.actions";

export const PlaylistDetails = () => {
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currImgAvgColor, setCurrImgAvgColor] = useState();
  const [isMenuOpen, setisMenuOpen] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { song, isPlaying } = useSelector(
    (storeState) => storeState.audioPlayerModule
  );
  const { user } = useSelector((storeState) => storeState.userModule);

  useEffect(() => {
    getPlaylistDetails();
  }, []);

  useEffect(() => {
    getAvgColor(currPlaylist?.imgUrl);
  }, [currPlaylist?.imgUrl]);

  const getAvgColor = async (url) => {
    const rgb = await getAverageColor(url);
    setCurrImgAvgColor(rgb);
  };

  const getPlaylistDetails = async () => {
    const playlist = await firebaseService.getDocument("playlists", id);
    setCurrPlaylist(playlist);
  };

  const setVideoId = async (newSong) => {
    if (newSong?.id === song?.id) return;
    dispatch(
      setMiniPlaylist(currPlaylist.id, 0, currPlaylist.songs, currPlaylist.name)
    );
    dispatch(setSong(newSong));
  };

  const onRemoveSong = async (ev, id) => {
    ev.stopPropagation();
    const idx = currPlaylist.songs.findIndex((currsong) => currsong.id === id);
    currPlaylist.songs.splice(idx, 1);

    const updatedPlaylist = await firebaseService.updatePlaylist(
      "playlists",
      currPlaylist.id,
      currPlaylist.songs
    );
    setCurrPlaylist({ ...currPlaylist, songs: currPlaylist.songs });
    dispatch(
      setMiniPlaylist(currPlaylist.id, 0, currPlaylist.songs, currPlaylist.name)
    );
  };

  const onLikeSong = async (ev, id) => {
    ev.stopPropagation();
    const updatedPlaylist = await playlistService.toggleLike(id, currPlaylist);
    setCurrPlaylist(updatedPlaylist);
    dispatch(
      setMiniPlaylist(
        updatedPlaylist.id,
        0,
        updatedPlaylist.songs,
        updatedPlaylist.name
      )
    );
  };

  const onAddSong = async (song) => {
    const songToAdd = {
      id: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default.url,
      title: song.snippet.title,
      channelTitle: song.snippet.channelTitle,
      initIdx: currPlaylist.songs.length,
    };

    currPlaylist.songs.push(songToAdd);
    const updatedPlaylist = await firebaseService.updatePlaylist(
      "playlists",
      currPlaylist.id,
      currPlaylist.songs
    );
    dispatch(
      setMiniPlaylist(updatedPlaylist, 0, currPlaylist.songs, currPlaylist.name)
    );
  };

  const toggleLiked = () => {
    if (user.likedPlaylists.includes(currPlaylist.id)) {
      const liked = user.likedPlaylists;
      const idx = liked.findIndex((plst) => plst.id === currPlaylist.id);
      liked.splice(idx, 1);
    } else {
      user.likedPlaylists.push(currPlaylist.id);
    }
    console.log(user);
    dispatch(onLogin(user));
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
      <div className="playlist-scnd-header">
        <div
          className="play-div"
          onClick={(ev) => setVideoId(currPlaylist.songs[0])}
        >
          <svg
            role="img"
            height="24"
            width="24"
            className="play-svg"
            viewBox="0 0 16 16"
          >
            <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
          </svg>
        </div>
        {user?.likedPlaylists?.includes(currPlaylist?.id) ? (
          <svg
            onClick={() => toggleLiked()}
            role="img"
            height="32"
            width="32"
            viewBox="0 0 24 24"
            fill="#1fdf64"
          >
            <path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path>
          </svg>
        ) : (
          <svg
            onClick={() => toggleLiked()}
            fill="#cbbbb9"
            role="img"
            height="32"
            width="32"
            viewBox="0 0 24 24"
          >
            <path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path>
          </svg>
        )}
        <svg
          fill="#cbbbb9"
          role="img"
          height="32"
          width="32"
          viewBox="0 0 24 24"
        >
          <path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
        </svg>
      </div>

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
                  <img
                    src={currSong.imgUrl}
                    className="song-img-preview"
                    alt={currSong.title}
                  />
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
