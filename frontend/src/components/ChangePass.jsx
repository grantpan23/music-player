import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, updatePassword,reauthenticateWithCredential  } from "firebase/auth";
import { auth, db } from "../firebase";


export default function ChangePass(){
    const [pass,setPass]=useState("") 
    const [err,setErr]=useState(false)
    const user = auth.currentUser;
    const navigate=useNavigate()

    const handleSubmit =(e)=>{
        e.preventDefault()
        updatePassword(user, pass).then(() => {
            window.alert("success")
            navigate("/main")
          }).catch((error) => {
            setErr(true)
          });
          
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="New Password" value = {pass} onChange={e => setPass(e.target.value)}/>
                <button type="submit">Change</button>
            </form>
            <Link to="/main">Cancel</Link>
            {err && <span>Err log back out and log in and try again </span>}
        </div>
    )
}