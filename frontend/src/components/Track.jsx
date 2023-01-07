import { useState } from "react";
import PlayBtn from "./PlayBtn";

export default function Track(props){
    const [isExpand,setIsExpand]=useState(false)

    return(
        <div>
            <p>Track: {props.name}</p>
            <p>Artist: {props.artist}</p>
            <PlayBtn searchKey={props.name + " " + props.artist}/>
            {props.addable && <button>Add to playList</button>}
            {isExpand ? 
            <div>
                <p>Time: {props.time}</p>
                <p>Album: {props.album}</p>
                <button onClick={(e)=>{setIsExpand(false)}}>Close</button>
            </div> :          
            <div>
                <button onClick={(e)=>{setIsExpand(true)}}>Expand</button>
            </div>

            }
        </div>
    )
}