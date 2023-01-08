import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import React from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";



const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = React.createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [users,setUsers]= useState([])

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  useEffect(()=>{
    const loadData = async () =>{
        let list =[]
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            list.push(doc.data().name)
        });
        setUsers(list)             
    }
    loadData()
},[])

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch, users }}>
      {children}
    </AuthContext.Provider>
  );
};