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
    const[listName,setListName] = useState([])
    const[isExpand,setIsExpand]=useState([false])
    const[isExpandComment,setIsExpandComment]=useState([false])
    const [creator,setCreator] = useState("")
  
    const [lists,setLists]=useState([])

    const [editedList,setEditedList]=useState({
        "track_IDs": [
            146716,
            146717,
            146718
        ],
        "visibility": "public",
        "description": "asdfasdfd",
        "name": "test46",
        "creator": "datasianguy23",
        "reviews": [
            {
                "rating": 5,
                "comment": "ok",
                "username": "grantpan",
                "dateTime": "2023-01-06, 2:53:00 p.m.",
                "hidden": false
            }
        ],
        "averageRating": "5.0",
        "playtime": "14:24",
        "noTracks": 3,
        "lastModified": "2023-01-05, 12:18:29 p.m."
    })

    const [trackSInEditedList,setTracksInEditedList]=useState([
        {
            "track_id": 146720,
            "album_id": 21896,
            "album_title": "Souvenirs, Novelties & Party Tricks XE",
            "album_url": "http://freemusicarchive.org/music/Regenerated_Headpiece/Souvenirs_Novelties__Party_Tricks_XE/",
            "artist_id": 23348,
            "artist_name": "Regenerated Headpiece",
            "artist_url": "http://freemusicarchive.org/music/Regenerated_Headpiece/",
            "artist_website": "http://blocsonic.com/artist/regenerated-headpiece",
            "license_image_file": "http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png",
            "license_image_file_large": "http://fma-files.s3.amazonaws.com/resources/img/licenses/by-nc-sa.png",
            "license_parent_id": 5,
            "license_title": "Attribution-NonCommercial-ShareAlike",
            "license_url": "http://creativecommons.org/licenses/by-nc-sa/4.0/",
            "tags": "[]",
            "track_bit_rate": 320000,
            "track_comments": 0,
            "track_composer": "",
            "track_copyright_c": "",
            "track_copyright_p": "",
            "track_date_created": "11/22/2016 09:52:51 PM",
            "track_date_recorded": "",
            "track_disc_number": 1,
            "track_duration": "3:56",
            "track_explicit": "",
            "track_explicit_notes": "",
            "track_favorites": 0,
            "track_file": "music/blocSonic/Regenerated_Headpiece/Souvenirs_Novelties__Party_Tricks_XE/Regenerated_Headpiece_-_34_-_Elements_Remix_Live.mp3",
            "track_genres": "[{'genre_id': '21', 'genre_title': 'Hip-Hop', 'genre_url': 'http://freemusicarchive.org/genre/Hip-Hop/'}]",
            "track_image_file": "https://freemusicarchive.org/file/images/tracks/Track_-_20161122204922045",
            "track_information": "",
            "track_instrumental": 0,
            "track_interest": 884,
            "track_language_code": "",
            "track_listens": 743,
            "track_lyricist": "",
            "track_number": 34,
            "track_publisher": "",
            "track_title": "Elements Remix (Live)",
            "track_url": "http://freemusicarchive.org/music/Regenerated_Headpiece/Souvenirs_Novelties__Party_Tricks_XE/04_-_Elements_Remix_Live"
        },
        {
            "track_id": 146717,
            "album_id": 21896,
            "album_title": "Souvenirs, Novelties & Party Tricks XE",
            "album_url": "http://freemusicarchive.org/music/Regenerated_Headpiece/Souvenirs_Novelties__Party_Tricks_XE/",
            "artist_id": 23348,
            "artist_name": "Regenerated Headpiece",
            "artist_url": "http://freemusicarchive.org/music/Regenerated_Headpiece/",
            "artist_website": "http://blocsonic.com/artist/regenerated-headpiece",
            "license_image_file": "http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png",
            "license_image_file_large": "http://fma-files.s3.amazonaws.com/resources/img/licenses/by-nc-sa.png",
            "license_parent_id": 5,
            "license_title": "Attribution-NonCommercial-ShareAlike",
            "license_url": "http://creativecommons.org/licenses/by-nc-sa/4.0/",
            "tags": "[]",
            "track_bit_rate": 320000,
            "track_comments": 0,
            "track_composer": "",
            "track_copyright_c": "",
            "track_copyright_p": "",
            "track_date_created": "11/22/2016 09:52:48 PM",
            "track_date_recorded": "",
            "track_disc_number": 1,
            "track_duration": "5:00",
            "track_explicit": "",
            "track_explicit_notes": "",
            "track_favorites": 0,
            "track_file": "music/blocSonic/Regenerated_Headpiece/Souvenirs_Novelties__Party_Tricks_XE/Regenerated_Headpiece_-_31_-_Get_Your_Head_On__Elements__Rhythmically_Rhyming_Medley_Live.mp3",
            "track_genres": "[{'genre_id': '21', 'genre_title': 'Hip-Hop', 'genre_url': 'http://freemusicarchive.org/genre/Hip-Hop/'}]",
            "track_image_file": "https://freemusicarchive.org/file/images/tracks/Track_-_20161122204754773",
            "track_information": "",
            "track_instrumental": 0,
            "track_interest": 917,
            "track_language_code": "",
            "track_listens": 804,
            "track_lyricist": "",
            "track_number": 31,
            "track_publisher": "",
            "track_title": "Get Your Head On / Elements / Rhythmically Rhyming Medley (Live)",
            "track_url": "http://freemusicarchive.org/music/Regenerated_Headpiece/Souvenirs_Novelties__Party_Tricks_XE/01_-_Get_Your_Head_On___Elements___Rhythmically_Rhyming_Medley_Live"
        },
        {
            "track_id": 150677,
            "album_id": 22476,
            "album_title": "Electronic Sounds Vacation",
            "album_url": "http://freemusicarchive.org/music/Shadows_On_The_Snow/Electronic_Sounds_Vacation/",
            "artist_id": 23399,
            "artist_name": "Shadows On The Snow",
            "artist_url": "http://freemusicarchive.org/music/Shadows_On_The_Snow/",
            "artist_website": "",
            "license_image_file": "http://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png",
            "license_image_file_large": "http://fma-files.s3.amazonaws.com/resources/img/licenses/by-nc-nd.png",
            "license_parent_id": 6,
            "license_title": "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0",
            "license_url": "http://creativecommons.org/licenses/by-nc-nd/4.0/",
            "tags": "['soundscapes', 'dark ambient', 'experimental electronic']",
            "track_bit_rate": 320000,
            "track_comments": 0,
            "track_composer": "",
            "track_copyright_c": "",
            "track_copyright_p": "",
            "track_date_created": "2/05/2017 03:52:03 AM",
            "track_date_recorded": "",
            "track_disc_number": 1,
            "track_duration": "25:37:00",
            "track_explicit": "",
            "track_explicit_notes": "",
            "track_favorites": 1,
            "track_file": "music/Murmure_Intemporel/Shadows_On_The_Snow/Electronic_Sounds_Vacation/Shadows_On_The_Snow_-_01_-_Trees_Reflected_In_The_Water.mp3",
            "track_genres": "[{'genre_id': '38', 'genre_title': 'Experimental', 'genre_url': 'http://freemusicarchive.org/genre/Experimental/'}, {'genre_id': '42', 'genre_title': 'Ambient Electronic', 'genre_url': 'http://freemusicarchive.org/genre/Ambient_Electronic/'}, {'genre_id': '107', 'genre_title': 'Ambient', 'genre_url': 'http://freemusicarchive.org/genre/Ambient/'}]",
            "track_image_file": "https://freemusicarchive.org/file/images/tracks/Track_-_2017020525208111",
            "track_information": "",
            "track_instrumental": 0,
            "track_interest": 879,
            "track_language_code": "",
            "track_listens": 730,
            "track_lyricist": "",
            "track_number": 1,
            "track_publisher": "",
            "track_title": "Trees Reflected In The Water",
            "track_url": "http://freemusicarchive.org/music/Shadows_On_The_Snow/Electronic_Sounds_Vacation/1_-_Trees_Reflected_In_The_Water"
        }
    ])

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
            console.log(playlists)
            setLists(playlists);
        }

        fetchUserPlaylists();
    },[])

    const editFunc = (name,creator) =>{
        setListName(name)
        setCreator(creator)
        setIsEdit(true)
    }

    const editTrack = trackSInEditedList.map(track => (
        <EditedTrack  creator={editedList.creator} fromList={editedList.name} album={track.album_title} duration={track.track_duration} artist={track.artist_name} key={track.track_id} title={track.track_title}  />
    ))
    
    const editReview = editedList.reviews.map(review=>(
        <EditedReview rating={review.rating} comment={review.comment} name={review.username} date={review.dateTime} creator={editedList.creator} fromList={editedList.name}/>
    ))
    
    const listElement = lists.map(list => 
        <div>
            <h2>----------------------------</h2>
            <List token = {token} isEdit={isEdit} edit={editFunc} created={true} admin={false} name={list.name} creator={list.creator} des={list.description} reviews={list.reviews} tracks={list.track_IDs} playtime={list.playtime} rating={list.averageRating} lastModified={list.lastModified} />
        </div>
    )

    const goBack = () => {
        setIsEdit(false)
    }

    return(
        <div>
            {isEdit ? 
            <div>
                <Search addable={true} list={editedList.name} creator={editedList.creator}/>
                <button>Change Name</button>
                <h2>Name: {editedList.name}</h2>
                <p>Number of tracks: {editedList.track_IDs.length}</p>
                <p>Avg rating; {editedList.averageRating}</p>
                <p>Play time: {editedList.playtime}</p>
                {isExpand && editTrack}
                { isExpand ? <button onClick={(e)=>setIsExpand(false)}>Collapse tracks</button> :
                <button onClick={(e)=>setIsExpand(true)}>Expands tracks</button>}
                {isExpandComment && editReview}
                { isExpandComment ? <button onClick={(e)=>setIsExpandComment(false)}>Collapse reviews</button> :
                <button onClick={(e)=>setIsExpandComment(true)}>Expands reviews</button>}
                <button onClick={(e)=>{setIsEdit(false)}}>Save</button>
                <button onClick={(e)=>{setIsEdit(false)}}>Cancel</button>
            </div> :             
            <div>
                <Link to="/main/user/list/private/create" state={{username:username,token:token}}>Create a playlist</Link> {' '}
                <Link to="/main">Go Back</Link>
                {listElement}
            </div>
            }
        </div>
    )
}