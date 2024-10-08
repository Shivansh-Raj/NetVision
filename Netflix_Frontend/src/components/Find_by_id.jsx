import React, { useEffect, useState } from 'react'
import API_KEY from '../API/API_KEY';
import Row from './Row';
function Find_by_id({ids, idkey, title, canDelete}) {
    const [details, setDetails] = useState([]);
    const [ready, setReady] = useState(false)
    const [counter, setcounter] = useState(0)
    const getDetails = async(id) => {
        console.log(id)
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
            console.log(error)
        }
    }
    useEffect (()=>{
        let idsArray = [];
        idsArray = Array.isArray(ids) ? ids : [ids];
        console.log(typeof ids)
        // if(!Array.isArray(ids)){
        // }else {
        //     const idsArray = ids;
        // }
        try{
            if (idsArray && idsArray.length > 0) { 
                idsArray.forEach((id) => {
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
        {details.length == counter && 
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