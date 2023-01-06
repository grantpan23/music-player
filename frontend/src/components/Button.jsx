import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../firebase";

export default function Button(props){
    const [isAdmin, setIsAdmin] = useState(false)

    console.log(props.id)
    useEffect(()=>{
        const AdminCheck = async ()=>{
          const docRef = doc(db, "users", `${props.id}`);
          const docSnap = await getDoc(docRef);
          setIsAdmin(docSnap.data().admin)
          console.log(isAdmin)
        }
        AdminCheck()        
    },[])

    return(
        <div>
            {isAdmin && <button></button>}
        </div>
    )
}