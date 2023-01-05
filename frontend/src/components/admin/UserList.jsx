import { useEffect } from "react";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useState } from "react";
import { auth,db } from "../../firebase";
import User from "./User";

export default function UserList(){
    const [users,setUsers]= useState([])
    const [isClicked,setIsClicked] = useState(false)


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
    },[isClicked])

    const userElement= users.map(user => (
        <User key={user.id} id={user.id} admin={user.admin} email={user.email} name={user.name} setChange ={setIsClicked}/>
    ))

    return(
        <div>
            {userElement}
        </div>
    )
}