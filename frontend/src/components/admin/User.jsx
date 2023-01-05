import { async } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { auth,db } from "../../firebase";

export default function User(props){
    
    const [clicked,setClicked] = useState(false)

    useEffect(()=>{
        const  setAdmin = async() =>{
            const userDef = doc(db, "users", `${props.id}`)
            await updateDoc(userDef, {
                admin: true
              });
        }
        if(clicked){setAdmin()}
    },[clicked])


    return(
        <div>
            <p>{props.name}</p>
            <p>{props.email}</p>
            {props.admin ? <p>admin</p> : 
                <button onClick={(e)=> {
                    setClicked(true) 
                    props.setChange(true)}}>set admin
                </button>}
        </div>
    )
}