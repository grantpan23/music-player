import { useState } from "react"
import List from "./List"

export default function PublicList(props){
    const [lists,setlists]=useState([{
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
    },
    {
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
    },
    {
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
    }])

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