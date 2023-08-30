import React from "react";
import "../../assets/global.css";
import { PreviousRaceInformation } from "../../hooks/ergastAPIQueries";

export default function PreviousRaceResult({...props}) {

    // Retrieve last round result from LastRoundResult hook
    const result = PreviousRaceInformation();

    return (
        <>
        <h1>{props.title}</h1>
            <ul>
                {/* Render last round result */}
                {result.position.map((position, index) => (
                    <li key={index}>
                        {position} - {result.driverNumber[index]} - {result.lastNames[index]} - {result.team[index]}
                    </li>
                ))}
            </ul>
        </>
    )
}