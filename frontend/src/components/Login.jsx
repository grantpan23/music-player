import { useState } from "react"
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import jwt_decode from "jwt-decode";
import { GoogleAuthProvider, sendEmailVerification  } from 'firebase/auth'


export default function Login(){

    const [err,setErr]=useState(false)
    const [sameNameErr,setSameNameErr]=useState(false)
    const [email,setEmail]=useState("")
    const [isLogIn, setIsLogIn]=useState(true)
    const [password,setPassword]=useState("")
    const [userName,setuserName]= useState("")
    const [missName,setMissName]=useState(false)
    const [missEmail,setMissEmail]=useState(false)
    const [missPass,setMissPass]=useState(false)
    const [miss,setMiss]=useState(false)
   
    
    const navigate=useNavigate()

    const {dispatch,users} = useContext(AuthContext)
     
    // function handleCallbackResponse(response) {
    //     try{
    //         console.log("Encoded JWT ID token: " + response.credential);
    //         var userObject = jwt_decode(response.credential);
    //         console.log(userObject);
    //         alert('Successful login!');
    //     }
    //     catch(e) {
    //         console.log("Error with Google login: " + e);
    //     }
    // }

    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //       client_id: "791977041679-ht5uepsie5ai84k5gd677sm91fu1umrs.apps.googleusercontent.com",
    //       callback: handleCallbackResponse
    //     })

    //     google.accounts.id.renderButton(
    //         document.getElementById("googleBtn"),
    //         {theme: "outline", size: "large"}
    //     );
    //   }, []);

    const handleRegister = async (e) =>{
        e.preventDefault()

        if(!users.includes(userName) && userName!="" && email!="" && password!=""){
            try {
                //check if email is already in database
                const res= await createUserWithEmailAndPassword(auth, email, password)
                await setDoc(doc(db, "users", res.user.uid), {
                    admin: false,
                    disable:false,
                    email: email,
                    name: userName
                });
                await sendEmailVerification(res.user);
              dispatch({type: "LOGIN", payload:res.user})
              navigate("/")
            } catch (e) {
                setErr(true)
              console.error("Error adding document: ", e);
            }
        } else if( userName=="" && email!="" && password!=""){setMissName(true);setMissEmail(false);setMissPass(false);setSameNameErr(false);setMiss(false)}
        else if(!users.includes(userName) && userName!="" && email=="" && password!=""){setMissName(false);setMissEmail(true);setMissPass(false);setSameNameErr(false);setMiss(false)}
        else if(!users.includes(userName) && userName!="" && email!="" && password==""){setMissName(false);setMissEmail(false);setMissPass(true);setSameNameErr(false);setMiss(false)}
        else if(users.includes(userName) && userName!="" && email!="" && password!=""){setMissName(false);setMissEmail(false);setMissPass(false);setSameNameErr(true);setMiss(false)}
        else {setMissName(false);setMissEmail(false);setMissPass(false);setSameNameErr(false);setMiss(true)}
    }

    const handleLogIn = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch({type: "LOGIN", payload:user})
          alert('Successful login!')
          navigate("/main")
        })
        .catch((error) => {
            setErr(true)
        });
    }

    return(
        <div className="login">
            { isLogIn ?            
            <form onSubmit={handleLogIn}>
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <div id="googleBtn"></div>
                <div onClick={e => setIsLogIn(false)}>Register</div>
                {err && <span>Wrong email or password</span>}
            </form> :
            <form onSubmit={handleRegister}>
            <input  placeholder="user name" onChange={e => setuserName(e.target.value)}/>
             <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
             <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
             <button type="submit">Register</button>
             <div onClick={e => setIsLogIn(true)}>Log in</div>
             {err && <span>Wrong email or password</span>}
             {sameNameErr && <span>User name already exist</span>}
             {missEmail && <span>Missing email</span>}
             {missName && <span>Missing username</span>}
             {missPass && <span>Missing Password</span>}
             {miss && <span>Missing more than 1 thing</span>}
            </form>
            }
        </div>
    )
}