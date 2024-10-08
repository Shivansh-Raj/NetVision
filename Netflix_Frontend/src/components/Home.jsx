
import React, {useState, useEffect} from 'react';
import requests from '../API/requests.js';
import Nav from './Nav.jsx';
import Banner from './Banner.jsx';
import Row from './Row.jsx';
import api from './frontToBackend/api.js';
import Find_by_id from './Find_by_id.jsx';

function Home() {
  const [searching, setSearching] = useState(false)
  const [history, setHistory] = useState([])
  const [based_on_watch, set_watch_based] = useState({})
  // useEffect =(()=>{
  //   const observer = new IntersectionObserver (
  //     (entries) => {
  //       entries.forEach(entry)
  //     }
  //   )
  // },[])
  useEffect(()=>{
    api.get(`/api/UserHistory/0`)
    .then((response)=>{
      console.log("History watch : ", response.data)
      // if (localStorage.getItem("history")) {
      //   setHistory(localStorage.getItem("history"));
      // } else {
        setHistory(response.data)
      //   localStorage.setItem("history",response.data)
      // }
    })
    .catch((error)=>{
      console.error("Error in fetching history",error)
    })
    api.get(`/api/get_for_you`)
    .then((response)=>{
      // console.log("Based on your watches : ", Object.values(response.data))
      set_watch_based(response.data)
      // if (localStorage.getItem("history")) {
      //   setHistory(localStorage.getItem("history"));
      // } else {
        // setHistory(response.data)
      //   localStorage.setItem("history",response.data)
      // }
    })
    .catch((error)=>{
      console.error("Dont have anything for you right now : ",error)
    })
  },[])

  return (
    <>
      <Nav  setSearching = {setSearching} searching={searching}/>
      {!searching && (
        <>
          <Banner/>
          <Row
            title="Trending Now"
            id="TN"
            isLarge
            fetchUrl={requests.fetchTrending}
          />
          {history.length>0 && <Find_by_id
          title = "Continue Watching"
          canDelete
          idkey='showId'
          ids={history}
          />}
          {based_on_watch.length>0 && <Find_by_id
          title = "Based on your watch"
          idkey='id'
          ids={based_on_watch}
          />}
          <Row
            title="Top Rated"
            id="TR"
            fetchUrl={requests.fetchTopRated}
          />
          <Row
            title="Action Movies"
            id="AM"
            fetchUrl={requests.fetchActionMovies}
          />
          <Row
            title="Comedy Movies"
            id="CM"
            fetchUrl={requests.fetchComedyMovies}
          />
          <Row
            title="Horror Movies"
            id="HM"
            fetchUrl={requests.fetchHorrorMovies}
          />
          <Row
            title="Thriller Movies"
            id="RM"
            fetchUrl={requests.fetchThriller}
          />
          <Row
            title="Documentaries"
            id="DM"
            fetchUrl={requests.fetchDocumentaries}
          />
        </>
      )}
    </>
  )
}

export default Home
