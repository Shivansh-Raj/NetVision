import React, { useEffect, useState } from 'react'
// import movieTrailer from 'movie-trailer';
import API_KEY from "../../API/API_KEY"
import CancelIcon from '@mui/icons-material/Cancel';
import Youtube from "react-youtube"
import "./Movie_trailer.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import api from '../frontToBackend/api';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForward';

function Movie_trailers({id,backdrop_path,poster_path,title,overview,name,release_date,first_air_date,vote_average,setModalVisibility}) {
  // const baseUrl =  "https://www.youtube.com/watch?v=";
  const ImgbaseUrl = "https://image.tmdb.org/t/p/original/";
  const [video_no, setVideo_no] = useState(0)
  const [total_trailers, setTotal_trailers] = useState(0);
  const opts = {
    height : "300",
    width : "100%",
    playerVars : {
        autoplay : 0,
        rel: 0, 
        modestbranding: 1,   
        iv_load_policy: 3,
    },
  }
  const randomPorcentaje = ()=>{
      return Math.floor(Math.random() * 100);
  }
  const handleVideoError = (event) => {
    console.log("Error loading video:", event);
    alert("Video cannot be played. Please try another video.");
  };
  
  const [trailerUrl ,setTrailerUrl] = useState("") 
  useEffect (() => {
    console.log(id,"    ",video_no)
    // if(trailerUrl){
    //   setTrailerUrl('')
    // } else {
      const fetchTrailer = async() => {
        try {
          const trailerBaseUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
          const tvTrailerBaseUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`
          let response = await fetch(trailerBaseUrl);
          
          if (!response.ok) {
            console.log(`Movie trailer fetch failed with status ${response.status}. Checking TV show...`);
      
            response = await fetch(tvTrailerBaseUrl);
          }
            const data = await response.json()
          if (response.ok && data.results && data.results.length >= 1) {
            console.log("TV trailer found");
            setTotal_trailers(data.results.length);
            setTrailerUrl(data.results[video_no].key);
          } else {
            console.error("No trailer found in both movie and TV");
          }
        }catch (error) {
          console.error("Error fetching the trailer data: ", error);
        }
      };
      if (id) {
        fetchTrailer();
      }
    // }
  },[id, video_no])

  const getRecommendations = () => {
    api.get(`/api/recommendations/${id}`)
    .then(response => (
      console.log(response.data)
    ))
    .catch(error => console.log(error))
  }
  const next_trailer = () => {
    if (total_trailers > 0) {
      setVideo_no((prevVideoNo) => (prevVideoNo + 1) % total_trailers);
    }
  }  
  const prev_trailer = () => {
    if (total_trailers > 0) {
      setVideo_no((prevVideoNo) => (prevVideoNo - 1 + total_trailers) % total_trailers);
    }
  }
  return (
    <div className="presentation" role="presentation">
            <div className="wrapper-modal">
                <div className="modal">
                    {trailerUrl ? <Youtube videoId={`${trailerUrl}`} onError={(event)=>handleVideoError(event)} opts={opts}/> :                     
                    (<img
                      className="modal__poster-img"
                      // src={`${ImgbaseUrl}${backdrop_path?backdrop_path:poster_path}`}
                      src={`${ImgbaseUrl}${poster_path}`}
                      />)}
                      <span onClick={()=>setModalVisibility(false)}className="modal-close"><CancelIcon/></span>
                      <div className="trailer__controls" >
                        <span className="arrow__left" onClick={prev_trailer}><ArrowBackIosIcon/></span>
                        <span className="arrow__right" onClick={next_trailer}><ArrowForwardIosIcon/></span>
                      </div>
                    <h3>{`${trailerUrl}---${id}`}</h3>

                    <div className="modal__content">
                        <p className="modal__details"><span className="modal__user-perc">{randomPorcentaje
                        ()}% for you</span> {release_date ? release_date : first_air_date}</p>
                        <button className="banner__button play" onClick = {getRecommendations}><PlayArrowIcon />Play</button>
                        <h2 className="modal__title">{title ? title : name}</h2>
                        <p className="modal__overview">{overview}</p>
                        <p className="modal__overview">Vote Average: {vote_average}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Movie_trailers