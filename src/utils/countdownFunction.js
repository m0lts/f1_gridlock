import { useState, useEffect } from "react";
import { NextRaceInformation } from "../hooks/ergastAPIQueries";

export function CountdownFunction() {

    // Define race countdown state
    const [raceCountdown, setRaceCountdown] = useState('');
    const [qualifyingCountdown, setQualifyingCountdown] = useState('');

    // Retrieve race start time from NextRaceInformation hook located in ergastAPIQueries.js file
    const { raceTime, 
            raceDate,
            qualifyingTime,
            qualifyingDate } = NextRaceInformation();

    // Countdown function
    const createCountdown = (time, date, setState) => {
        // Edit time string to account for BST
        let raceTimeString = time.split("");
        raceTimeString.pop();
        raceTimeString[1]++;
        const returnedRaceTime = raceTimeString.join("");
        // Concatenate date and time strings
        const raceCountdownDate = new Date(`${date} ${returnedRaceTime}`);
        // Calculate distance
        let distance, days, hours, minutes, seconds;
        const now = new Date().getTime();
        // Helper function to add leading zero to single-digit numbers
        const addZero = (num) => (num < 10 ? "0" + num : num);

        if (now > raceCountdownDate) {
            // Race has already started
            setState('00:00:00');
        } else {
            distance = raceCountdownDate - now;
            days = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setState(
                addZero(days) + ":" + addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
            );

            const interval = setInterval(function() {
                if (distance <= 0) {
                    clearInterval(interval);
                    setState('00:00:00');
                } else {
                    distance -= 1000; // Subtract 1 second
                    days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setState(
                        addZero(days) + ":" + addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
                    );
                }
            }, 1000);
            return interval;
        }
    };

    useEffect(() => {
        // Call the countdown function and store the interval ID
        const interval = createCountdown(raceTime, raceDate, setRaceCountdown);
        const interval2 = createCountdown(qualifyingTime, qualifyingDate, setQualifyingCountdown);

        // Cleanup function to clear interval on component unmount
        return () => {
            clearInterval(interval);
            clearInterval(interval2);
        };
    }, [raceTime, raceDate, qualifyingTime, qualifyingDate]);

    return { raceCountdown, qualifyingCountdown }


}