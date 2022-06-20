import axios from "axios";

export const youtubeService = {
    query,
}

async function query(value) {
    console.log(value, 'service')
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM&q=${value}`)
    return res.data
}
