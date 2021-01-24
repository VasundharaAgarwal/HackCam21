import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import background_img from "../agrio_logo.png"

export default function LandingPage(props) {
    const buttonStyle = {
        borderRadius: "10px",
        backgroundColor: "#f2ebd8",
        fontFamily: "Quicksand",
        fontWeight: "bold",
    }
    return( <div id="landing-page">
    <div id="header-text">Agrio</div>
    <img id="background-img" src={background_img}>
    </img>
    <div id="intro-text-1">
        I am a..
    </div>
    <Button className="user-type-button" onClick={() => props.setPage(4)} variant="contained" style={buttonStyle}>Buyer</Button>
    <Button className="user-type-button" onClick={() => props.setPage(7)} variant="contained" style={buttonStyle}>Seller</Button>
</div>);
   
}