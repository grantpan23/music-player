import { async } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { auth,db } from "../../firebase";

export default function User(props){
    
    const [clicked,setClicked] = useState(false)
    const [deactivate, setDeactivate] = useState(false)
    const [activate,setActivate] = useState(false)

    useEffect(()=>{
        const  setAdmin = async() =>{
            const userDef = doc(db, "users", `${props.id}`)
            await updateDoc(userDef, {
                admin: true
              });
              window.location.reload();
        }
        if(clicked){setAdmin()}
    },[clicked])

    useEffect(()=>{
        const  setDeactivate = async() =>{
            const userDef = doc(db, "users", `${props.id}`)
            await updateDoc(userDef, {
                disable: true
              });
              window.location.reload();
        }
        if(deactivate){setDeactivate()}
    },[deactivate])

    useEffect(()=>{
        const  ActiveUser = async() =>{
            const userDef = doc(db, "users", `${props.id}`)
            await updateDoc(userDef, {
                disable: false
              });
              window.location.reload();
        }
        if(activate){ActiveUser()}
    },[activate])

    return(
        <div>
            <p>{props.name}</p>
            <p>{props.email}</p>
            {props.admin ? <p>admin</p> : 
                <button onClick={(e)=> {
                    setClicked(true) 
                    props.setChange(true)}}>set admin
                </button>
            }
            {props.disable ?                 
                <button onClick={(e)=> {
                    setActivate(true) 
                    props.setChange(true)}}>Active user
                </button> : 
                <button onClick={(e)=> {
                    setDeactivate(true) 
                    props.setChange(true)}}>deactivate
                </button>
            }
        </div>
    )
}