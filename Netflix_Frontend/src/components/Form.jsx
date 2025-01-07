import React, {useState, useEffect} from 'react'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./frontToBackend/constants";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import api from "./frontToBackend/api"


function Form({method, route, email, username, password}) {
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const submit = async () => {
        setLoading(true);
        try {
            const res = await api.post(route, {username, password, email})
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                // alert(username+"  "+password)
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            if (method == "login") {
                alert("Invalid Credentials!")
            } else {
                alert("User with the same username already exist!")
            }
        } finally {
            setLoading(false)
        }
    }
    const handleSubmit = () => {
        submit();
    }
    // useEffect(() => {
    //     submit();
    // }, [username, password, email, method, route]); 
    return (
        <>
            {loading && <><CircularProgress/><br/></>}
            <button className="app__getStarted" onClick={handleSubmit}>{method == "login"? "Login": "SignUp"}</button>
        </>
    )
}

export default Form