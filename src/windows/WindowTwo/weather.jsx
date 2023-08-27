import React from "react";
import '../../assets/global.css';

export default function WeatherForecast({...props}) {
    return (
        <h1>
            {props.title}
        </h1>
    )
}