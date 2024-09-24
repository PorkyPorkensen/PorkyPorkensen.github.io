import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="siteHeader">
            <h1>Mitz' Movie Center</h1>
            <nav className="links" aria-label="Main navigation">
                <ul>
                    <li>
                        <Link to="/">Explore</Link>
                    </li>
                    <li>
                        <Link to="/random">Random Titles</Link>
                    </li>
                    <li>
                        <Link to="/watchlist">Watchlist</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}