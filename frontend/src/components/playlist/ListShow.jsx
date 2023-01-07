import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase";
import PrivateList from "./PrivateList";
import { json, Link, useNavigate } from "react-router-dom"
import PublicList from "./PublicList";


export default function ListShow(){
    const [userID, setID]=useState("")


    return(
        <div>
            {/* <PublicList ></PublicList> */}
            <Link to="private">To ur private list</Link>
            <div>
                <Link to="/main">Go back</Link>
            </div>
        </div>
    )
}