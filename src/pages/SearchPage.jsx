import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { youtubeService } from "../services/youtubeService";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";
import { playlistService } from "../services/playlistService";

export const SearchPage = () => {
  const [searchSongs, setSearchSongs] = useState(null);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadTags();
  }, []);

  const getResults = async (song) => {
    var searchSongs = await youtubeService.query(song);
    setSearchSongs(searchSongs.items);
    console.log(searchSongs.items);
  };

  const loadTags = async () => {
    const tags = await playlistService.getTags();
    tags.forEach(async (tag) => {
      tag.playlists = await playlistService.query(tag.title);
    });
    setTags(tags);
  };

  const setVideoId = (song) => {
    console.log(song);
    const currSongMap = {
      id: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default.url,
      title: song.snippet.title,
      channelTitle: song.snippet.channelTitle,
    };
    dispatch(setSong(currSongMap));
  };

  return (
    <section className="search-page">
      <SearchBar getResults={getResults} />
      {searchSongs && (
        <div>
          <h1 className="title">Songs</h1>
          <ul>
            {searchSongs.map((song) => (
              <li className="result" key={song.etag}>
                <img src={song.snippet.thumbnails.default.url} />
                <div className="result-titles">
                  <h2 onClick={() => setVideoId(song)}>{song.snippet.title}</h2>
                  <h3>{song.snippet.channelTitle}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {tags && (
        <div className="tags-list">
          {tags.map((tag) => {
            return (
              <div
                key={tag.title}
                style={{ backgroundColor: tag.color }}
                className="tag-preview"
              >
                {tag && <h2>{tag?.title}</h2>}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
