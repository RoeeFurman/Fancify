import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../services/playlistService";
import { useDispatch, connect } from "react-redux";
import { setSong, setMiniPlaylist } from "../store/actions/audio-player.action";
import getAverageColor from "get-average-color";
import { BsClock } from "react-icons/bs";
import { SearchSection } from "./SearchSection";

export const _PlaylistDetails = ({ props }) => {
  //   const history = useHistory();
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [currImgAvgColor, setCurrImgAvgColor] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getPlaylistDetails();
  }, props?.miniPlaylist?.songs);

  useEffect(() => {
    getAvgColor(currPlaylist?.imgUrl);
  }, currPlaylist?.imgUrl);

  const getAvgColor = async (url) => {
    const rgb = await getAverageColor(url);
    console.log(rgb);
    setCurrImgAvgColor(rgb);
  };

  const getPlaylistDetails = async () => {
    const playlist = await playlistService.getById(id);
    setCurrPlaylist(...playlist);
  };

  const setVideoId = (song) => {
    console.log(song);
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

  const onAddSong = async (song) => {
    console.log(song);
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
          {currPlaylist?.songs?.map((song) => (
            <li key={song.id}>
              <div className="song-preview" onClick={() => setVideoId(song)}>
                <div className="idx">{song.initIdx + 1}</div>
                <div className="song-details">
                  <img src={song.imgUrl} />
                  <h4>{song.title}</h4>
                </div>
                <h4>{song?.duration?.display}</h4>
                <div className="song-menu">
                  <button onClick={(ev) => onRemoveSong(ev, song.id)}>
                    Remove
                  </button>
                  <button onClick={(ev) => onLikeSong(ev, song.id)}>
                    {song?.isLiked ? "unLike" : "Like"}
                  </button>
                </div>
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

function mapStateToProps(state) {
  return {
    song: state.audioPlayerModule.song,
    miniPlaylist: state.audioPlayerModule.miniPlaylist,
    // currTimePass: state.audioPlayerModule.currTimePass,
    // isShuffled: state.audioPlayerModule.isShuffled,
    // user: state.userModule.user
  };
}
const mapDispatchToProps = {
  // setPlayer,
  // togglePlay,
  // changeSong,
  setSong,
  // setCurrTimePass,
  // toggleShuffle,
  // toggleLike,
};

export const PlaylistDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PlaylistDetails);
