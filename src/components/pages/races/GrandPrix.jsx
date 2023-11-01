import { useState, useEffect } from "react";
import { NextRaceInformation } from "../../../hooks/ErgastAPIQueries";
import { CountdownFunction } from "../../../utils/CountdownFunction";
import { useUsername } from "../../../hooks/UsernameHook";
import './grand_prix.css'

export default function GrandPrix() {

    // Get next race information from NextRaceInformation hook located in ergastAPIQueries.jsx
    const { round, 
            flag,
            circuitName,
            circuitTrackImg,
            raceName,
            grandPrixName } = NextRaceInformation();

    // Get countdown timer to race start from CountdownHook hook located in countdownFunctions.jsx
    const { raceCountdown } = CountdownFunction();

    // Get username from useUsername hook located in usernameHook.jsx
    const { username } = useUsername();

    return (
        <section className="nextRaceBanner">
            <div className="heroTop">
                <img src={flag} alt={circuitName + " Flag"} className="flagFill"/>
                <h3>Round {round}</h3>
            </div>
            <div className="bannerHeroMain">
                <div className="heroMainLeft">
                    <div>
                    {username ? (
                        <p>Welcome, {username}!</p>
                    ) : (
                        <p>You are not logged in.</p>
                    )}
                        <h1 className="raceCountry">{circuitName}</h1>
                        <h2 className="grandPrixName">{grandPrixName}</h2>
                        
                    </div>
                    <div className="timerBox">
                        <h3 className="timerTitle">Lights Out:</h3>
                        <h1 className="timer">{raceCountdown}</h1>
                    </div>
                </div>
                <div className="heroMainRight">
                    <h2 className="raceName">{raceName}</h2>
                    <img className="circuitImg" src={circuitTrackImg} alt={circuitName + " Track"} />
                </div>
            </div>
        </section>
    )
}