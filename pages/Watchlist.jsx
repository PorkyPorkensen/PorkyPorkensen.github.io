import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWatchlist } from "../utilities";


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
        <div className="movDiv" key={mov.imdbID}>
            <img src={mov.Poster === 'N/A' ? '../images/nf.png' : mov.Poster}  alt={`${mov.Title} Poster`} />
            <div className="movInfo">
                <h1>{mov.Title}</h1>
                <br />
                <span className="RDDiv">
                    <p><strong>Released:</strong> {mov.Released}</p>
                    <p><strong>Director:</strong> {mov.Director}</p>
                </span>
                <p>{mov.Plot}</p>
                <br />
                <a href={`https://imdb.com/title/${mov.imdbID}`}>
                    <p><strong>Rating:</strong> {mov.imdbRating}</p>
                </a>
                <button className="remBtn" onClick={() => remMovie(mov.imdbID)}>-</button>
            </div>
        </div>
    ));

    return <div className="resDiv">{movElements}</div>;
}