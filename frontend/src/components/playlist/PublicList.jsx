import { useEffect, useState } from "react"
import List from "./List"

export default function PublicList(props){
    const [lists,setLists]=useState([]);

    useEffect(() => {
        const fetchPublicPlaylists = async() =>{
            const response = await fetch('/api/open/public-playlists');
            const playlists = await response.json();
            setLists(playlists);
        }

        fetchPublicPlaylists();
    },[])

    const listElement = lists.map(list => 
        <div>
            <h2>----------------------------</h2>
            <List created={false} admin={false} name={list.name} creator={list.creator} des={list.description} reviews={list.reviews} tracks={list.track_IDs} playtime={list.playtime} rating={list.averageRating} lastModified={list.lastModified} />
        </div>
    )
    return(
        <div>
            {listElement}
        </div>
    )
}