import { useEffect } from "react"
import { useState } from "react"
import { json, Link, useNavigate } from "react-router-dom"
import { auth, db } from "../firebase";
import UserList from "./admin/UserList"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Search from "./Search";
import ListShow from "./playlist/ListShow";
import PublicList from "./playlist/PublicList";



export default function Main(){
    const navigate = useNavigate()
    const [genres,setGenres] = useState('')
    const [artist,setArtist]= useState('')
    const [track,setTrack]= useState('')
    const [click,setClick] =useState(true)
    const [userID, setID]=useState("")
    const [users,setUsers]= useState([])
    const [isAdmin,setisAdmin]= useState(false)
    const [isDisable,setIsDisable] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setID(uid)
            } 
          });
          
    },[])

    useEffect(()=>{
        const loadData = async () =>{
            let list =[]
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            });
            setUsers(list)             
        }
        loadData()
    },[])

    
    
    let userVer=false
    let disableUser=false
    useEffect(()=>{
        console.log(users)
        for(let i=0;i<users.length;i++){
            if(users[i].id==userID){
                userVer = users[i].admin
                disableUser = users[i].disable
            }
        } 
        setisAdmin(userVer)
        setIsDisable(disableUser)
        console.log(disableUser)
    },[users])

    const handleLogOut = () => {
     localStorage.clear()
        navigate("/")
    }

    const handleUpdate = () => {
       
    }

    // useEffect((async()=>{
    //     const response = await fetch('api/genres', {
    //         method: 'GET',
    //         headers: {'Content-Type': 'application/json'}
    // })
    // if(response.status != 200){
    //     let message = await response.text();
    //     alert(message);
    //     return;
    // }
    // const g = await response.json();
    // setGenres(g)
    // }),[click])

     useEffect(()=>{
     },[click])

    const handleGenres = () => {
        setClick(!click)
        console.log(genres)
    }

    const handleArtists = () => {
        setArtist('hello')
        console.log(artist)
    }

    const handleTracks = () => {
        setTrack('hello')
        console.log(artist)
    }

    return(
        <div>
            {isDisable ? 
            <div>
                <h1>U r deactivated pls contact an admin at test@gmail.com</h1>
                <button onClick={handleLogOut}>Go back</button>
            </div> : 
            <div>
                <button onClick={handleLogOut}>Log out</button>
                <button onClick={handleUpdate}>Change Password</button>
                <Search />
                {isAdmin && <Link to="/admin">Go to admin</Link>}
                <PublicList />
            </div>
            }
            
        </div>
    )
}