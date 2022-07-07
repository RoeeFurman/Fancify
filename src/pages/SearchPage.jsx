import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { youtubeService } from "../services/youtubeService";
import { useDispatch } from "react-redux";
import { setSong, setMiniPlaylist } from "../store/actions/audio-player.action";
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
    const currSongMap = {
      id: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default.url,
      title: song.snippet.title,
      channelTitle: song.snippet.channelTitle,
    };
    dispatch(setSong(currSongMap));
    dispatch(setMiniPlaylist("Single song", 0, [currSongMap], "Single song"));
  };

  return (
    <section className="search-page">
      <SearchBar getResults={getResults} />
      {searchSongs && (
        <div className="results">
          <div className="top-results">
            <h1 className="title">Top result</h1>
            <div className="top-result">
              <img src={searchSongs[0].snippet.thumbnails.default.url} />
              <h2 onClick={() => setVideoId(searchSongs[0])}>
                {searchSongs[0].snippet.title}
              </h2>
              <h3>{searchSongs[0].snippet.channelTitle}</h3>
            </div>
          </div>
          <div>
            <h1 className="title">Songs</h1>
            <ul>
              {searchSongs.map((song) => (
                <li className="result" key={song.etag}>
                  <img src={song.snippet.thumbnails.default.url} />
                  <div className="result-titles">
                    <h2 onClick={() => setVideoId(song)}>
                      {song.snippet.title}
                    </h2>
                    <h3>{song.snippet.channelTitle}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
                {tag && (
                  <div>
                    <h2>{tag?.title}</h2>
                    <img className="tag-img" src={tag.imgUrl} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
