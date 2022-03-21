import React from "react";
import { BsShieldFill } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import "./hero.scss";

const HealthIcon = () => {
    return (
        <div className="icon-container m-2">
            <BsHeartFill className="hp-icon" />
            <h3 className="icon-value">45</h3>
        </div>
    );
};

const ArmorClassIcon = () => {
    return (
        <div className="icon-container m-2">
            <BsShieldFill className="ac-icon" />
            <h3 className="icon-value">12</h3>
        </div>
    );
};

const Hero = () => {
    return (
        <div className="hero-card m-3 d-flex flex-column justify-content-center align-items-center">
            <div className="hero-stats d-flex justify-content-between w-100">
                <ArmorClassIcon />
                <HealthIcon />
            </div>
            <h1 className="hero-name m-0">Balum</h1>
            <h2 className="player-name">Alex</h2>
        </div>
    );
};

export default Hero;
