import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import {useState} from 'react' ;
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading , setLoading] = useState(false) ;
  const {setAuthUser} = useAuthContext()
  //Making a logout Function that is async
  const logout = async() =>{
    setLoading(true) ;
    try {
        const res = await fetch("http://localhost:8005/api/auth/logout" , {
            method : "POST" ,
            headers : {"Content-Type" : "application/json"}
        });
        const data = await res.json() ;
        if(data.error){
            throw new Error(data.error) ;
        }
        localStorage.removeItem("chat-user");
        //After logout updating the context value So that we can login to the Login page 
        setAuthUser(null) ;
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false) ;
    }
  }
  return {loading , logout} ;
}

export default useLogout

// calling this function inside the LogoutButton.jsx 