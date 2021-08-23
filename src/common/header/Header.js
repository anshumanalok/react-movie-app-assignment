import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import './Header.css';

const Header = (props) => {
    let loggedInStatus = false;
    let isBookingPage = false;
    useEffect(()=>{
        let localStorageObject = JSON.parse(localStorage.getItem('persist:root'));
        let accessToken = JSON.parse(localStorageObject.auth);
        loggedInStatus = accessToken.isLoggedIn;
        isBookingPage = props.baseUrl.includes("/movie");
    },[localStorage,props])
    return (
        <div className="header-container">
            <img src={require("../../assets/logo.svg")} alt="LOGO" className="logo"/>
            <div className="button-container">
                {isBookingPage?<Button variant="contained" color="primary" className="book-show-button">Book Show</Button>:""}
                <Button variant="contained">{loggedInStatus?"Logout":"Login"}</ Button>
            </div>
        </div>
    );
};

export default Header;