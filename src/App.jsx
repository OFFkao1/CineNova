import React from 'react';
import './App.css';
import Row from './components/Row/Row';
import requests from './request';
import Banner from './components/Banner/Banner';
import Navbar from './components/Navbar/Navbar';



function App() {
  return (
    <div className='app' style={{ overflowX: 'hidden', margin: 0, padding: 0 }}>

      <Navbar />

      <Banner />

      <Row title="Client Nova ORIGINALS" fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow />

      <Row title="Trending now" fetchUrl={requests.fetchTrending} />

      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />

      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />

      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />

      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />

      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />

      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  )
}

export default App