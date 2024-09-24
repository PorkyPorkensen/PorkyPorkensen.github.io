import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWatchlist } from "../utilities";
import nfImg from "../images/nf.png"

export default function Watchlist() {
    const [movieData, setMovieData] = useState([]);
    let watchlist = getWatchlist()

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const movieDetailsPromises = watchlist.map(imdbID => {
                const movieUrl = `https://omdbapi.com/?i=${imdbID}&apikey=e9854519`;
                return fetch(movieUrl).then(res => res.json());
            });

            const movies = await Promise.all(movieDetailsPromises);
            setMovieData(movies); 
        };

        fetchMovieDetails();

    }, []); 

    function remMovie(imdbID) {
        watchlist = watchlist.filter(id => id !== imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        location.reload(); 
    }

    const movElements = movieData.map(mov => (
        <article className="movDiv" key={mov.imdbID}>
            <figure>
                <img 
                    src={mov.Poster === 'N/A' ? nfImg : mov.Poster} 
                    alt={mov.Poster === 'N/A' ? "Poster not available" : `${mov.Title} Poster`} 
                />
                <figcaption>{mov.Title}</figcaption>
            </figure>
            <div className="movInfo">
                <h2>{mov.Title}</h2>
                <div className="RDDiv">
                    <p><strong>Released:</strong> {mov.Released}</p>
                    <p><strong>Director:</strong> {mov.Director}</p>
                </div>
                <p>{mov.Plot}</p>
                <a 
                    href={`https://imdb.com/title/${mov.imdbID}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={`View ${mov.Title} on IMDB`}
                >
                    <p><strong>Rating:</strong> {mov.imdbRating}</p>
                </a>
                <button 
                    className="randBtn red" 
                    onClick={() => remMovie(mov.imdbID)} 
                    aria-label={`Remove ${mov.Title} from Watchlist`}
                >
                    <i className="fa-solid fa-circle-xmark" aria-hidden="true"></i> 
                    <span>Remove from Watchlist</span>
                </button>
            </div>
        </article>
    ));
    
    return <section className="resDiv">{movElements}</section>;
}