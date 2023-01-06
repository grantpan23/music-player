import { useCallback, useEffect } from "react"
import { useState } from "react"
import Track from "./Track"

export default function Search(){
    const [tracks,setTracks] = useState([]);
    const [titleName,setTitleName] = useState("");
    const [artistName,setArtistName] = useState("");
    const [genreName,setGenreName] = useState("");

    const handleSearch = async () => {
        const searchTerms = {
            artistSearch: artistName,
            genreSearch: genreName,
            titleSearch: titleName
        }

        const response = await fetch(`/api/open/search/?title=${titleName}&artist=${artistName}&genre=${genreName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            }
        });

        const newTracks = await response.json();

        setTracks(newTracks);
    }

    const trackElement = tracks.map(track => 
        <div>
            <h2>----------------------------</h2>
            <Track key={track.track_id} name ={track.track_title} artist={track.artist_name} time={track.track_duration} album={track.album_title}/>
        </div>
    )

    return(
        <div>
            <div>
                <h1>Search Tracks</h1>
                <div id="search-container">
                    <form id="track-name-search">
                        <input type="text" placeholder="Track title..." value = {titleName} onChange={e => setTitleName(e.target.value)}/>
                    </form>
                    <form id="artist-name-search">
                        <input type="text" placeholder="Artist name..." value = {artistName} onChange={e => setArtistName(e.target.value)}/>
                    </form>
                    <form id="genre-name-search">
                        <input type="text" placeholder="Genre name..." value = {genreName} onChange={e => setGenreName(e.target.value)}/>
                    </form>
                </div>
                <button  type="submit" onClick={handleSearch} >Search</button>
                </div>
                <div className="result" >
                    {trackElement}
            </div>
        </div>
    )
}