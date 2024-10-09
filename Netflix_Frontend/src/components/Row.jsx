import React, {useState, useEffect, useRef} from 'react'
import "./Row.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForward';
import axios from '../API/axios';
import MovieTrailer from "./Movie_trailers/index"
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import api from './frontToBackend/api';

function Row({title,fetchUrl,id,isLarge, isSearch, content, canDelete}) {
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    const [Movies, setMovies] = useState([])
    const rowRef = useRef(null)
    const [modalVisibility,setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingImg, setImageLoading] = useState([]);
    const [fadeOutIndex, setFadeOutIndex] = useState(null);
    const imageRefs = useRef([]);
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
    

    const checkCachedImages = () => {
        // The .complete property is used to check if an image (or any media element) has finished loading. It returns a boolean value: true (if has fully loaded either successfully or from cache)
        imageRefs.current.forEach((imgRef, index) => {
          const movie = Movies[index]; // Get the current movie
          try {
            if (movie.poster_path && imgRef && imgRef.complete) {
                handleImageLoad(index); 
            } 
          } catch (error) {
            console.log(error);
          }
        });
      };

    useEffect(()=>{
        setLoading(true);
        if (!isSearch){
            async function fetchdata(){
                setLoading(true);
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results)
                setImageLoading(Array(request.data.results.length).fill(true))
                setLoading(false);
                return request
            }
            fetchdata()
        } else {
            setMovies(content);
            setImageLoading(Array(content.length).fill(true))
            setLoading(false)
            checkCachedImages();
        }
    },[fetchUrl, content, isSearch])
    // useEffect(()=>{
    //     if (loadedImg == Movies.length) {
    //         setLoading(false);
    //         console.log(loadedImg)
    //     } 
    // },[loadedImg])
    const handleClick = (movie) =>{
        setModalVisibility(true);
        setMovieSelection(movie);
    }
    const handleImageLoad = (index) => {
        setImageLoading((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = false; 
            return updatedLoading;  
        });
    };
    const handleImageError = (index) => {
        setImageLoading((prev) => {
            const updatedLoading = [...prev];
            updatedLoading[index] = true; 
            return updatedLoading;  
        });
    };
    const RemoveFromQ = (show_id) => {
        console.log(`Sending DELETE request for show ID: ${show_id}`);  
        api.delete(`/api/UserHistory/${show_id}`)
        .then ((response) => {
            setFadeOutIndex(show_id); 
            setTimeout(() => {
                setMovies((prev) => prev.filter(movie => movie.id != show_id));
            }, 500);
            console.log("Successfully Deleted!!", response)
        }) .catch ((error) => {
            setFadeOutIndex(-1);
            console.error("Unable to Delete ", error)
        })
    }
    

  return (
    <section className="row">
            {/** TITLE */}
            <h2>{title}</h2>
            <div className="slider">
                
                <div className="slider__arrow-left" ><span className="arrow" onClick={scrollRight}/*{()=>{document.getElementById(id).scrollLeft-=(window.innerWidth+4)}}*/><ArrowBackIosIcon/></span></div>
                <div id={id} ref={rowRef} className="row__posters">


                    {/**SEVERAL ROW__POSTER */}
                    {loading? 
                        Array.from({length:10},(_,index) => {
                            <Box key={index} className={`row__poster ${isLarge && "row__posterLarge"} `}>
                                <Skeleton
                                    variant="rectangular"
                                    width={isLarge ? 300 : 100}
                                    height="100%"
                                    animation="wave"
                                    sx={{ bgcolor: 'grey.700' }}
                                />
                            </Box>
                        }
                    ):(Movies.map((movie,index)=>(
                        <Box key = {index} className={`row__poster ${isLarge && "row__posterLarge"} ${fadeOutIndex === movie.id ? 'fade-blur' : ''}` }>
                                {loadingImg[index] && <Skeleton 
                                    onClick={() => handleClick(movie)}
                                    variant="rectangular" 
                                    width={isLarge ? 300 : 100  }
                                    height='100%'
                                    animation="wave" 
                                    sx={{ bgcolor: 'grey.700' }} 
                                    />}
                                
                                <img
                                    ref = {(el) => (imageRefs.current[index] = el)}
                                    onClick={() => handleClick(movie)}
                                    // src ={`${baseUrl}${isLarge ? movie.backdrop_path : movie.poster_path}?t=${new Date().getTime()}`}
                                    src={`${baseUrl}${isLarge?movie.backdrop_path : movie.poster_path}`}
                                    onLoad={() => handleImageLoad(index)}
                                    style={{ display: loadingImg[index] ? 'none' : 'block' }}
                                    // loading='lazy'
                                    alt={movie.name}
                                />
                                {canDelete && <CancelIcon onClick = {() => RemoveFromQ(movie.id)}/>}
                            </Box> 
                        )))
                    }
                    
                </div>
                

                <div className="slider__arrow-right" ><span className="arrow" onClick={scrollLeft}/*{()=>{document.getElementById(id).scrollLeft+=(window.innerWidth-4)}}*/><ArrowForwardIosIcon/></span></div>
            </div>
            {/* <h2>{movieSelected.title}{ movieSelected.name}</h2> */}
            {modalVisibility && <MovieTrailer {...movieSelected} setModalVisibility={setModalVisibility}/>}
        </section>
  )
}

export default Row