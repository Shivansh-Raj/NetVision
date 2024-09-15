
import React, {useState} from 'react';
import requests from '../API/requests.js';
import Nav from './Nav.jsx';
import Banner from './Banner.jsx';
import Row from './Row.jsx';

function Home() {
  const [searching, setSearching] = useState(false)

  return (
    <>
      <Nav  setSearching = {setSearching} searching={searching}/>
      {!searching && (
        <>
          <Banner/>
          {/* <Movie_trailers/> */}
          <Row
            title="Trending Now"
            id="TN"
            isLarge
            fetchUrl={requests.fetchTrending}
          />
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
