import React, { useState, useEffect } from "react";
import { firebaseService } from "../services/firebaseService";
import { PlaylistsList } from "./Playlistslist";
import { useParams } from "react-router-dom";

export const CreateNewPlaylist = () => {
  useEffect(() => {}, []);

  return (
    <div className="new-playlist">
      <div class="login-form">
        <h1>Creating a new Playlist is still in developement</h1>
        <h2>Meanwhile you can contact me:</h2>
        <div className="contacts">
          <a target="_blank" href="https://www.facebook.com/roee.furman/">
            <i class="fa fa-facebook"></i>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/roee-furman-16164711a/"
          >
            <i class="fa fa-linkedin"></i>
          </a>
          <a target="_blank" href="https://github.com/RoeeFurman">
            <i class="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
