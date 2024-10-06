import React, {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import api from './frontToBackend/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './frontToBackend/constants'
import {jwtDecode} from "jwt-decode"

function ProtectedRoute({children}) {
    const [isAuthorized, setAuthorized] = useState(null);

// If there's an error during the auth() call (e.g., no token, or an invalid token), useEffect catches the error and sets isAuthorized to false, which prevents the user from accessing the protected content.
    useEffect (()=> {
        auth().catch(()=>setAuthorized(false))
    },[])
    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            // this is goig to send a response to this route mentioned below and going to check if the response was successful or not
            const res = await api.post("api/token/refresh/",{
                refresh : refreshToken
            });
            if ( res.status === 200) { // 200 http response for a success
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthorized(true)
            } else {
                console.log("Refresh Failed!")
                setAuthorized(false)
            }
        } catch(error) {
            console.log(error)
            setAuthorized(false)
        }
    };

    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ;
        const now = Date.now()/1000;
        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setAuthorized(true)
        }
    };
    if (isAuthorized === null) {
        return (
            <div>Loading</div>
        )
    }   
  return  isAuthorized? children: <Navigate to = "/login"/>
}

export default ProtectedRoute