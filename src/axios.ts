import axios from 'axios'

//create baseURl request from TMDB
const instanceForTMDBRequest = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

//create baseURl request from TMDB
const instanceForYoutubeRequest = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
});


export {
    instanceForTMDBRequest,
    instanceForYoutubeRequest
};