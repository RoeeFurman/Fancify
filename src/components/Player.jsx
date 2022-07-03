import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

export const Player = ({ song }) => {
  const [isPlaying, setPlaying] = useState(true);
  const [isMuted, setMuted] = useState(false);
  const [isLooping, setLooping] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const player = useRef();

  const handleDuration = (currDuration) => {
    console.log("onDuration", currDuration);
    setDuration(currDuration);
  };

  const handleProgress = (state) => {
    console.log("onProgress", state);
    setPlayed(state.played);
    // We only want to update time slider if we are not currently seeking
    if (!progress) {
      setProgress(state);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleSeekChange = (e) => {
    console.log(e.target.value, "e");
    console.log(played);
    setPlayed(e.target.value);
    player.current.seekTo(e.target.value * duration);
  };

  const setStop = () => {
    setPlaying(false);
    setPlayed(0);
    player.current.seekTo(0);
  };

  const setMute = () => {
    console.log("Mute");
    if (!isMuted) setVolume(0);
    else setVolume(0.8);
    setMuted(!isMuted);
  };

  return (
    <div className="player">
      {console.log(song)}
      {song && (
        <div className="display-details">
          <img src={song?.snippet.thumbnails.default.url} />
          <div className="result-titles">
            <h4>{song?.snippet.title}</h4>
            <h3>{song?.snippet.channelTitle}</h3>
          </div>
        </div>
      )}
      {!song && (
        <div className="display-details">
          <img src="https://i.stack.imgur.com/zeJPU.png" />
          <div className="result-titles">
            <h4>Random song</h4>
            <h3>Random Artist</h3>
          </div>
        </div>
      )}
      <div className="middle-player">
        <div className="actions">
          <ReactPlayer
            ref={player}
            className="screen"
            url={"https://www.youtube.com/watch?v=" + song?.id.videoId}
            playing={isPlaying}
            muted={isMuted}
            volume={volume}
            loop={isLooping}
            onDuration={handleDuration}
            onProgress={handleProgress}
            onSeek={(e) => console.log("onSeek", e)}
            height="1px"
            width="1px"
          />
          <button onClick={() => setPlaying(!isPlaying)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={() => setLooping(!isLooping)}>
            {isLooping ? "unLoop" : "Loop"}
          </button>
          <button onClick={() => setMute()}>
            {isMuted ? "unMute" : "Mute"}
          </button>
          <button onClick={() => setStop()}>Stop</button>
        </div>
        <div className="duration">
          <h4>
            {Math.floor((played * duration) / 60).toFixed()}:{" "}
            {(((played * duration) % 60).toFixed() + "").padStart(2, "0")}
          </h4>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={handleSeekChange}
          />
          <h4>
            {Math.floor(duration / 60).toFixed()}:{" "}
            {((duration % 60) + "").padStart(2, "0")}
          </h4>
        </div>
      </div>
      <div className="right-player">
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
        />
        Volume
      </div>
    </div>
  );
};
