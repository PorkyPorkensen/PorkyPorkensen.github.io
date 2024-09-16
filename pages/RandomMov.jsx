import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getWatchlist } from "../utilities";
import imdbImg from "../images/IIMDB.png"
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
        <div className="randScreen">
            <br />

            <h1>Your Random Movie/Episode is....</h1>
            <div className="randTitleCard">
                <h2>{rMov.Title}</h2>
                <br />
                <img 
                    src={rMov.Poster === 'N/A' ? '../images/nf.png' : rMov.Poster} 
                    alt="Random Movie Poster" 
                />
                <br />
                <br />
                <span className="RDDiv">
                    <p><strong>Runtime:</strong> {rMov.Runtime}</p>
                    <p><strong>Country:</strong> {rMov.Country}</p>
                    <p><strong>Released:</strong> {rMov.Released}</p>
                </span>
                <span className="RDDiv">
                    <p><strong>Written By:</strong> {rMov.Writer}</p>
                    <p><strong>Director:</strong> {rMov.Director}</p>
                </span>
                <p>{rMov.Plot === 'N/A' ? 'Plot Not Found' : rMov.Plot}</p>
                <br />
                <p>Rating: {rMov.imdbRating}</p>
                <div className="randBtns">
                    <div className="randBtn" onClick={() => storeMovie(rMov.imdbID)}><i class="fa-solid fa-star"></i><p>Add to Watchlist</p></div>
                    <Link to="/random"><div className="randBtn red" ><i class="fa-solid fa-rotate-right"></i><p>Not for me</p></div></Link>
                </div>
                <a href={`https://www.imdb.com/title/${rMov.imdbID}`}>
                    <img className="imdbLogo" src={imdbImg} alt="IMDB Logo" />
                </a>
            </div>
        </div>
    );
}
//tt0068646
//tt0383537