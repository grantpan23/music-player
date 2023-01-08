import UserList from "./UserList";
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function AdminWin(){

    const { state } = useLocation();

    const [username,setUsername] = useState('')
    const [token,setToken] = useState('')

    useEffect(() =>{
        setUsername(state.username);
        setToken(state.token);
        console.log(state.username)
        console.log(state.token)
    },[])

    return(
        <div>
            <Link to= {"/admin/logs-dmca"} state={{username:username,token:token}}>Create DMCA Log</Link>
            <UserList />
        </div>
    )
}