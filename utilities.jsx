

export function getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist'))
}

export function storeMovie(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie saved to Watchlist');
    } else {
        alert('Movie already in watchlist!');
    }
}

