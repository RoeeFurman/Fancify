import axios from "axios";
import { syncStorageService } from "./storageService";

export const youtubeService = {
    query,
}

async function query(value) {
    const localSearch = syncStorageService.loadFromStorage(value)
    console.log('From Storage?', localSearch)
    if (!localSearch) {
        console.log('looking by API')
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${process.env.REACT_APP_API_KEY_YOUTUBE}&q=${value}`)
        syncStorageService.saveToStorage(value, res.data)
        return res.data
    } else return Promise.resolve(localSearch)
}
