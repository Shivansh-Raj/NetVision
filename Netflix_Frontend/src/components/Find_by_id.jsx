import React, { useEffect, useState } from 'react'
import API_KEY from '../API/API_KEY';
import Row from './Row';
import api from './frontToBackend/api';
function Find_by_id({ids, idkey, title, canDelete}) {
    const [details, setDetails] = useState([]);
    const [ready, setReady] = useState(false)
    const [counter, setcounter] = useState(0)
    const getDetails = async(id) => {
        // console.log(id)
        try {
            setcounter((prev)=>prev+1)
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
            // DELTING unfetchable movies and shows 
            // api.delete(`/api/UserHistory/${id}`)
            // .then ((response) => {
            //     setFadeOutIndex(show_id); 
            //     setTimeout(() => {
            //         setMovies((prev) => prev.filter(movie => movie.id != show_id));
            //     }, 500);
            //     console.log("Successfully Deleted!!", response)
            // }) .catch ((error) => {
            //     setFadeOutIndex(-1);
            //     console.error("Unable to Delete ", error)
            // })
            setcounter((prev)=>prev+1)
        }
    }
    useEffect (()=>{
        let idsArray = [];
        idsArray = Array.isArray(ids) ? ids : [ids];
        // console.log(typeof ids)
        try{
            if (idsArray && idsArray.length > 0) { 
                idsArray.forEach((id) => {
                    getDetails(id[idkey]); 
                });
            }
        } catch (error) {
            console.log(error)
        }
    },[ids])
  return (
    <>
        {ids.length == counter && 
            <Row 
                title={title} 
                id="TN" 
                isSearch 
                canDelete={canDelete? true:false}
                content={details}
            />
        }
    </>
  )
}

export default Find_by_id