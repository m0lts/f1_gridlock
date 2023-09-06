import React from "react";
import { useState } from "react";
import '../../assets/global.css';
import { circuitInfo } from "../../data/circuitInfo";
import { NextRaceInformation } from "../../hooks/ergastAPIQueries";

export default function CircuitInfo({...props}) {

    // MUST UPDATE THE STATES WITH API WHEN BACK ONLINE
    const { circuitName } = NextRaceInformation();

    const [traction, setTraction] = useState(circuitInfo['Singapore'].traction);
    const [trackEvo, setTrackEvo] = useState(circuitInfo['Singapore']['track evolution']);
    const [braking, setBraking] = useState(circuitInfo['Singapore'].braking);
    const [asphaltAb, setAsphaltAb] = useState(circuitInfo['Singapore']['asphalt abrasion']);
    const [tyreStress, setTyreStress] = useState(circuitInfo['Singapore']['tyre stress']);
    const [downforce, setDownforce] = useState(circuitInfo['Singapore'].downforce);


    return (
        <div>
            <h1>
                {props.title}
            </h1>
            <div className="cicuitInfoCont">
                <p>Traction: {traction}</p>
                <p>Track Evolution: {trackEvo}</p>
                <p>Braking: {braking}</p>
                <p>Asphalt Abrasion: {asphaltAb}</p>
                <p>Tyre Stress: {tyreStress}</p>
                <p>Downforce: {downforce}</p>
            </div>
        </div>
    )
}