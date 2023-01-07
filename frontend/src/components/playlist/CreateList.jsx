import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CreateList(props){

    const [playlistName,setPlaylistName] = useState('');
    const [tracksList, setTracksList] = useState('');
    const [description,setDescription] = useState('');
    const [visibility, setVisibility] = useState("private");
    
    const location = useLocation();
    const username = location.state.username;
    const token = location.state.token;

    useEffect(()=>
    {
        console.log(username);
        console.log(token);
    },[])

    const handleClick = async() =>{
        if(!playlistName || tracksList){
            alert('Playlist name and at least one track are both required.');
            return;
        }
        
        const newPlaylist = {
            "track_IDs": tracksList,
            "visibility": visibility,
            "description": description
        }

        console.log(newPlaylist);

        const response = await fetch(`/api/secure/${username}/${playlistName}`,{ 
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Authorization: token},
            body: JSON.stringify(newPlaylist)
        })

        if(response.status != 200){
            const message = await response.text();
            alert(message);
            return;
        }
        alert('Success')
    }

    return(
        <div>
            <h1>Create Playlist</h1>
            <div>
                <Link to="/main/user/list/private" state={{username:username,token:token}}>Back</Link>
            </div>
            <div>
                <label>
                    Playlist name:
                    <input type="text" name="name" onChange={e => setPlaylistName(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    List of tracks:
                    <input type="text" name="tracks" onChange = {e => setTracksList(e.target.value.split(',').map(Number))}></input>
                </label>
            </div>
             <div>
                <label>
                    Description:
                    <input type="text" name="name" onChange={e => setDescription(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Visibility:
                    <select onChange={e => setVisibility(e.target.value)}>
                        <option value="private">private</option>
                        <option value="public">public</option>
                    </select>
                </label>
            </div>
            <div>
                <button onClick={handleClick}>Create</button>
            </div>
        </div>
    )
}

