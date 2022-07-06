import { Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMiniPlaylist } from "../store/actions/audio-player.action";

export const PlaylistPreview = ({ playlist }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const openPlaylist = (playlist) => {
    history.push(`/screen/library/${playlist._id}/`);
    dispatch(setMiniPlaylist(playlist._id, 0, playlist.songs, playlist.name));
  };

  return (
    <section className="playlist-preview">
      {playlist && (
        <div className="playlist-card" onClick={() => openPlaylist(playlist)}>
          <img src={playlist.imgUrl} />
          <h3>{playlist.name}</h3>
          <h4>{playlist?.description}</h4>
        </div>
      )}
    </section>
  );
};
