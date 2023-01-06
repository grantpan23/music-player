import { useEffect } from "react";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { useState } from "react";
import { auth,db } from "../../firebase";
import User from "./User";
import { useNavigate } from "react-router-dom";

export default function UserList(){
    const [users,setUsers]= useState([])
    const [isClicked,setIsClicked] = useState(false)
    const navigate=useNavigate()


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
        <User key={user.id} id={user.id} disable = {user.disable} admin={user.admin} email={user.email} name={user.name} setChange ={setIsClicked}/>
    ))

    return(
        <div>
            {userElement}
            <button onClick={(e)=>{navigate("/main")}}>go back</button>
        </div>
    )
}