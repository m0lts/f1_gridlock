import React, { useState, useEffect } from "react";
import { StaticRaceInformation, DynamicRaceInformation } from "../../hooks/raceInfoErgast";
import "../../assets/global.css";
import BelgianFlag from "../../assets/interface/media/flags/belgium_flag.svg";
import BelgianCircuit from "../../assets/interface/media/circuits/belgium_track.png";

export default function GrandPrix() {
    const { round, 
            flag,
            circuitName,
            circuitTrackImg,
            raceName,
            grandPrixName } = StaticRaceInformation();

    const { raceStartTime } = DynamicRaceInformation();

    return (
        <section className="nextRaceBanner">
            <div className="heroTop">
                <img src={flag} alt={circuitName + " Flag"} className="flagFill"/>
                <h3>Round {round}</h3>
            </div>
            <div className="bannerHeroMain">
                <div className="heroMainLeft">
                    <div>
                        <h1 className="raceCountry">{circuitName}</h1>
                        <h2 className="grandPrixName">{grandPrixName}</h2>
                        
                    </div>
                    <div className="timerBox">
                        <h3 className="timerTitle">Lights Out:</h3>
                        <h1 className="timer">{raceStartTime}</h1>
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