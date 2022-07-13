import React, { useState, useEffect } from "react";
import { playlistService } from "../services/playlistService";
import { PlaylistsList } from "./Playlistslist";
import { Link } from "react-router-dom";

export const Library = () => {
  useEffect(() => {
    loadTags();
  }, []);

  const [tags, setTags] = useState([]);

  const loadTags = async () => {
    const tags = await playlistService.getTags();
    const playlists = await playlistService.query();
    tags.forEach((tag) => {
      tag.playlists = [];
      playlists.map((playlist) => {
        if (playlist.tags.includes(tag.title)) tag.playlists.push(playlist);
        return;
      });
      return;
    });
    setTags(tags);
  };

  return (
    <div className="library">
      {tags && (
        <div>
          <ul>
            {tags.map((tag) => {
              return (
                <li key={tag.title}>
                  {tag.playlists?.length > 0 && (
                    <div className="playlist-title">
                      <div className="tag-title">{tag?.title}</div>
                      <Link to={`/screen/genre/${tag.title}`} key={tag.title}>
                        SEE MORE
                      </Link>
                    </div>
                  )}
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
