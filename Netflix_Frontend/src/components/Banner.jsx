import React, {useEffect, useState} from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from '../API/axios'
import requests from '../API/requests'
import MovieTrailer from "./Movie_trailers/index"
import './Banner.css';

function Banner() {
  const [movie, setmovie] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n) + "..." : str;
  }
  const handleClick = (movie) =>{
    setModalVisibility(true);
  }
  useEffect(()=>{
      async function fetch_data() {
          const request = await axios.get(requests.fetchNetflixOriginals)
          setmovie(request.data.results[
            Math.floor(Math.random() * request.data.results.length -1)
          ]);
          
          return request;
      }
      fetch_data();
  },[])
  return (
    <header className="banner"
        style={{
            backgroundImage : `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
            backgroundPosition : "top center",
            backgroundSize: "cover",
        }}
    >
      <div className="banner__contents">
                {/**Tittle */}
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                
                <h1 className="banner__description">{truncate(movie?.overview || "", 150)}</h1>
                {/*Description*/}
                
                <div className="banner__buttons">
                    <button className="banner__button play"><PlayArrowIcon />Play</button>
                    <button className="banner__button info" onClick ={()=>handleClick(movie)}><InfoOutlinedIcon fontSize="small"  paddingright={20} marginright={100}/><div className="space"></div> More Information</button>
                    
                </div>
                {/**DIV > 2 BUTTONS */}

            </div>   
            <div className="banner--fadeBottom"/>
            {modalVisibility && <MovieTrailer {...movie} setModalVisibility={setModalVisibility}/>}
    </header>
  );
}

export default Banner;
