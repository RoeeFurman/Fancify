import axios from "axios";

export const youtubeService = {
    query,
}

async function query(value) {
    console.log(value, 'service')
    console.log(process.env, 'kk')
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${process.env.REACT_APP_API_KEY}&q=${value}`)
    return res.data
}
