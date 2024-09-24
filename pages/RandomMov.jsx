import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getWatchlist } from "../utilities";
import imdbImg from "../images/IIMDB.png"
import nfImg from "../images/nf.png"
export default function RandomMov() {
const [rMov, setRMov] = useState([]);
let watchlist = getWatchlist()


    useEffect(() => {
        const randomNum = Math.floor(Math.random() * (777777 - 111161 + 1)) + 111161;
        fetch(`https://omdbapi.com/?i=tt0${randomNum}&apikey=e9854519`)
            .then(res => res.json())
            .then(data => setRMov(data));
    }, []);
    
    function storeMovie(imdbID) {
        if (!watchlist.includes(imdbID)) {
            watchlist.push(imdbID);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            alert('Movie saved to Watchlist');
        } else {
            alert('Movie already in watchlist!');
        }
    }
    return (
        <section className="randScreen">
            <header>
                <h1>Your Random Movie/Episode is...</h1>
            </header>
    
            <article className="randTitleCard">
                <h2>{rMov.Title}</h2>
    
                <figure>
                    <img 
                        src={rMov.Poster === 'N/A' ? nfImg : rMov.Poster} 
                        alt={rMov.Poster === 'N/A' ? "Poster not available" : `${rMov.Title} Poster`} 
                    />
                </figure>
    
                <div className="movieDetails">
                    <div className="RDDiv">
                        <p><strong>Runtime:</strong> {rMov.Runtime}</p>
                        <p><strong>Country:</strong> {rMov.Country}</p>
                        <p><strong>Released:</strong> {rMov.Released}</p>
                    </div>
    
                    <div className="RDDiv">
                        <p><strong>Written By:</strong> {rMov.Writer}</p>
                        <p><strong>Director:</strong> {rMov.Director}</p>
                    </div>
    
                    <p>{rMov.Plot === 'N/A' ? 'Plot not available' : rMov.Plot}</p>
                    <p><strong>Rating:</strong> {rMov.imdbRating}</p>
                </div>
    
                <div className="randBtns">
                    <button 
                        className="randBtn" 
                        onClick={() => storeMovie(rMov.imdbID)}
                        aria-label={`Add ${rMov.Title} to Watchlist`}
                    >
                        <i className="fa-solid fa-star" aria-hidden="true"></i> 
                        <span>Add to Watchlist</span>
                    </button>
    
                    <button 
                        className="randBtn red" 
                        onClick={() => location.reload()}
                        aria-label="Skip this movie and get another random one"
                    >
                        <i className="fa-solid fa-rotate-right" aria-hidden="true"></i> 
                        <span>Not for me</span>
                    </button>
                </div>
    
                <a 
                    href={`https://www.imdb.com/title/${rMov.imdbID}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View ${rMov.Title} on IMDB`}
                >
                    <img className="imdbLogo" src={imdbImg} alt="IMDB Logo" />
                </a>
            </article>
        </section>
    );
}
//tt0068646
//tt0383537