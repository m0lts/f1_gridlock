import React from "react";
import '../../assets/global.css';
import { WeatherForecast } from "../../hooks/openMeteoQueries";
import { NextRaceInformation } from "../../hooks/ergastAPIQueries";

export default function WeatherComponent({...props}) {


    return (
        <>
        <h1>
            {props.title}
        </h1>
            <WeatherForecast />
        </>
    )
}