import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { youtubeService } from "../services/youtubeService";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../store/actions/audio-player.action";

export const SearchPage = () => {
  const [searchSongs, setSearchSongs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const getResults = async (song) => {
    var searchSongs = await youtubeService.query(song);
    setSearchSongs(searchSongs.items);
    console.log(searchSongs.items);
  };

  const setVideoId = (song) => {
    console.log(song);
    dispatch(setSong(song));
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
    </section>
  );
};
