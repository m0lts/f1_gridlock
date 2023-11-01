import { useState, useEffect } from "react";
import { NextRaceInformation } from "./ErgastAPIQueries";

// Edit time string to account for BST
// REMOVE THIS FUNCTION WHEN BST ENDS
const editTime = (time) => {
    let timeString = time.split("");
    timeString[1]++;
    const returnedTime = timeString.join("");
    return returnedTime;
}

export function WeatherForecast() {
    const { longitude, latitude, qualifyingDate, qualifyingTime, raceDate, raceTime } = NextRaceInformation();
    // Clean race and qualifying times
    const removeZFromQualiTime = editTime(qualifyingTime).replace("Z", "");
    const cleanQualiTime = removeZFromQualiTime.slice(0, -3);
    const qualiDateAndTime = `${qualifyingDate}T${cleanQualiTime}`;
    const removeZFromRaceTime = editTime(raceTime).replace("Z", "");
    const cleanRaceTime = removeZFromRaceTime.slice(0, -3);
    const raceDateAndTime = `${raceDate}T${cleanRaceTime}`;
    const raceFinishDateAndTime = `${raceDate}T${editTime(cleanRaceTime)}`;

    // Set states for weather forecast
    const [qualiPrecipitation, setQualiPrecipitation] = useState('');
    const [qualiCloudcover, setQualiCloudcover] = useState('');
    const [raceStartPrecipitation, setRaceStartPrecipitation] = useState('');
    const [raceStartCloudcover, setRaceStartCloudcover] = useState('');
    const [raceFinishPrecipitation, setRaceFinishPrecipitation] = useState('');
    const [raceFinishCloudcover, setRaceFinishCloudcover] = useState('');

    // Get weather forecast
    useEffect(() => {
        async function getWeatherForecast() {
            try {
                // Convert latitude and longitude to numbers (floats)
                const lat = parseFloat(latitude);
                const lon = parseFloat(longitude);

                // Check if latitude and longitude are valid numbers
                if (!isNaN(lat) && !isNaN(lon)) {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation_probability,cloudcover`);
                    const data = await response.json();
                    const qualiTimeIndex = data.hourly.time.findIndex(time => time === qualiDateAndTime);
                    const raceStartTimeIndex = data.hourly.time.findIndex(time => time === raceDateAndTime);
                    const raceFinishTimeIndex = data.hourly.time.findIndex(time => time === raceFinishDateAndTime);

                    if (raceStartTimeIndex || raceFinishTimeIndex || qualiTimeIndex !== -1) {
                        // Use the index to access the precipitation value for the desired time
                        const qualiPrecipitationValue = data.hourly.precipitation_probability[qualiTimeIndex];
                        const qualiCloudcoverValue = data.hourly.cloudcover[qualiTimeIndex];
                        const raceStartPrecipitationValue = data.hourly.precipitation_probability[raceStartTimeIndex];
                        const raceStartCloudcoverValue = data.hourly.cloudcover[raceStartTimeIndex];
                        const raceFinishPrecipitationValue = data.hourly.precipitation_probability[raceFinishTimeIndex];
                        const raceFinishCloudcoverValue = data.hourly.cloudcover[raceFinishTimeIndex];
                        setQualiPrecipitation(qualiPrecipitationValue);
                        setQualiCloudcover(qualiCloudcoverValue);
                        setRaceStartPrecipitation(raceStartPrecipitationValue);
                        setRaceStartCloudcover(raceStartCloudcoverValue);
                        setRaceFinishPrecipitation(raceFinishPrecipitationValue);
                        setRaceFinishCloudcover(raceFinishCloudcoverValue);
                      } else {
                        console.log(`Desired time (${qualiDateAndTime} or ${raceDateAndTime}) not found in the data.`);
                      }
                }
            } catch (error) {
                console.log(error);
            }
        }

        getWeatherForecast();

    }, [longitude, latitude]);

    return {
        qualiPrecipitation,
        qualiCloudcover,
        raceStartPrecipitation,
        raceStartCloudcover,
        raceFinishPrecipitation,
        raceFinishCloudcover
    }
}