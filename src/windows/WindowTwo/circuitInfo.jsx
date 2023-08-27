import React from "react";
import { useState } from "react";
import '../../assets/global.css';
import { circuitInfo } from "../../data/circuitInfo";

export default function CircuitInfo({...props}) {

    // MUST UPDATE THE STATES WITH API WHEN BACK ONLINE

    const [traction, setTraction] = useState(circuitInfo['Bahrain'].traction);
    const [trackEvo, setTrackEvo] = useState(circuitInfo['Bahrain']['track evolution']);
    const [braking, setBraking] = useState(circuitInfo['Bahrain'].braking);
    const [asphaltAb, setAsphaltAb] = useState(circuitInfo['Bahrain']['asphalt abrasion']);
    const [tyreStress, setTyreStress] = useState(circuitInfo['Bahrain']['tyre stress']);
    const [downforce, setDownforce] = useState(circuitInfo['Bahrain'].downforce);


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