import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header'
import './Home.css';

const Home = (props) => {
    const [upComingMovies, setUpComingMovies] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8085/api/v1/movies?page=1&limit=10&status=PUBLISHED")
        .then(response => response.json())
        .then((result) => {
            setUpComingMovies(result.movies);
        })
    },[]);
    return (
        <div className="home-container">
            <Header baseUrl={props.baseUrl} />
            <div className="home-heading">
                Upcoming Movies
            </div>
            <div className="home-grid-list-container">
            <GridList cellHeight={250} cols={6} className="home-grid-list">
                {upComingMovies.map(movie => {
                   return <GridListTile key={movie.id} className="home-grid-list-tile">
                        <img src={movie.poster_url} alt={movie.title} />
                        <GridListTileBar
                            title={movie.title}
                            className="home-grid-list-tile-bar"
                        />
                    </GridListTile>
                })}
            </GridList>
            </div>
        </div>
    );
};

export default Home;