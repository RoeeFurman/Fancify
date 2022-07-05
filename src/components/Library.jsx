import React, { useState, useEffect } from "react";
import { playlistService } from "../services/playlistService";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";
import { PlaylistsList } from "./Playlistslist";

export const Library = () => {
  useEffect(() => {
    loadTags();
    // loadPlaylists();
  }, []);

  const dispatch = useDispatch();
  const [playlists, setPlaylists] = useState([]);
  const [tags, setTags] = useState([]);

  // const loadPlaylists = async () => {
  //   const playlist = await playlistService.query();
  //   setPlaylists(playlist);
  //   console.log(playlist);
  // };

  const loadTags = async () => {
    const tags = await playlistService.getTags();
    tags.forEach(async (tag) => {
      tag.playlists = await playlistService.query(tag.title);
    });
    console.log(tags);
    setTags(tags);
  };

  const setVideoId = (song) => {
    console.log(song);
    dispatch(setSong(song));
  };

  return (
    <div className="library">
      <h1>Library</h1>
      {tags && (
        <div>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag.title}>
                  {tag.playlists.length > 0 && <h2>{tag?.title}</h2>}
                  <PlaylistsList playlists={tag.playlists} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
