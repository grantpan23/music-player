import { useEffect } from "react"
import { useState } from "react"
import { json, Link, useNavigate } from "react-router-dom"
import { auth, db } from "../firebase";
import { getAuth, onAuthStateChanged,sendEmailVerification  } from "firebase/auth"; 
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Search from "./Search";
import PublicList from "./playlist/PublicList";
import PrivateList from "./playlist/PrivateList";
import Policies from "./Policies";




export default function Main(){
    const navigate = useNavigate()
    const [userID, setID]=useState("")
    const [users,setUsers]= useState([])
    const [username,setUsername] = useState('')
    const [isAdmin,setisAdmin]= useState(false)
    const [isDisable,setIsDisable] = useState(false)
    const [ver,setVer]=useState(false)
    const [cUser,setcUser]=useState()
    
    const [token,setToken] = useState('');

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              setID(uid)
              setVer(user.emailVerified)
              setcUser(auth.currentUser)
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

   
    useEffect(()=>{
        let userVer=false;
        let disableUser=false;
        let uName = '';
        console.log(users)

        //get list of users and find correct user info based on ID
        for(let i=0;i<users.length;i++){
            if(users[i].id==userID){
                userVer = users[i].admin;
                disableUser = users[i].disable;
                uName = users[i].name;
            }
        } 
        setisAdmin(userVer)
        setIsDisable(disableUser)
        setUsername(uName);

        const payload = {
            name: uName,
            admin: userVer,
            disable: disableUser
        };
        
        //fetch token passing user info as body
        async function fetchToken() {
            const response = await fetch(`api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const token = await response.json();
            setToken(token.accessToken);
            console.log(token.accessToken);
        }

        fetchToken();

    },[users])

    const handleLogOut = () => {
     localStorage.clear()
        navigate("/")
    }



    return(
        <div>
            {ver ?            
            <div>
                {isDisable ? 
                <div>
                    <h1>U r deactivated pls contact an admin at test@gmail.com</h1>
                    <button onClick={handleLogOut}>Go back</button>
                </div> : 
                <div>
                    <button onClick={handleLogOut}>Log out</button>
                    <Link to="change-password">Change Password</Link>
                    <div><Policies></Policies></div>
                    <Search addable={false}/>
                    {isAdmin && <Link to={"/admin"} state={{username:username,token:token}}>Go to admin</Link>}
                    <div>
                        <Link to={"user/list/private"} state={{username:username, token:token}}>My Playlists</Link>
                    </div>
                    <div>
                        <PublicList isAdmin = {isAdmin} token = {token} isLoggedIn = {true} username = {username}/>
                    </div>
                </div> 
                }  
            </div> :
                <div>
                    <div>
                        <h1>Not Verified</h1>
                        <button onClick={(e)=>{sendEmailVerification(cUser)}}>Resend verify link</button>
                        <button onClick={handleLogOut}>Log out</button>
                    </div>
                    <div>
                        <PublicList isAdmin = {isAdmin} token = {token} isLoggedIn = {true} username = {username} />
                    </div>
                </div>
            }
        </div>
    )
}