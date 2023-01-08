import { useEffect, useState } from "react"
import List from "./List"

export default function PublicList(props){
    const [lists,setLists]=useState([]);
    const [username,setUsername] = useState(props.username)
    const [token,setToken] = useState(props.token)

    useEffect(() => {
        const fetchPublicPlaylists = async() =>{
            const response = await fetch('/api/open/public-playlists');
            const playlists = await response.json();
            setLists(playlists);
        }

        fetchPublicPlaylists();
        console.log(props.token)
    },[])

    const listElement = lists.map(list => 
        <div>
            <h2>----------------------------</h2>
            <List username = {props.username} isLoggedIn = {props.isLoggedIn} isPublic = {true} token = {props.token} created={false} admin={false} name={list.name} creator={list.creator} des={list.description} reviews={list.reviews} tracks={list.track_IDs} playtime={list.playtime} rating={list.averageRating} lastModified={list.lastModified} />
        </div>
    )
    return(
        <div>
            {listElement}
        </div>
    )
}