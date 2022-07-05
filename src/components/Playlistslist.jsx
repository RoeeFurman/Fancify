import { PlaylistPreview } from "./PlaylistPreview";
import { PlaylistDetails } from "./PlaylistDetails";
import { Route } from "react-router-dom";

export const PlaylistsList = ({ playlists }) => {
  return (
    <section className="playlist-list">
      {playlists.length > 0 &&
        playlists.map((playlist) => {
          return <PlaylistPreview playlist={playlist} key={playlist._id} />;
        })}
    </section>
  );
};
