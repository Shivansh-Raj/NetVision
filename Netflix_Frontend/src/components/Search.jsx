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
    const [genreDictionary, setgenreDictionary] = useState({})
    const baseUrl = `https://api.themoviedb.org/3/search/multi?query=${content}&include_adult=false&api_key=${API_KEY}&page=1`
    // &language=jv-JP
    let temp;
    useEffect (()=>{
        // async function reduceToDict(genre) {
        //     temp = genre.reduce((acc, gen) => {
        //         try {
        //             acc[gen] = gen; 
        //             console.log("--->", gen);
        //         } catch (error) {
        //             console.log("--->Failed for", gen, error.message);
        //         }
        //         return acc;
        //     }, {}); 
        
        //     setgenreDictionary(temp);
        //     console.log(genreDictionary)
        //     // return genreDictionary; 
        // }
        
        async function fetchData() {
            
            setReady(false);
            try {
                const response = await fetch(baseUrl);
                const data = await response.json();
                
                setMovies(data.results);
                let genreIds = data.results[0].genre_ids;
                // console.log(genreIds)
                genreIds = (genreIds.filter((gen) => {
                    try {
                        // console.log("--->", request_by_id[gen]["title"]);
                        request_by_id[gen]["title"]
                        return true; // Keep this item in the array if no error occurs
                    } catch (error) {
                        console.log("Error occurred for genre:", gen);
                        return false; // Remove this item from the array if an error occurs
                    }
                }));
                setGenre(genreIds);
                // await reduceToDict(genreIds); 
                // console.log(genre)
        
            } catch (error) {
                console.log("Error in Fetching the data", error);
            } finally {
                setReady(true);
            }
        }
        
        fetchData()
    },[content])    
  return (
    <div style={{ padding: '100px 0 '}}>
        {ready && Movies.length != 0? (<><Row
            title={`Showing result for ${content}`}
            id="TN"
            // isLarge
            isSearch
            content={Movies}
        />
        <Row
            title={`Showing result for ${content}`}
            id="TN"
            isLarge
            isSearch
            content={Movies}
        />
        {genre.map((gen) => (
            // <h1 key={ gen}>{gen}</h1>
            <Row
                key={gen}
                title={`${request_by_id[`${gen}`]["title"]}`}
                id="TN"
                fetchUrl={`${request_by_id[`${gen}`]["url"]}`}
            />
        ))}
        </>
        
        ):(<>
            {(ready && Movies.length === 0)?
                (<>
                <h2>Looking for "{content}"? We dont have that but you might like:</h2>
                    <Row
                    title="Trending on Netflix"
                    id="TN"
                    fetchUrl={requests.fetchTrending}
                />
                {genre.map((gen) => (
                    // <h1 key={ gen}>{gen}</h1>
                    <Row
                        key={gen}
                        title={`${request_by_id[`${gen}`]["title"]}`}
                        id="TN"
                        fetchUrl={`${request_by_id[`${gen}`]["url"]}`}
                    />
                ))}
                </>
                
                )
                :
                (<CircularProgress/>)                
            }
        </>)}
    </div>
  )
}

export default Search
