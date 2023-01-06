import { useNavigate } from "react-router-dom"
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ListShow(){
    const navigate = useNavigate();
    const [lists,setList] = useState([])
    const [privateList, setPrivateList]=useState([])
    const [userID, setID]=useState("")


    const handleRoute = () => {
        navigate("/main")
    }

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
  

    useEffect(()=>{
        const loadData = async () =>{
            let list =[]
            const q = query(collection(db, "listmaster"), where("private", "==", false));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            });
            setList(list)
           
        }
        // const loadUserListData = async () =>{
        //     let list =[]
        //     const q = query(collection(db, "listmaster"), where("user", "==", userID));
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //         list.push({id: doc.id, ...doc.data()})
        //     });
        //     setPrivateList(list)
        // }
        // loadUserListData()
        loadData()
    },[])

    useEffect(()=>{
        const loadData = async () =>{
            let list =[]
            const q = query(collection(db, "listmaster"), where("user", "==", userID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            });
            setPrivateList(list)
           
        }
        loadData()
    },[userID])

    const liustDOM =lists.map(item => <div key={item.id}>{item.id}</div>)
    const liustDOM2 =privateList.map(item => <div key={item.id}>{item.id}</div>)

    return(
        <div>
            <button onClick={handleRoute}>return</button>
            <div>
                <h1>public lists</h1>
                {liustDOM}
            </div>
            <div>
                <h1>ur private list</h1>
                {liustDOM2}
            </div>
        </div>
    )
}