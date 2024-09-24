import React, { useState, useEffect } from "react";
import { storeMovie } from "../utilities";
import nfImg from "../images/nf.png"

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState(""); // state to store search input
    const [movies, setMovies] = useState([]); // state to store detailed movie data
    const [searched, setSearched] = useState(false); // track if a search has been made

    // Use useEffect to load search term and results from localStorage when the component mounts
    useEffect(() => {
        const savedSearchTerm = localStorage.getItem('searchTerm');
        const savedMovies = localStorage.getItem('movies');
        
        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
            setSearched(true); // Mark that a search has been made
        }
        if (savedMovies) {
            setMovies(JSON.parse(savedMovies));
        }
    }, []);

    function searchMovies() {
        if (searchTerm.trim() === "") return; // Don't search if search term is empty

        // First fetch the list of movies
        fetch(`https://omdbapi.com/?s=${searchTerm}&apikey=e9854519`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    localStorage.setItem('searchTerm', searchTerm); // Save search term
                    // Fetch detailed information for each movie using imdbID
                    const movieDetailsPromises = data.Search.map((mov) =>
                        fetch(`https://omdbapi.com/?i=${mov.imdbID}&apikey=e9854519`)
                        .then(response => response.json())
                    );

                    // Wait until all detailed movie data is fetched
                    Promise.all(movieDetailsPromises)
                        .then(detailsArray => {
                            setMovies(detailsArray); // Store the detailed movie data in state
                            localStorage.setItem('movies', JSON.stringify(detailsArray)); // Save movies to localStorage
                            setSearched(true); // Mark that a search has been made
                        });
                } else {
                    setMovies([]); // Clear movie list if no results
                    setSearched(true); // Mark that a search was made with no results
                }
            });
    }

    function handleInputChange(e) {
        setSearchTerm(e.target.value); // Update search term
        setMovies([]); // Clear movies when user starts typing a new search
        setSearched(false); // Reset the searched flag
    }


    // Render detailed movie info from the state
    const movieElements = movies.length > 0 
    ? movies.map((mov) => (
        <article className="movDiv" key={mov.imdbID}>
            <figure>
                <img 
                    src={mov.Poster === nfImg ? '../images/nf.png' : mov.Poster} 
                    alt={mov.Poster === nfImg ? "Poster not available" : `${mov.Title} Poster`} 
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
                <a href={`https://www.imdb.com/title/${mov.imdbID}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${mov.Title} on IMDB`}>
                    <p><strong>Rating:</strong> {mov.imdbRating}</p>
                </a>
                <button 
                    className="randBtn" 
                    onClick={() => storeMovie(mov.imdbID)} 
                    aria-label={`Add ${mov.Title} to Watchlist`}
                >
                    <i className="fa-solid fa-star" aria-hidden="true"></i> 
                    <span>Add to Watchlist</span>
                </button>
            </div>
        </article>
    ))
    : searched 
    ? <p>No movies found</p> 
    : null;

return (
    <section className="homeScreen">
        <header className="search">
            <label htmlFor="searchMovie" className="sr-only">Search for a movie</label>
            <input
                type="text"
                id="searchMovie"
                placeholder="Search for a movie!"
                value={searchTerm} // controlled input
                onChange={handleInputChange} // update state on change
                aria-label="Search for a movie"
            />
            <button className="searchBtn" onClick={searchMovies} aria-label="Search movies">Search</button>
        </header>
        <div className="resDiv">
            {/* Render only when a search is made */}
            {searched ? (
                movieElements.length > 0 ? (
                    movieElements
                ) : (
                    <h2>No movies found</h2>
                )
            ) : (
                <div className="defaultScreen">
                    <h2>Please search for a movie</h2>
                </div>
            )}
        </div>
    </section>
);
}