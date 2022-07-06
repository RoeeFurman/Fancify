

const initialState = {
    // player: null,
    isPlaying: false,
    song: null,
    // isShuffled: false,
    miniPlaylist: {
        songs: [],
        idxArr: [],
        currSongIdx: 0,
        playlistName: '',
        playlistId: '',
    },
    // currTimePass: 0,
}



export function audioPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SONG':
            console.log(action.song)
            return { ...state, song: action.song }
        // case 'SET_PLAYER':
        //     return { ...state, player: action.player }
        // case 'TOGGLE_PLAY':
        //     return { ...state, isPlaying: action.isPlaying }
        case 'SET_MINI_PLAYLIST':
            return { ...state, miniPlaylist: action.miniPlaylist }
        case 'CHANGE_SONG':
            return { ...state, miniPlaylist: { ...state.miniPlaylist, currSongIdx: action.currSongIdx } }
        // case 'SET_TIME':
        //     return { ...state, currTimePass: action.currTimePass }
        // case 'TOGGLE_SHUFFLE':
        //     return { ...state, isShuffled: action.isShuffled, miniPlaylist: { ...state.miniPlaylist, songs: action.songs, currSongIdx: action.currSongIdx } }
        default:
            return state
    }
}
