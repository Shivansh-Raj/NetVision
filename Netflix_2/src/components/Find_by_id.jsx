import React, { useEffect, useState } from 'react'
import API_KEY from '../API/API_KEY';
import Row from './Row';
function Find_by_id({ids, idkey, title}) {
    const [details, setDetails] = useState([]);
    const [ready, setReady] = useState(false)
    const getDetails = async(id) => {
        console.log(id)
        try {
            let response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
            if(!response.ok) {
                response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
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
        console.log(ids)
        try{
            if (ids && ids.length > 0) { 
                ids.forEach((id) => {
                    // console.log(id[idkey]); 
                    getDetails(id[idkey]); 
                });
            }
        } catch (error) {
            console.log(error)
        }
    },[ids])
  return (
    <>
        {details.length == ids.length && <Row title={title} id="TN" isSearch content={details}/>}
    </>
  )
}

export default Find_by_id