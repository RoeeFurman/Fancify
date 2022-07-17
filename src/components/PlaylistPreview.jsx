import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMiniPlaylist, setSong } from "../store/actions/audio-player.action";

export const PlaylistPreview = ({ playlist }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const openPlaylist = (ev, playlist, isPlaying = false) => {
    ev.stopPropagation();
    history.push(`/screen/library/${playlist.id}/`);
    if (isPlaying) {
      dispatch(setMiniPlaylist(playlist.id, 0, playlist.songs, playlist.name));
      dispatch(setSong(playlist.songs[0]));
    }
  };

  return (
    <section className="playlist-preview">
      {playlist && (
        <div className="playlist-card">
          <div
            className="card-img"
            onClick={(ev) => openPlaylist(ev, playlist)}
          >
            <img src={playlist.imgUrl} alt={playlist.name} />
            <div
              className="play-div"
              onClick={(ev) => openPlaylist(ev, playlist, true)}
            >
              <svg
                role="img"
                height="16"
                width="16"
                className="play-svg"
                viewBox="0 0 16 16"
              >
                <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
              </svg>
            </div>
          </div>
          <h3>{playlist.name}</h3>
          <h4>{playlist?.description}</h4>
        </div>
      )}
    </section>
  );
};
