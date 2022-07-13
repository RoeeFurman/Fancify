import React, { useState, useRef } from "react";
import { SearchBar } from "../components/SearchBar";
import { youtubeService } from "../services/youtubeService";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSong, setMiniPlaylist } from "../store/actions/audio-player.action";

export const SearchSection = ({ onAddSong }) => {
  const [searchSongs, setSearchSongs] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  let timeOutId = useRef(null);

  const getResults = async (song) => {
    if (!song) return;
    if (timeOutId.current) clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(async () => {
      var searchSongs = await youtubeService.query(song);
      console.log(searchSongs);
      if (searchSongs.items.length > 4)
        setSearchSongs(searchSongs.items.slice(0, 4));
      else setSearchSongs(searchSongs.items);
      timeOutId.current = null;
    }, 700);
  };

  const setVideoId = (song) => {
    if (param.id) return;
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
    <>
      <SearchBar getResults={getResults} />
      {searchSongs && (
        <section className="search-section">
          <div className="results">
            {!param.id && (
              <div className="top-results">
                <h1 className="title">Top result</h1>
                <div className="top-result">
                  <img
                    src={searchSongs[0].snippet.thumbnails.default.url}
                    alt={searchSongs[0].snippet.title}
                  />
                  <h2 onClick={() => setVideoId(searchSongs[0])}>
                    {searchSongs[0].snippet.title}
                  </h2>
                  <h3>{searchSongs[0].snippet.channelTitle}</h3>
                </div>
              </div>
            )}
            <div className="more-results">
              <h1 className="title">Songs</h1>
              <ul>
                {searchSongs.map((song) => (
                  <li className="result" key={song.etag}>
                    <img
                      src={song.snippet.thumbnails.default.url}
                      alt={song.snippet.thumbnails.default.url}
                    />
                    <div className="result-titles">
                      <h2 onClick={() => setVideoId(song)}>
                        {song.snippet.title}
                      </h2>
                      <h3>{song.snippet.channelTitle}</h3>
                    </div>
                    {param.id && (
                      <button onClick={() => onAddSong(song)}>Add</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
