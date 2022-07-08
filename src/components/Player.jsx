import React, { startTransition, useRef, useState, useEffect } from "react";
import { FaForward, FaBackward, FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { connect } from "react-redux";

import {
  setPlayer,
  setSong,
  togglePlay,
  changeSong,
  setCurrTimePass,
  toggleShuffle,
} from "../store/actions/audio-player.action";

class _Player extends React.Component {
  state = {
    isPlaying: true,
    isMuted: false,
    isLooping: false,
    duration: null,
    progress: null,
    played: 0,
    volume: 0.9,
  };

  componentDidMount = () => {
    document.addEventListener("keypress", this.togglePlayByKey);
  };

  handleDuration = (duration) => {
    this.setState({ duration });
  };

  handleProgress = (state) => {
    if (state.played > 0.995) this.onForward();
    this.setState({ played: state.played });

    if (!this.state.progress) {
      this.setState({ progress: state });
    }
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: e.target.value });
  };

  handleSeekChange = (e) => {
    // console.log(e.target.value, "e");
    // console.log(this.state.played);
    this.setState({ played: e.target.value });
    this.player.current.seekTo(e.target.value * this.state.duration);
  };

  setStop = () => {
    this.setState({ isPlaying: false });
    this.setState({ played: 0 });
    this.player.current.seekTo(0);
  };

  onForward = () => {
    const idx = this.props.miniPlaylist?.songs.findIndex(
      (song) => song.id === this.props.song.id
    );
    if (idx === this.props.miniPlaylist?.songs.length - 1) {
      this.setStop();
      return;
    } else this.props.setSong(this.props.miniPlaylist?.songs[idx + 1]);
  };

  onBackward = () => {
    const idx = this.props.miniPlaylist?.songs.findIndex(
      (song) => song.id === this.props.song.id
    );
    if (idx === 0) {
      this.player.current.seekTo(0);
    } else this.props.setSong(this.props.miniPlaylist?.songs[idx - 1]);
  };

  setMute = () => {
    // console.log("Mute");
    if (!this.state.isMuted) this.setState({ volume: 0 });
    else this.setState({ volume: 0.9 });
    this.setState({ isMuted: !this.state.isMuted });
  };

  toggleLooping = () => {
    this.setState({ isLooping: !this.state.isLooping });
  };

  setPlaying = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
  };

  togglePlayByKey = (key) => {
    if (key.key === " ") {
      // key.preventDefault();
      this.setPlaying();
    }
  };

  render() {
    const { state, props } = this;
    const { currSongIdx, songs } = props.miniPlaylist;
    const song = props.song;
    const { isPlaying, isLooping, isMuted, volume, played, duration } = state;
    this.player = React.createRef();
    return (
      <>
        {song && (
          <div className="player">
            {song && (
              <div className="display-details">
                <img src={song?.imgUrl} />
                <div className="result-titles">
                  <h4>{song?.title || ""}</h4>
                  <h3>{song?.channelTitle || ""}</h3>
                </div>
              </div>
            )}
            <div className="middle-player">
              <div className="actions">
                <ReactPlayer
                  ref={this.player}
                  className="screen"
                  url={"https://www.youtube.com/watch?v=" + song?.id}
                  playing={isPlaying}
                  muted={isMuted}
                  volume={volume}
                  loop={isLooping}
                  onDuration={this.handleDuration}
                  onProgress={this.handleProgress}
                  // onSeek={(e) => console.log("onSeek", e)}
                  height="1px"
                  width="1px"
                />
                <div className="left-btns">
                  <button
                    onClick={() => this.toggleLooping()}
                    className="main-btn"
                  >
                    {isLooping ? (
                      <i className="fa-solid fa-xmark"></i>
                    ) : (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path>
                      </svg>
                    )}
                  </button>
                  <FaBackward
                    onClick={() => this.onBackward()}
                    className="main-btn"
                  />
                </div>
                <div className="play-btn">
                  <button className="play" onClick={() => this.setPlaying()}>
                    {isPlaying ? (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        className="pause-svg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
                      </svg>
                    ) : (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        className="play-svg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="right-btns">
                  <FaForward
                    onClick={() => this.onForward()}
                    className="main-btn"
                  />

                  <button onClick={() => this.setStop()} className="main-btn">
                    <i className="fa-solid fa-stop"></i>
                  </button>
                </div>
              </div>
              <div className="duration">
                <h4>
                  {Math.floor((played * duration) / 60).toFixed()}:{" "}
                  {(((played * duration) % 60).toFixed() + "").padStart(2, "0")}
                </h4>
                <input
                  type="range"
                  className="styled-slider slider-progress"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onChange={this.handleSeekChange}
                />
                <h4>
                  {Math.floor(duration / 60).toFixed()}:{" "}
                  {(Math.floor(duration % 60) + "").padStart(2, "0")}
                </h4>
              </div>
            </div>
            <div className="right-player">
              <button onClick={() => this.setMute()}>
                {isMuted ? (
                  <i className="fa-solid fa-volume-high"></i>
                ) : (
                  <i className="fa-solid fa-volume-xmark"></i>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={this.handleVolumeChange}
              />
              Volume
            </div>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    player: state.audioPlayerModule.player,
    song: state.audioPlayerModule.song,
    isPlaying: state.audioPlayerModule.isPlaying,
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

export const Player = connect(mapStateToProps, mapDispatchToProps)(_Player);

// const [isPlaying, setPlaying] = useState(true);
//   const [isMuted, setMuted] = useState(false);
//   const [isLooping, setLooping] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [played, setPlayed] = useState(0);
//   const [volume, setVolume] = useState(0.9);
//   const player = useRef();

//   const handleDuration = (currDuration) => {
//     console.log("onDuration", currDuration);
//     setDuration(currDuration);
//   };

//   const handleProgress = (state) => {
//     console.log("onProgress", state);
//     setPlayed(state.played);
//     // We only want to update time slider if we are not currently seeking
//     if (!progress) {
//       setProgress(state);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     setVolume(e.target.value);
//   };

//   const handleSeekChange = (e) => {
//     console.log(e.target.value, "e");
//     console.log(played);
//     setPlayed(e.target.value);
//     player.current.seekTo(e.target.value * duration);
//   };

//   const setStop = () => {
//     setPlaying(false);
//     setPlayed(0);
//     player.current.seekTo(0);
//   };

//   const setMute = () => {
//     console.log("Mute");
//     if (!isMuted) setVolume(0);
//     else setVolume(0.8);
//     setMuted(!isMuted);
//   };

//   render() (
//     <div className="player">
//       {console.log(this.props.song)}
//       {this.props.song && (
//         <div className="display-details">
//           <img src={this.props.song?.snippet..default.url} />
//           <div className="result-titles">
//             <h4>{this.props.song?.snippet.title}</h4>
//             <h3>{this.props.song?.snippet.channelTitle}</h3>
//           </div>
//         </div>
//       )}
//       {!this.props.song && (
//         <div className="display-details">
//           <img src="https://i.stack.imgur.com/zeJPU.png" />
//           <div className="result-titles">
//             <h4>Random song</h4>
//             <h3>Random Artist</h3>
//           </div>
//         </div>
//       )}
//       <div className="middle-player">
//         <div className="actions">
//           <ReactPlayer
//             ref={player}
//             className="screen"
//             url={
//               "https://www.youtube.com/watch?v=" + this.props.song?.id.videoId
//             }
//             playing={isPlaying}
//             muted={isMuted}
//             volume={volume}
//             loop={isLooping}
//             onDuration={handleDuration}
//             onProgress={handleProgress}
//             onSeek={(e) => console.log("onSeek", e)}
//             height="1px"
//             width="1px"
//           />
//           <button onClick={() => setLooping(!isLooping)}>
//             {isLooping ? (
//               <i className="fa-solid fa-xmark"></i>
//             ) : (
//               <svg role="img" height="16" width="16" viewBox="0 0 16 16">
//                 <path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path>
//               </svg>
//             )}
//           </button>
//           <button className="play" onClick={() => setPlaying(!isPlaying)}>
//             {isPlaying ? (
//               <svg
//                 role="img"
//                 height="16"
//                 width="16"
//                 className="pause-svg"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
//               </svg>
//             ) : (
//               <svg
//                 role="img"
//                 height="16"
//                 width="16"
//                 className="play-svg"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
//               </svg>
//             )}
//           </button>
//           <button onClick={() => setMute()}>
//             {isMuted ? (
//               <i className="fa-solid fa-volume-high"></i>
//             ) : (
//               <i className="fa-solid fa-volume-xmark"></i>
//             )}
//           </button>
//           <button onClick={() => setStop()}>
//             <i className="fa-solid fa-stop"></i>
//           </button>
//         </div>
//         <div className="duration">
//           <h4>
//             {Math.floor((played * duration) / 60).toFixed()}:{" "}
//             {(((played * duration) % 60).toFixed() + "").padStart(2, "0")}
//           </h4>
//           <input
//             type="range"
//             min={0}
//             max={0.999999}
//             step="any"
//             value={played}
//             onChange={handleSeekChange}
//           />
//           <h4>
//             {Math.floor(duration / 60).toFixed()}:{" "}
//             {(Math.floor(duration % 60) + "").padStart(2, "0")}
//           </h4>
//         </div>
//       </div>
//       <div className="right-player">
//         <input
//           type="range"
//           min={0}
//           max={1}
//           step="any"
//           value={volume}
//           onChange={handleVolumeChange}
//         />
//         Volume
//       </div>
//     </div>
//   );
// };
