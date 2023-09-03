import React from "react";
import '../../assets/global.css';
import { WeatherForecast } from "../../hooks/openMeteoQueries";
import { NextRaceInformation } from "../../hooks/ergastAPIQueries";
import { CountdownFunction } from "../../utils/countdownFunction";

export default function WeatherComponent({...props}) {

    // Import qualifying coundown from CountdownFunction
    const { qualifyingCountdown } = CountdownFunction();

    // Import the weather forecast data from the OpenMeteo API
    const { qualiPrecipitation,
        qualiCloudcover,
        raceStartPrecipitation,
        raceStartCloudcover,
        raceFinishPrecipitation,
        raceFinishCloudcover } = WeatherForecast();

    // Import times from NextRaceInformation hook
    const { qualifyingTime, raceTime } = NextRaceInformation();

    // Function to clean up the times from the API - REMOVE TIMESTRING[1]++ WHEN BST IS OVER
    const cleanTimes = (time) => {
        let timeString = time.split("");
        timeString[1]++;
        let returnedTime = timeString.join("");
        returnedTime.replace("Z", "");
        const cleanedTime = returnedTime.slice(0, -4);
        return cleanedTime;
    }

    // Function to create second race hour - REMOVE ONE TIMESTRING[1]++ WHEN BST IS OVER
    const raceSecondHourTime = (time) => {
        let timeString = time.split("");
        timeString[1]++;
        timeString[1]++;
        let returnedTime = timeString.join("");
        returnedTime.replace("Z", "");
        const cleanedTime = returnedTime.slice(0, -4);
        return cleanedTime;
    }

    return (
        <>
        <h1>
            {props.title}
        </h1>
        <ul className="weatherForecast">
            {qualifyingCountdown !== "00:00:00" && (
            <li>
                <h2>Qualifying</h2>
                <h3>{cleanTimes(qualifyingTime)}</h3>
                <p>Precipitation: {qualiPrecipitation}%</p>
                <p>Cloudcover: {qualiCloudcover}%</p>
            </li>
            )}
            <li>
                <h2>Race</h2>
                <div className="raceFirstHourForecast">
                    <h3>{cleanTimes(raceTime)}</h3>
                    <p>Precipitation: {raceStartPrecipitation}%</p>
                    <p>Cloudcover: {raceStartCloudcover}%</p>
                </div>
                <div className="raceSecondHourForecast">
                    <h3>{raceSecondHourTime(raceTime)}</h3>
                    <p>Precipitation: {raceFinishPrecipitation}%</p>
                    <p>Cloudcover: {raceFinishCloudcover}%</p>
                </div>
            </li>
        </ul>
        </>
    )
}