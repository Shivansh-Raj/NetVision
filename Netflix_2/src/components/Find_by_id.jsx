import React, { useEffect, useState } from 'react'
import API_KEY from '../API/API_KEY';
import Row from './Row';
function Find_by_id({ids}) {
    const [details, setDetails] = useState([]);
    const [ready, setReady] = useState(false)
    const getDetails = async(id) => {
        console.log(id)
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            if(!response.ok) {
                response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
            }
            if (response.ok ) {
                const data = await response.json()
                setDetails((prev) => [
                    ...prev,
                    data
                ])
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect (()=>{
        if (ids && ids.length > 0) { 
            ids.forEach((id) => {
                console.log(id.id); 
                getDetails(id.id); 
            });
        }
        console.log(details)
    },[ids])
    useEffect(() => {
        console.log(details);
    }, [details]);
  return (
    <>
        {details.length > 10 && <Row title="Similar Movies and Shows" id="TN" isSearch content={details}/>}
    </>
  )
}

export default Find_by_id