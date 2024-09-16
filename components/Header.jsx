import React from "react"
import { Link } from "react-router-dom"

export default function Header(){
    return (
        
        <div className="siteHeader">
        <h1>Mitz' Movie Center</h1>
        <br />
        <header className="links">
           <Link to="/" >Explore</Link>
           <br />
           <Link to="/random">Random Titles</Link>
           <br />
           <Link to="/watchlist" >Watchlist</Link> 
                    
        </header>
        </div>
        
    )
}