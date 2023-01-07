import { useEffect, useMemo } from "react"
import { useState } from "react"
import Track from "../Track"



export default function List(props){
    const [isExpand,setIsExpand]=useState(false)
    const [isLoading,setIsLoading]=useState(false);
    const [trackInfo,setTrackInfo]=useState([])
    const [tracks,setTracks] = useState(props.tracks);
    const [visibility,setVisibility] = useState("public");
    const [description,setDescription] = useState(props.des);
    const [reviews,setReviews] = useState(props.reviews);
    const [averageRating,setAverageRating] = useState(props.rating);
    const [playtime,setPlaytime] = useState(props.playtime);
    const [lastModified,setLastModified] = useState(props.lastModified);
    const [available,setAvailable] = useState(true);
    const [noTracks,setNoTracks] = useState(props.tracks.length);
    const [name,setName] = useState(props.name);
    const [creator,setCreator] = useState(props.creator);

    useEffect(() => {
        const fetchTrackInfo = async() =>{
            //wait for all promises to resolve
            let trackInformation = await Promise.all(
                tracks.map(async (track) =>{
                    const response = await fetch(`/api/open/track/${track}`);
                    const data = await response.json();
                    return data;
                })
            );
            setTrackInfo(trackInformation);
        }
        fetchTrackInfo();
    },[tracks]);

    useEffect(() =>{
        
        const fetchPlaylistData = async() => {
            console.log('sending request');
            const response = await fetch(`/api/open/public-playlists/${name}/${creator}`);
            if(response.ok){
                const data = await response.json();
                setTracks(data.track_IDs);
                setVisibility(data.visibility);
                setDescription(data.description);
                setReviews(data.reviews);
                setAverageRating(data.averageRating);
                setPlaytime(data.playtime);
                setLastModified(data.lastModified);
                setNoTracks(data.noTracks);
            } else{
                console.log(response)
                setNoTracks('unavailable');
                setName('unavailable');
                setCreator('unavailable');
                setAverageRating('unavailable');
                setPlaytime('unavailable');
                setLastModified('unavailable');
                setAvailable(false); //if playlist not found it's no longer available
            }
            setIsLoading(false);
        }
        if(isExpand){
            setIsLoading(true);
            fetchPlaylistData();
        }
    },[isExpand])
    
    const reviewElement = reviews.map(review =>
        <div>
            <h2>----------------------------</h2>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <p>From: {review.username} at {review.dateTime}</p>
        </div>        
    )

    const trackElement = trackInfo.map(track => 
        <div>
            <h2>----------------------------</h2>
            <Track isEdit={props.isEdit} key={track.track_id} name ={track.track_title} artist={track.artist_name} time={track.track_duration} album={track.album_title}/>
        </div>
    )

    return(        
            <div>
                <h2>Name: {name} </h2>
                {props.created ? <p>Last modified by {lastModified}</p> :            
                <p>Created by: {creator}, last modified at {lastModified}</p>
                }
                <p>Number of tracks: {noTracks}</p>
                <p>Average rating: {averageRating}</p>
                <p>Play time: {playtime}</p>
                {props.created && <button onClick={(e)=>{props.edit(name,creator)}}>Edit</button>}
                <button>Add comment and rating</button>
                {!isLoading ? 
                <div>
                    {isExpand && available && (visibility == "public") && 
                        <div>
                            <p>*****************************</p>
                            <p>description: {description}</p>
                            {trackElement}
                            <h2>Reviews:</h2>
                            {reviewElement}
                            <button onClick={(e)=>{setIsExpand(false)}}>Close List</button>
                        </div>
                    }   
                    {isExpand && (!available || visibility == "private") &&
                            <div><h2>Playlist no longer available.</h2></div>        
                    }
                    {!isExpand && <button onClick={(e)=>{setIsExpand(true)}}>Expand List</button>}
                </div>
                 :          
                <div>
                    <h2>Loading...</h2>
                </div>
                }
            </div>
    )
}