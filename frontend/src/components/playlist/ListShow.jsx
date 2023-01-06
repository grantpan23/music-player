import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase";
import PrivateList from "./PrivateList";


export default function ListShow(){
    const [userID, setID]=useState("")


    return(
        <div>
            <form action="">
                <button>Create playlist</button>
            </form>
            <PrivateList />
        </div>
    )
}