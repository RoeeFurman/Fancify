// import { playlistService } from "../../services/playlist.service";
// import { audioPlayerService } from "../../services/audio-player.service";

export function setSong(song) {
    return (dispatch) => {
        dispatch({
            type: 'SET_SONG',
            song
        })
    }
}

// export function setPlayer(player) {
//     return (dispatch) => {
//         dispatch({
//             type: 'SET_PLAYER',
//             player
//         })
//     }
// }


export function togglePlay(isPlaying) {
    console.log("togglePlay")
    return (dispatch) => {
        // const { player, isPlaying } = getState().audioPlayerModule
        // audioPlayerService.togglePlay(player, isPlaying)
        dispatch({
            type: 'TOGGLE_PLAY',
            isPlaying
        })
    }
}

// export function changeSong(song) {
//     return (dispatch) => {
//         dispatch({
//             type: 'CHANGE_SONG',
//             song
//         })
//     }
// }

export function setMiniPlaylist(playlistId, songIdx = 0, songs, playlistName = '') {
    console.log(playlistId, songIdx, songs, playlistName)
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
// export function setCurrTimePass(currTimePass) {
//     return (dispatch) => {
//         currTimePass = currTimePass.toFixed(0)
//         dispatch({
//             type: 'SET_TIME',
//             currTimePass
//         })
//     }
// }

// export function toggleShuffle() {
//     return async (dispatch, getState) => {
//         const { isShuffled, miniPlaylist } = getState().audioPlayerModule
//         let currSongIdx = 0
//         if (!isShuffled) audioPlayerService.shuffleSongs(miniPlaylist.songs, miniPlaylist.currSongIdx)
//         else {
//             currSongIdx = miniPlaylist.songs[miniPlaylist.currSongIdx].initIdx
//             audioPlayerService.unShuffleSongs(miniPlaylist.songs)
//         }
//         dispatch({
//             type: 'TOGGLE_SHUFFLE',
//             isShuffled: !isShuffled,
//             songs: miniPlaylist.songs,
//             currSongIdx
//         })
//     }
// }