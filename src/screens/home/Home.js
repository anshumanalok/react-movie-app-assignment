import { Button, Card, CardActions, CardContent, GridList, GridListTile, GridListTileBar, TextField, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react';
import Header from '../../common/header/Header'
import './Home.css';

const styles = theme =>({
    title:{
        color: theme.palette.primary.light,
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit
    },
    nameField:{
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit
    },
    genereSelection:{
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit
    },
    artistSelection:{
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit
    },
    releaseStartDateField:{
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit
    },
    releaseEndDateField:{
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit
    },
    applyButton:{
        minWidth: 240,
        maxWidth: 240,
        margin: theme.spacing.unit * 2
    }
})

const Home = (props) => {
    const {classes} = props;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
        };
    const [upComingMovies, setUpComingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [genere, setgenere] = useState([]);
    const [selectedGenere, setSelectedGenere] = useState([]);
    const [artist, setArtist] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState([]);
    const [url, setUrl] = useState("http://localhost:8085/api/v1/movies?page=1&limit=10&status=RELEASED");

    useEffect(()=>{
        fetch("http://localhost:8085/api/v1/movies?page=1&limit=10&status=PUBLISHED")
        .then(response => response.json())
        .then((result) => {
            setUpComingMovies(result.movies);
        })
        fetch(url)
        .then(response => response.json())
        .then((result) => {
            setReleasedMovies(result.movies);
        })
        fetch("http://localhost:8085/api/v1/genres")
        .then(response => response.json())
        .then((result) => {
            let genereArray = [];
            result.genres.map(genereIterator => 
                genereArray.push(genereIterator)
            );
            setgenere(genereArray);
        })
        fetch("http://localhost:8085/api/v1/artists?page=1&limit=20")
        .then(response => response.json())
        .then((result) => {
            let artistsArray = [];
            result.artists.map(artistsIterator => 
                artistsArray.push(artistsIterator.first_name + " " + artistsIterator.last_name)
            );
            setArtist(artistsArray);
        })
    },[url]);

    const handleChange = event => {
        setSelectedGenere(event.target.value);
    };

    const handleArtistChange = event => {
        setSelectedArtist(event.target.value);
    };

    const search = () => {
        let title = document.getElementById("movie-name").value;
        let genre = selectedGenere.join();
        let artist = selectedArtist.join();
        let releaseStartdate = document.getElementById("Release-Date-Start").value;
        let releaseEnddate = document.getElementById("Release-Date-End").value;
        setUrl("http://localhost:8085/api/v1/movies?page=1&limit=10&title="+title+"&status=RELEASED&start_date="+releaseStartdate+"&end_date="+releaseEnddate+"&genre="+genre+"&artists="+artist)
    };

    const detailsPageRedirection = (data) => {
        props.history.push({
            pathname: "/movie/" + data.id,
        })
    }

    return (
        <div className="home-container">
            <Header baseUrl={props.baseUrl} isBookingEnabled={false}/>
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
            <div className="home-page-released-movies-container">
                <div className="home-page-released-movies-list-container">
                    <GridList cellHeight={350} cols={6} className="home-released-grid-list">
                    {releasedMovies.map(movie => {
                    return <GridListTile key={movie.id} className="home-released-grid-list-tile" onClick={(e)=>{e.preventDefault();detailsPageRedirection(movie);}}>
                            <img src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar
                                title={movie.title}
                                subtitle={"Release Date: " + new Date(movie.release_date).toDateString()}
                                className="home-released-grid-list-tile-bar"
                            />
                    </GridListTile>
                })}
            </GridList>
                </div>
                <div className="home-page-released-movies-search-pannel">
                    <Card className="search-pannel-card">
                        <CardContent className="search-pannel-card-content">
                            <Typography className={classes.title}>
                                FIND MOVIES BY:
                            </Typography>
                            <form>
                                <TextField 
                                    id="movie-name"
                                    label="Movie Name"
                                    className={classes.nameField}
                                />
                                <FormControl className={classes.genereSelection}>
                                    <InputLabel htmlFor="select-multiple-genere-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        value={selectedGenere}
                                        onChange={handleChange}
                                        input={<Input id="select-multiple-genere-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {genere.map(genereItem => { 
                                            return <MenuItem key={genereItem.id} value={genereItem.genre}>
                                                <Checkbox checked={selectedGenere.indexOf(genereItem.genre) > -1} />
                                                <ListItemText primary={genereItem.genre} />
                                            </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.artistSelection}>
                                    <InputLabel htmlFor="select-multiple-artist-checkbox">Artist</InputLabel>
                                    <Select
                                        multiple
                                        value={selectedArtist}
                                        onChange={handleArtistChange}
                                        input={<Input id="select-multiple-artist-checkbox" />}
                                        renderValue={selected => selected.join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {artist.map(artistItem => { 
                                            return <MenuItem key={artistItem} value={artistItem}>
                                                <Checkbox checked={selectedArtist.indexOf(artistItem) > -1} />
                                                <ListItemText primary={artistItem} />
                                            </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="Release-Date-Start"
                                    label="Release Date Start"
                                    type="date"
                                    className={classes.releaseStartDateField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                <TextField
                                    id="Release-Date-End"
                                    label="Release Date End"
                                    type="date"
                                    className={classes.releaseEndDateField}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </form>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" className={classes.applyButton} onClick={search}>
                                    Apply
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);