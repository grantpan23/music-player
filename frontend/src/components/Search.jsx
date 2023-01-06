import { useEffect } from "react"
import { useState } from "react"
import Track from "./Track"

export default function Search(){
    const [tracks,setTrack] = useState([
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

    useEffect(()=>{

    },[])

    const trackElement= tracks.map(track => (
        <div>
            <h2>----------------------------</h2>
            <Track key={track.track_id} name ={track.track_title} singer={track.artist_name} time={track.track_duration} album={track.album_title}/>
        </div>
    ))
    return(
        <div>
            <div>
            <h1>Artists & Genres</h1>
            <div id="search-container">
                <form id="number-search">
                    <input type="text" placeholder="Search artists..." onChange={e => {}}/>
                    <button type="submit">Go!</button>
                </form>
                <form id="album-track-search">
                    <input type="text" placeholder="Search albums or tracks..." onChange={e => {}}/>
                    <button type="submit">Go!</button>
                </form>
            </div>
            <button  type="submit" >Show All Genres</button>
        </div>
        <div className="result" >
            {trackElement}
        </div>
        </div>
    )
}