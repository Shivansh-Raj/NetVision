import React, {useState, useEffect, useRef} from 'react'
import "./Row.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForward';
import axios from '../API/axios';
import MovieTrailer from "./Movie_trailers/index"
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

function Row({title,fetchUrl,id,isLarge, isSearch, content}) {
    const baseUrl = "https://image.tmdb.org/t/p/original/";
    const [Movies, setMovies] = useState([])
    const rowRef = useRef(null)
    const [modalVisibility,setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingImg, setImageLoading] = useState([]);
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
    
    useEffect(() => {
        
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      }, []);

    useEffect(()=>{
        if (!isSearch){
            async function fetchdata(){
                setLoading(true);
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results)
                setImageLoading(Array(request.data.results.length).fill(true))
                console.log(Array(request.data.results.length).fill(true));
                return request
            }
            fetchdata()
        } else {
            setMovies(content);
            console.log("-->content at Row.jsx : ",content)
        }
    },[fetchUrl,content])
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
            return updatedLoading
        })
    }
    

  return (
    <section className="row">
            {/** TITLE */}
            <h2>{title}</h2>
            <div className="slider">
                
                {/* {loading && <CircularProgress  color="secondary" />} */}
                <div className="slider__arrow-left" ><span className="arrow" onClick={scrollRight}/*{()=>{document.getElementById(id).scrollLeft-=(window.innerWidth+4)}}*/><ArrowBackIosIcon/></span></div>
                <div id={id} ref={rowRef} className="row__posters">
                {/* {loading && Array.from({ length: 10 }, (_, index) => (
                    <Box key = {index} className={`row__poster ${isLarge && "row__posterLarge"}` }>
                        <Skeleton 
                            variant="rectangular" 
                            width={isLarge ? 300 : 100  }
                            height='100%'
                            animation="wave" 
                            sx={{ bgcolor: 'grey.700' }} 
                        />
                    </Box> 
                ))} */}


                    {/**SEVERAL ROW__POSTER */}
                    {Movies.map((movie,index)=>(
                        <Box key = {index} className={`row__poster ${isLarge && "row__posterLarge"}` }>
                            {loadingImg[index] && <Skeleton 
                                variant="rectangular" 
                                width={isLarge ? 300 : 100  }
                                height='100%'
                                animation="wave" 
                                sx={{ bgcolor: 'grey.700' }} 
                            />}
                            
                            <img
                                onClick={() => handleClick(movie)}
                                src={`${baseUrl}${isLarge?movie.backdrop_path : movie.poster_path}`}
                                onLoad={setTimeout(() => handleImageLoad(index),100)}
                                style={{ display: loadingImg[index] ? 'none' : 'block' }}
                                loading='lazy'
                                alt={movie.name}
                            />
                        </Box> 
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