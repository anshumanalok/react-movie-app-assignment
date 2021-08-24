import { Typography, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Header from '../../common/header/Header';
import Rate from '../../common/header/Rate';
import './Details.css'

const Details = (props) => {
    const movieId = props.match.params.id;
    const [movieData, setMovieData] = useState({});
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState([]);
    const [duration, setDuration] = useState("");
    const [artist, setArtist] = useState([]);
    const [rating, setRating] = useState(0);
    useEffect(()=>{
        fetch("http://localhost:8085/api/v1/movies/"+movieId)
        .then(response => response.json())
        .then((result) => {
            setTitle(result.title);
            setGenre(result.genres);
            setDuration(result.duration);
            setArtist(result.artists);
            setMovieData(result);
        })
    },[])
    
    const opts = {
        height: '380',
        width: '100%',
        playerVars: {
        autoplay: 1,
      },
    }

   const onReady = (event) => {
    event.target.pauseVideo();
  }
    
    const goBack = () =>{
        props.history.push({
            pathname: "/"
        })
    }

    const videoLink = () => {
        if(movieData.trailer_url === undefined || movieData.trailer_url === null ){
            return null;
        }
        var video_id = movieData.trailer_url.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if(ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
    }

    const goToBooking = () => {
        props.history.push({
            pathname: "/bookshow/" + props.match.params.id,
        })
    }

    return (
        <div className="detail-page-container">
            <Header baseUrl={props.baseUrl} isBookingEnabled={true} goToBooking={goToBooking}/>
            <Typography className="back-button" onClick={goBack}>&#60; Back to Home</Typography>
            <div className="details-container">
                <div className="details-left-pannel">
                    <img src={movieData.poster_url} alt={movieData.title} className="poster"/>
                </div>
                <div className="details-middle-pannel">
                    <Typography variant='h2'>{title}</Typography>
                    <Typography className="details">
                        <span className="bold">Genre:&nbsp;</span>
                        {genre!==undefined||genre!==null||genre.length!==0?genre.join():""}
                    </Typography>
                    <Typography className="details">
                        <span className="bold">Duration:&nbsp;</span>
                        {duration}
                    </Typography>
                    <Typography className="details">
                        <span className="bold">Release Date:&nbsp;</span>
                        {new Date(movieData.release_date).toDateString()}
                    </Typography>
                    <Typography className="details">
                        <span className="bold">Rating:&nbsp;</span>
                        {movieData.rating}
                    </Typography>
                    <Typography className="details-plot">
                        <span className="bold">Plot:&nbsp;</span>
                        (<a href={movieData.wiki_url}>Wiki Link</a>)&nbsp;{movieData.storyline}
                    </Typography>
                    <Typography className="details-trailer">
                        <span className="bold">Trailer:&nbsp;</span>
                    </Typography>
                    <YouTube videoId={videoLink()} opts={opts} onReady={onReady}/>
                </div>
                <div className="details-right-pannel">
                    <Typography className="details-Rating">
                        <span className="bold">Rate this movie:</span>
                    </Typography>
                    <div className="rate">
                        <Rate rating={rating} onRating={(rate) => setRating(rate)} />
                    </div>
                    <Typography className="details-artist">
                        <span className="bold">Artist:</span>
                    </Typography>
                    <GridList cellHeight={200} cols={2} className="detail-artist-grid-list">
                    {artist.map(artistItem => {
                    return <GridListTile key={artistItem.id} className="detail-artist-grid-list-tile">
                            <img src={artistItem.profile_url} alt={artistItem.first_name} className="detail-artist-img"/>
                            <GridListTileBar
                                title={artistItem.first_name + " " + artistItem.last_name}
                                className="detail-artist-grid-list-tile-bar"
                            />
                    </GridListTile>
                    })}
                </GridList>
                </div>
            </div>
        </div>
    );
};

export default Details;