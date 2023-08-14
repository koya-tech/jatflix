import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MovieRow } from './components/MovieRow';
import { Banner } from './components/Banner';
import { Nav } from './components/Nav';
import { requests } from './request';

function App() {
  return (
    <div className="App">
      <Banner />
      <Nav />
      <MovieRow
        title="NETFLIX ORIGUINALS"
        fetchUrl={requests.feachNetflixOriginals}
        isLargeMovieRow
      />
      <MovieRow title="Top Rated" fetchUrl={requests.feactTopRated} />
      {/* <MovieRow title="Action Movies" fetchUrl={requests.feactActionMovies} /> */}
      <MovieRow title="Comedy Movies" fetchUrl={requests.feactComedyMovies} />
      {/* <MovieRow title="Horror Movies" fetchUrl={requests.feactHorrorMovies} /> */}
      <MovieRow title="Romance Movies" fetchUrl={requests.feactRomanceMovies} />
      <MovieRow title="Documentaries" fetchUrl={requests.feactDocumentMovies} />
    </div>
  );
}

export default App;
