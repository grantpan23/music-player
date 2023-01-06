import { useState } from "react";
import PlayBtn from "./PlayBtn";

export default function Track(props){
    const [isExpand,setIsExpand]=useState(false)


    return(
        <div>
            <p>Track: {props.name}</p>
            <p>Artist: {props.singer}</p>
            <PlayBtn searchKey={props.name}/>
            {isExpand ? 
            <div>
                <p>Time: {props.time}</p>
                <p>Album: {props.album}</p>
                <button onClick={(e)=>{setIsExpand(false)}}>close expand</button>
            </div> :          
            <div>
                <button onClick={(e)=>{setIsExpand(true)}}>expand</button>
            </div>
            }
        </div>
    )
}