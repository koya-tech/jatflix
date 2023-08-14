import { instanceForTMDBRequest, instanceForYoutubeRequest } from "../axios";
import { useEffect, useState } from "react";
import "./MovieRow.scss";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original";
const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const REACT_APP_YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

type Props = {
    title: string;
    fetchUrl: string;
    isLargeMovieRow?: boolean;
};

type Movie = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
    backdrop_path: string;
};

//trailerのoption
type Options = {
    height: string;
    width: string;
    playerVars: {
        autoplay: 0 | 1 | undefined;
    };
};

export const MovieRow = ({ title, fetchUrl, isLargeMovieRow }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    useEffect(() => {
        async function fetchMovieData() {
            const request = await instanceForTMDBRequest.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchMovieData();
    }, [fetchUrl]);

    const opts: Options = {
        height: "390",
        width: "640",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // console.log(movies);
    const handleClick = async (movie: Movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await instanceForYoutubeRequest.get(
                `search?part=snippet&q=${movie.name}&key=AIzaSyBrbQNT5O8AOsnuLD0mB3iIjXV5NyiBrdY`
            );

            setTrailerUrl(trailerurl.data.items[0]?.id.videoId);
        };
    };

    return (
        <div className="MovieRow">
            <h2>{title}</h2>
            <div className="MovieRow-posters">
                {/* ポスターコンテンツ */}
                {movies.map((movie, i) => (
                    <img
                        key={movie.id}
                        className={`MovieRow-poster ${isLargeMovieRow && "MovieRow-poster-large"}`}
                        src={`${base_url}${isLargeMovieRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};