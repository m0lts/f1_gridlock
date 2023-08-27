import React from "react";
import "../../assets/global.css";
import { LastRoundResult } from "../../hooks/lastRoundResult";

export default function PreviousRaceResult({...props}) {

    // Retrieve last round result from LastRoundResult hook
    const result = LastRoundResult();

    return (
        <>
        <h1>{props.title}</h1>
        <ul>
            {/* map over result array and print to component */}
            {result && result.map((driver, index) => (
            <li key={index}>
                {driver.position} - {driver.driverNumber} - {driver.lastNames} - {driver.team} - {driver.laps} - {driver.time}
            </li>
            ))}
        </ul>
        </>
    )
}