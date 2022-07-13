import { PlaylistPreview } from "./PlaylistPreview";

export const PlaylistsList = ({ playlists }) => {
  return (
    <section className="playlist-list">
      {playlists?.length > 0 &&
        playlists.map((playlist) => {
          return <PlaylistPreview playlist={playlist} key={playlist.id} />;
        })}
    </section>
  );
};
