import { useEffect } from "react"
import { useState } from "react"
import Track from "../Track"
import ListEdit from "./ListEdit"


export default function List(props){
    const [isExpand,setIsExpand]=useState(false)
    const [tracks,setTracks]=useState([])

    useEffect(() => {
        const getTrackInfo = async() =>{
            //wait for all promises to resolve
            let trackInfo = await Promise.all(
                props.tracks.map(async (track) =>{
                    const response = await fetch(`/api/open/track/${track}`);
                    const data = await response.json();
                    return data;
                })
            );
            setTracks(trackInfo);
        }
        getTrackInfo();
    },[])
    
    const reviewElement = props.reviews.map(review =>
        <div>
            <h2>----------------------------</h2>
            <p>rating; {review.rating}</p>
            <p>comment: {review.comment}</p>
            <p>From: {review.username} in {review.dateTime}</p>
        </div>        
    )

    const trackElement = tracks.map(track => 
        <div>
            <h2>----------------------------</h2>
            <Track isEdit={props.isEdit} key={track.track_id} name ={track.track_title} artist={track.artist_name} time={track.track_duration} album={track.album_title}/>
        </div>
    )
    

    return(        
            <div>
                <h2>Name: {props.name} </h2>
                {props.created ? <p>Last modify by {props.lastModified}</p> :            
                <p>Created by: {props.creator}, last modified at: {props.lastModified}</p>
                }
                <p>Number of tracks: {props.tracks.length}</p>
                <p>Avg rating; {props.rating}</p>
                <p>Play time: {props.playtime}</p>
                {props.created && <button onClick={(e)=>{props.edit(props.name)}}>Edit</button>}
                <button>Add comment and rating</button>
                {isExpand ? 
                <div>
                    <p>*****************************</p>
                    <p>description: {props.des}</p>
                    {trackElement}
                    <h2>Comment:</h2>
                    {reviewElement}
                    <button onClick={(e)=>{setIsExpand(false)}}>Close List</button>
                </div> :          
                <div>
                    <button onClick={(e)=>{setIsExpand(true)}}>Expand List</button>
                </div>
            }
        </div>

    )
}