import { useState, useEffect } from "react";
import { NextRaceInformation } from "./ergastAPIQueries";

export function WeatherForecast() {
    const { longitude, latitude } = NextRaceInformation();

    useEffect(() => {
        async function getWeatherForecast() {
            try {
                // Convert latitude and longitude to numbers (floats)
                const lat = parseFloat(latitude);
                const lon = parseFloat(longitude);

                // Check if latitude and longitude are valid numbers
                if (!isNaN(lat) && !isNaN(lon)) {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,precipitation`);
                    const data = await response.json();
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getWeatherForecast();

    }, [longitude, latitude]);
}