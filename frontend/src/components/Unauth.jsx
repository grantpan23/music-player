import { useNavigate } from "react-router-dom"
import PublicList from "./playlist/PublicList"
import Search from "./Search"

export default function Unauth(){
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/login")
    }
    return(
        <div>
            <h1>Lab 4 Music & Playlist Application</h1>
            <h2>About:</h2>
            <div>
                <text>A full-stack web application that allows you to search for songs, view public playlists, and play songs on Youtube.
                     If you're a user, you can also create your own playlists and rate/comment on others' playlists.
                </text>
            </div>
            <button onClick={handleClick}>Log in/Sign in</button>
            <Search addable={false} />
            <PublicList isLoggedIn = {false} username = {null}/>
        </div>
    )
}