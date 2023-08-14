import { useEffect, useState } from "react";
import { instanceForTMDBRequest, instanceForYoutubeRequest } from "../axios";
import { requests } from "../request";
import "./Banner.scss";

type bannerMovieProps = {
    title?: string;
    name?: string;
    orignal_name?: string;
    backdrop_path?: string;
    overview?: string;
}

export const Banner = () => {
    const [movie, setMovie] = useState<bannerMovieProps>({});

    useEffect(() => {
        async function fetchData() {
            const request = await instanceForTMDBRequest.get(requests.feachNetflixOriginals);

            // set random Movie 
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    function truncateOverflowedDescription(str: any, n: number) {
        if (str !== undefined) {
            return str.length > n ? str?.substr(0, n - 1) + "..." : str;
        };
    };

    return (
        <header
            className="Banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
        >
            <div className="Banner-contents">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.orignal_name}
                </h1>
                {/* <div className="Banner-buttons">
                    <button className="Banner-button">Play</button>
                    <button className="Banner-button">My List</button>
                </div> */}

                <h1 className="Banner-description">{truncateOverflowedDescription(movie?.overview, 150)}</h1>
            </div>

            <div className="Banner-fadeBottom" />
        </header>
    );
}