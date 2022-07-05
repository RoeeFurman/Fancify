import { Switch, useHistory } from "react-router-dom";
import { PlaylistDetails } from "./PlaylistDetails";
import { Route } from "react-router-dom";

export const PlaylistPreview = ({ playlist }) => {
  const history = useHistory();

  const openPlaylist = (id) => {
    console.log(id);
    history.push(`/screen/library/${id}/`);
  };

  return (
    <section className="playlist-preview">
      {playlist && (
        <div
          className="playlist-card"
          onClick={() => openPlaylist(playlist._id)}
        >
          <img src={playlist.imgUrl} />
          <h3>{playlist.name}</h3>
          <h4>{playlist?.description}</h4>
        </div>
      )}
    </section>
  );
};
