import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";

export const Player = ({ songId }) => {
  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleDuration = (currDuration) => {
    console.log("onDuration", currDuration);
    setDuration(currDuration);
  };

  return (
    <div className="player">
      <ReactPlayer
        className="screen"
        url={"https://www.youtube.com/watch?v=" + songId}
        playing={isPlaying}
        muted={isMuted}
        onDuration={handleDuration}
        height="10px"
        width="10px"
      />
      {duration}
      <button onClick={() => setPlaying(!isPlaying)}>Play</button>
      <button onClick={() => setMuted(!isMuted)}>Mute</button>
    </div>
  );
};
