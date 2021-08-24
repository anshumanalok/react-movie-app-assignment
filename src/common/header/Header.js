import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import './Header.css';

const Header = (props) => {
    let loggedInStatus = false;

    useEffect(()=>{
        let localStorageObject = JSON.parse(localStorage.getItem('persist:root'));
        let accessToken = JSON.parse(localStorageObject.auth);
        loggedInStatus = accessToken.isLoggedIn;
    },[localStorage])
    return (
        <div className="header-container">
            <img src={require("../../assets/logo.svg")} alt="LOGO" className="logo"/>
            <div className="button-container">
                {props.isBookingEnabled?<Button variant="contained" color="primary" className="book-show-button" onClick={props.goToBooking}>Book Show</Button>:""}
                <Button variant="contained">{loggedInStatus?"Logout":"Login"}</ Button>
            </div>
        </div>
    );
};

export default Header;