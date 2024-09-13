import React, { useEffect, useState } from 'react'
import Row from './Row.jsx';
import "./Row.css"
import requests from '../API/requests.js';
import API_KEY from '../API/API_KEY.jsx';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import request_by_id from '../API/request_by_id.js';
// URL: https://api.themoviedb.org/3/search/keyword?query=stranger&api_key=api_key

function Search({content}) {
    const [Movies, setMovies] = useState([])
    const [ready,setReady] = useState(false)
    const [genre, setGenre] = useState([])
    const baseUrl = `https://api.themoviedb.org/3/search/multi?query=${content}&api_key=${API_KEY}`
    
    useEffect (()=>{
        async function fetchData(){
            setReady(false)
            const response = await fetch(baseUrl);
            try {
                const data = await response.json(); 
                setMovies(data.results);
                setGenre(data.results[0].genre_ids)
                console.log(data.results[0].genre_ids)
                genre = genre.filter((gen)=>{
                    try {
                        console.log("--->",request_by_id[gen]["title"])
                        return true;
                    } catch {
                        console.log("--->Failed for", gen)
                        return false
                    }
                    // console.log(gen)
                })
            } catch(error) {
                console.log("Error in Fetching the data")
            } finally {
                setReady(true)
            }
        }
        fetchData()
    },[content])    
  return (
    <>
        {ready && Movies.length != 0? (<><Row
            title={`Showing result for ${content}`}
            id="TN"
            // isLarge
            isSearch
            content={Movies}
        />
        {genre.map((gen) => (
            <h1 key={gen.key}>{gen.key}</h1>
            // <Row
            //     key={gen.id}
            //     title={`${request_by_id[{gen}]["title"]}`}
            //     id="TN"
            //     fetchUrl={`${request_by_id[{gen}]["url"]}`}
            // />
        ))}
        </>
        
        ):(<>
            {(ready && Movies.length === 0)?
                (<>
                <h2>Looking for "{content}"? We dont have that but you might like:</h2>
                    <Row
                    title=""
                    id="TN"
                    fetchUrl={requests.fetchTrending}
                /></>
                )
                :
                (<CircularProgress/>)                
            }
        </>)}
    </>
  )
}

export default Search
