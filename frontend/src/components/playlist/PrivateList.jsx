import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase";
import Search from "../Search";
import EditedReview from "./EditedReview";
import EditedTrack from "./EditedTrack";
import List from "./List";
import { useLocation } from "react-router-dom";

import { json, Link, useNavigate } from "react-router-dom"



export default function PrivateList(props){
    const [isEdit,setIsEdit] = useState(false)
    const [listName,setListName] = useState([])
    const [creator,setCreator] = useState("")
    const [tracksList,setTracksList] = useState([]);
    const [description,setDescription] = useState('');
    const [visibility,setVisibility] = useState('')
    const [lists,setLists]=useState([])

    const location = useLocation();
    const username = location.state.username;
    const token = location.state.token;

    useEffect(() => {
        const fetchUserPlaylists = async() =>{
            const response = await fetch(`/api/secure/${username}/playlists`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            const playlists = await response.json();
            setLists(playlists);
        }

        fetchUserPlaylists();
    },[])

    const editFunc = (name,creator) =>{

        const getEditPlaylist = async function() {
            const response = await fetch(`/api/secure/${creator}/${name}`,{ 
                method: 'GET',
                headers: {'Authorization': token}
            })
            const editPlaylist = await response.json();
            setTracksList(editPlaylist.track_IDs);
            setDescription(editPlaylist.description);
            setVisibility(editPlaylist.visibility);
        }

        getEditPlaylist();
        setListName(name)
        setCreator(creator)
        setIsEdit(true)
    }

    const handleSave = async () => {
        if(!listName || !tracksList){
            alert('Playlist name and at least one track are both required.');
            return;
        }
        
        const updatedPlaylist = {
            "track_IDs": tracksList,
            "visibility": visibility,
            "description": description,
            "name": listName
        }

        console.log(updatedPlaylist);

        const response = await fetch(`/api/secure/${creator}/${listName}`,{ 
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': token},
            body: JSON.stringify(updatedPlaylist)
        })

        if(response.status != 200){
            const message = await response.text();
            alert(message);
            return;
        }
        alert('Success')
        window.location.reload()
    }

    const handleConfirmDelete = async(e) =>{
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this playlist?");
        if (confirmDelete) {
            const response = await fetch(`/api/secure/${creator}/${listName}`, { 
                method: 'DELETE',
                headers: {'Authorization': token},
            })

            if(response.status != 200){
                const message = await response.text();
                alert(message);
                return;
            }
            alert('Success')
            window.location.reload()
        }
    }
    
    const listElement = lists.map(list => 
        <div>
            <h2>----------------------------</h2>
            <List token = {token} isEdit={isEdit} edit={editFunc} created={true} admin={false} name={list.name} creator={list.creator} des={list.description} reviews={list.reviews} tracks={list.track_IDs} playtime={list.playtime} rating={list.averageRating} lastModified={list.lastModified} />
        </div>
    )


    return(
        <div>
            {isEdit ? 
            <div>
                <h1>Edit Playlist</h1>
            <div>
                <label>
                    Playlist name:
                    <input type="text" name="name" value = {listName} onChange={e => setListName(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    List of tracks:
                    <input type="text" name="tracks" value = {tracksList.join()} onChange = {e => setTracksList(e.target.value.split(',').map(Number))}></input>
                </label>
            </div>
             <div>
                <label>
                    Description:
                    <input type="text" name="name" value = {description} onChange={e => setDescription(e.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Visibility:
                    <select defaultValue = {visibility} onChange={e => setVisibility(e.target.value)}>
                        <option value="private">private</option>
                        <option value="public">public</option>
                    </select>
                </label>
            </div>
                <button onClick={handleSave}>Save</button>
                <button onClick={(e)=>{setIsEdit(false)}}>Cancel</button>
            <div>
                <button onClick = {handleConfirmDelete}>Delete Playlist</button>
            </div>
        </div> 
            :             
            <div>
                <Link to="/main/user/list/private/create" state={{username:username,token:token}}>Create a playlist</Link> {' '}
                <Link to="/main">Go Back</Link>
                {listElement}
            </div>
            }
        </div>
    )
}