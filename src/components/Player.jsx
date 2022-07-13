import React from "react";
import { FaForward, FaBackward } from "react-icons/fa";
import ReactPlayer from "react-player/youtube";
import { connect } from "react-redux";
import { playlistService } from "../services/playlistService";

import {
  setSong,
  setMiniPlaylist,
  togglePlay,
} from "../store/actions/audio-player.action";

class _Player extends React.Component {
  state = {
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
    if (state.played > 0.995 && !this.state.isLooping) this.onForward();
    this.setState({ played: state.played });

    if (!this.state.progress) {
      this.setState({ progress: state });
    }
  };

  handleVolumeChange = (e) => {
    console.log(+e.target.value);
    if (!+e.target.value) {
      console.log("hi");
      this.setMute();
    } else {
      if (this.isMuted) this.setMute();
    }
    this.setState({ volume: +e.target.value });
  };

  setMute = () => {
    if (!this.state.isMuted) this.setState({ volume: 0 });
    else this.setState({ volume: 0.9 });
    this.setState({ isMuted: !this.state.isMuted });
  };

  handleSeekChange = (e) => {
    this.setState({ played: e.target.value });
    this.player.current.seekTo(e.target.value * this.state.duration);
  };

  setStop = () => {
    this.setState({ played: 0 });
    this.player.current.seekTo(0);
    this.props.togglePlay(false);
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

  toggleLooping = () => {
    this.setState({ isLooping: !this.state.isLooping });
  };

  setPlaying = () => {
    this.props.togglePlay(!this.props.isPlaying);
  };

  togglePlayByKey = (e) => {
    // e.stopPropagation();
    // if (e.key === " ") {
    //   this.setPlaying();
    // }
  };

  onLikeSong = async (ev, id) => {
    ev.stopPropagation();
    const updatedPlaylist = await playlistService.toggleLike(
      id,
      this.props.miniPlaylist
    );
    this.props.setMiniPlaylist(
      this.props.miniPlaylist,
      0,
      this.props.miniPlaylist.songs,
      this.props.miniPlaylist.name
    );
  };

  render() {
    const { state, props } = this;
    const { currSongIdx, songs } = props.miniPlaylist;
    const { song, isPlaying } = props;
    const { isLooping, isMuted, volume, played, duration } = state;
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
                {(song.isLiked && (
                  <svg
                    role="img"
                    onClick={(ev) => this.onLikeSong(ev, song.id)}
                    className="like-btn"
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    fill="#1ed760"
                  >
                    <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
                  </svg>
                )) || (
                  <svg
                    role="img"
                    onClick={(ev) => this.onLikeSong(ev, song.id)}
                    height="16"
                    width="16"
                    viewBox="0 0 16 16"
                    className="like-btn"
                    fill="#c2bfbe"
                  >
                    <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path>
                  </svg>
                )}
              </div>
            )}
            <div className="middle-player">
              <div className="actions">
                <ReactPlayer
                  ref={this.player}
                  className="screen"
                  url={"https://www.youtube.com/watch?v=" + song?.id}
                  playing={isPlaying}
                  // muted={isMuted}
                  volume={volume}
                  loop={isLooping}
                  onDuration={this.handleDuration}
                  onProgress={this.handleProgress}
                  height="1px"
                  width="1px"
                />
                <div className="left-btns">
                  <button
                    onClick={() => this.toggleLooping()}
                    className="main-btn"
                  >
                    {isLooping ? (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        viewBox="0 0 16 16"
                        fill="#1fdf64"
                      >
                        <path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path>
                      </svg>
                    ) : (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        viewBox="0 0 16 16"
                        fill="white"
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
                {!volume && (
                  <svg
                    role="presentation"
                    height="16"
                    width="16"
                    fill="white"
                    aria-label="Volume off"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    class="Svg-sc-1bi12j5-0 EQkJl"
                  >
                    <path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path>
                    <path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                  </svg>
                )}

                {volume > 0 && volume < 0.5 && (
                  <svg
                    role="presentation"
                    height="16"
                    width="16"
                    fill="white"
                    aria-label="Volume medium"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    class="Svg-sc-1bi12j5-0 EQkJl"
                  >
                    <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path>
                  </svg>
                )}
                {volume > 0.5 && (
                  <svg
                    role="presentation"
                    height="16"
                    width="16"
                    aria-label="Volume high"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    className="Svg-sc-1bi12j5-0 EQkJl"
                    fill="white"
                  >
                    <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path>
                    <path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path>
                  </svg>
                )}
              </button>
              <input
                className="volume-input"
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={this.handleVolumeChange}
              />
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
  };
}
const mapDispatchToProps = {
  setSong,
  setMiniPlaylist,
  togglePlay,
};

export const Player = connect(mapStateToProps, mapDispatchToProps)(_Player);
