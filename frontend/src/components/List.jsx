import { useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useEffect } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function List(){
    const [isPrivate, setIsPrivate]=useState(true)
    const [listName, setListName] = useState("")
    const [userID, setID]=useState("")
    const navigate = useNavigate()

    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              setID(uid)
            } 
          });
          
    },[])
  
    const handleCreate = async (e) =>{
        e.preventDefault()
        await setDoc(doc(db, "listmaster", listName), {
                private: isPrivate,
                user: userID
          });
        // await setDoc(doc(db, "cities", "LA"), {
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA"
        //   });
    }

    const handleRoute = () =>{
        navigate("/list")
    } 
    

    return(
        <div className="login" onSubmit={handleCreate}>
            <form >
                <input type="text" placeholder="list name" onChange={(e)=>{setListName(e.target.value)}} />
                <div onClick={(e)=>{setIsPrivate(!isPrivate)}}>{isPrivate ? "set public" : "set private" }</div>
                <button>Create</button>
            </form>
            <button onClick={handleRoute}>showList</button>
        </div>
    )
}