

export function setSong(song) {
    return (dispatch) => {
        dispatch({
            type: 'SET_SONG',
            song
        })
    }
}

export function togglePlay(isPlaying) {
    return (dispatch) => {
        // const { player, isPlaying } = getState().audioPlayerModule
        // audioPlayerService.togglePlay(player, isPlaying)
        dispatch({
            type: 'TOGGLE_PLAY',
            isPlaying
        })
    }
}

export function setMiniPlaylist(playlistId, songIdx = 0, songs, playlistName = '') {
    return async (dispatch, getState) => {
        // const { isShuffled } = getState().audioPlayerModule
        const miniPlaylist = { currSongIdx: songIdx, playlistName: playlistName, playlistId }
        songs.forEach((song, idx) => { song.initIdx = idx })
        miniPlaylist.songs = songs
        // if (isShuffled) audioPlayerService.shuffleSongs(miniPlaylist.songs, miniPlaylist.currSongIdx)
        dispatch({
            type: 'SET_MINI_PLAYLIST',
            miniPlaylist
        })
    }
}
