import React, {useState, useEffect, useRef} from 'react'
import "./Row.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForward';
import axios from '../API/axios';
import MovieTrailer from "./Movie_trailers/index"
import CircularProgress from '@mui/material/CircularProgress';

function Row({title,fetchUrl,id,isLarge, isSearch, content}) {
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    const [Movies, setMovies] = useState([])
    const rowRef = useRef(null)
    const [modalVisibility,setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});
    const [loading, setLoading] = useState(true);
    // const [loadedImg, setImgLoaded] = useState(0)
    const scrollRight = () => {
        if (rowRef.current) {
            rowRef.current.scrollLeft -= window.innerWidth +4;
        }
    }
    const scrollLeft = () => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += window.innerWidth +4;
        }
    }

    useEffect(()=>{
        if (!isSearch){
            async function fetchdata(){
                setLoading(true);
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results)
                return request
            }
            fetchdata()
        } else {
            setMovies(content);
            console.log("-->content at Row.jsx : ",content)
        }
    },[fetchUrl,content])
    useEffect(()=>{
        // if (loadedImg == Movies.length) {
            setLoading(false);
        // }
    },[Movies.length])
    const handleClick = (movie) =>{
        setModalVisibility(true);
        setMovieSelection(movie);
    }
    // const handleImageLoad = () => {
    //     setImgLoaded((prev)=>prev+1)
    // }

  return (
    <section className="row">
            {/** TITLE */}
            <h2>{title}</h2>
            <div className="slider">
                
                {loading && <CircularProgress  color="secondary" />}
                <div className="slider__arrow-left" ><span className="arrow" onClick={scrollRight}/*{()=>{document.getElementById(id).scrollLeft-=(window.innerWidth+4)}}*/><ArrowBackIosIcon/></span></div>
                <div id={id} ref={rowRef} className="row__posters">
                    {/**SEVERAL ROW__POSTER */}
                    {Movies.map(movie=>(
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            src={`${baseUrl}${isLarge?movie.backdrop_path : movie.poster_path}`}
                            className={`row__poster ${isLarge && "row__posterLarge"}` }
                            // onLoad={handleImageLoad}
                            loading='lazy'
                            alt={movie.name}
                        />
                    ))}
                    
                </div>
                <div className="slider__arrow-right" ><span className="arrow" onClick={scrollLeft}/*{()=>{document.getElementById(id).scrollLeft+=(window.innerWidth-4)}}*/><ArrowForwardIosIcon/></span></div>
            </div>
            {/* <h2>{movieSelected.title}{ movieSelected.name}</h2> */}
            {modalVisibility && <MovieTrailer {...movieSelected} setModalVisibility={setModalVisibility}/>}
        </section>
  )
}

export default Row