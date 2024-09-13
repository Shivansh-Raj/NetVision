
import React, {useState} from 'react';
import requests from './API/requests.js';
import Nav from './components/Nav.jsx';
import Banner from './components/Banner.jsx';
import Movie_trailers from './components/Movie_trailers/index.jsx';
import Row from './components/Row.jsx';
function App() {
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
            title="Romance  Movies"
            id="RM"
            fetchUrl={requests.fetchRomanceMovies}
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

export default App
