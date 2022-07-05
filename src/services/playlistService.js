import { PLAYLIST_DATA } from '../data/demo-data'
// const STORAGE_KEY = 'playlistDB'

export const playlistService = {
    query,
    getById,
    // save,
    // makeDummy,
    // addSong,
    // removeSong,
    getTags,
    // removePlaylist,
    // onWatchPlaylist,
}

// window.ps = playlistService

function query(filterBy = null) {
    // console.log('query by', filterBy)
    const playlists = PLAYLIST_DATA.filter(playlist => playlist.tags.includes(filterBy))
    return Promise.resolve(playlists)
    // return httpService.get(`playlist/?tags=${filterBy.tags}`)
}

async function getById(playlistId, filterBy) {
    console.log(playlistId)
    return Promise.resolve(PLAYLIST_DATA.filter(playlist => playlist._id === playlistId))
    // return await storageService.get(STORAGE_KEY, playlistId, filterBy)
    // return httpService.get(`playlist/${playlistId}`)
}


// async function save(playlist, user) {
//     if (playlist._id) return await httpService.put(`playlist/${playlist._id}`, playlist)
//     playlist = { ...playlist, tags: ['New Releases'], createdBy: { _id: user._id || '', fullname: user.fullname }, songs: playlist.songs || [] } //when swapping to frontend only, add "createdAt: Date.now()"
//     return await httpService.post(`playlist/`, playlist)
// }

// async function addSong(song, playlist, user) {
//     if (!playlist.songs.some((currsong) => currsong.id === song.id)) {
//         playlist.songs.push({ ...song, addedAt: Date.now(), addedBy: { fullname: user.fullname, _id: user._id || '' } })
//         return await httpService.put(`playlist/${playlist._id}`, playlist)
//     }
//     return playlist
// }

// async function removeSong(song, playlist) {
//     const idx = playlist.songs.findIndex(currsong => currsong.id === song.id)
//     playlist.songs.splice(idx, 1)
//     return await httpService.put(`playlist/${playlist._id}`, playlist)
// }

// async function removePlaylist(playlistId) {
//     return httpService.delete(`playlist/${playlistId}`)
// }

// function onWatchPlaylist(playlistId, userId) {
//     socketService.watchPlaylist(playlistId, userId)
// }


async function getTags() {
    return [
        { title: 'New Releases', color: '#1bd57f', imgUrl: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112' },
        { title: 'Rock', color: '#80433b', imgUrl: 'https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730' },
        { title: 'Israeli', color: '#779dc3', imgUrl: 'https://mosaic.scdn.co/300/ab67616d00001e0201f29cb95808086322951517ab67616d00001e023dcb38a80ce06d4f188d9868ab67616d00001e0243e92a45bb479211b796bf82ab67616d00001e02508b835b5dd68662ec44646a' },
        { title: 'Jazz', color: '#8d67ab', imgUrl: 'https://i.scdn.co/image/ab67706f00000002d72ef75e14ca6f60ea2364c2' },
        { title: 'Decades', color: '#e8115b', imgUrl: 'https://t.scdn.co/images/b611cf5145764c64b80e91ccd5f357c8' },
        { title: 'Musical', color: '#eec1c9', imgUrl: 'https://mosaic.scdn.co/300/ab67616d00001e02170e79548d280867ef12742bab67616d00001e027546d458746cb21b825055ecab67616d00001e02d72fb5571087bca0a2fed008ab67616d00001e02ddc54feece71dda4290d0579' },
        { title: 'Pop', color: '#8d67ab', imgUrl: 'https://t.scdn.co/images/0a74d96e091a495bb09c0d83210910c3' },
        { title: 'Chill', color: '#477d95', imgUrl: 'https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e' },
        { title: 'Indie', color: '#608108', imgUrl: 'https://i.scdn.co/image/ab67706f000000025f7327d3fdc71af27917adba' },
        { title: 'Workout', color: '#777777', imgUrl: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15' },
        { title: 'Alternative', color: '#b49bc8', imgUrl: 'https://t.scdn.co/images/ee9451b3ed474c82b1da8f9b5eafc88f.jpeg' },
        { title: 'Soul', color: '#d7f27d', imgUrl: 'https://t.scdn.co/media/derived/soul-274x274_266bc900b35dda8956380cffc73a4d8c_0_0_274_274.jpg' },
        { title: 'R&B', color: '#dc148c', imgUrl: 'https://i.scdn.co/image/ab67706f000000023c5a4aaf5df054a9beeb3d82' },
        { title: 'Summer', color: '#ffc864', imgUrl: 'https://t.scdn.co/images/a2a24668f16c4e9680233a0d7d244a4b.jpeg' },
        { title: 'Punk', color: '#1e3264', imgUrl: 'https://i.scdn.co/image/ab67706f0000000275251d7d488b0fd69e4c50bd' },
        { title: 'travel', color: '#148a08', imgUrl: 'https://t.scdn.co/images/44cf5615d3244f289fcedefa96b85db9' },
        { title: 'Country', color: '#e13300', imgUrl: 'https://i.scdn.co/image/ab67706f00000002a980b152e708b33c6516d848' },
        { title: 'Metal', color: '#777777', imgUrl: 'https://i.scdn.co/image/ab67706f0000000285704160b49125ac95099ec8' },
    ]
}



// function makeDummy() {
//     storageService.saveDummy()
// }


