import { useEffect, useState } from "react";
import { circuitNames, circuitFlags, circuitTracks } from "../data/circuitInfo";
import React from "react";

export function StaticRaceInformation() {
    const [round, setRound] = useState('');
    const [flag, setFlag] = useState('');
    const [circuitName, setCircuitName] = useState('');
    const [circuitTrackImg, setCircuitTrackImg] = useState('');
    const [raceName, setRaceName] = useState('');
    const [grandPrixName, setGrandPrixName] = useState('');

    useEffect(() => {
        async function fetchStaticData() {
            try {
                // CALL API
                const response = await fetch('https://ergast.com/api/f1/current/next.json');
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0];
                // SET ROUND NUMBER
                const roundNumber = deconstructedAPI.round;
                setRound(roundNumber);

                // SET FLAG
                const circuitCountry = deconstructedAPI.Circuit.Location.country;
                const countryFlag = circuitFlags[circuitCountry];
                setFlag(countryFlag);

                // SET CIRCUIT IMG
                const raceName = deconstructedAPI.raceName;
                const circuitTrack = circuitTracks[raceName];
                setCircuitTrackImg(circuitTrack);

                // SET CIRCUIT NAME
                const circuitName = circuitNames[raceName];
                setCircuitName(circuitName);

                // SET GRAND PRIX NAME
                const grandPrixName = deconstructedAPI.raceName;
                setGrandPrixName(grandPrixName);

                // SET SECONDARY CIRCUIT NAME
                const technicalCircuitName = deconstructedAPI.Circuit.circuitName;
                setRaceName(technicalCircuitName);
            } catch (error) {
                console.error(error);
            }
        }
        fetchStaticData();
        
    }, []);
    
    return {
        round,
        flag,
        circuitName,
        circuitTrackImg,
        raceName,
        grandPrixName,
    }
}

export function DynamicRaceInformation() {
    const [raceStartTime, setRaceStartTime] = useState('');
    const [qualifyingStartTime, setQualifyingStartTime] = useState('');

    useEffect(() => {
        async function fetchDynamicData() {
        try {
            const response = await fetch('https://ergast.com/api/f1/current/next.json');
            const data = await response.json();
            const deconstructedAPI = data.MRData.RaceTable.Races[0];

        
            // SET RACE TIME COUNTDOWN
            const raceTime = deconstructedAPI.time;
            let raceTimeString = raceTime.split("");
            raceTimeString.pop();
            raceTimeString[1]++;
            const returnedRaceTime = raceTimeString.join("");
    
            const raceDate = deconstructedAPI.date;
            const raceCountdownDate = new Date(`${raceDate} ${returnedRaceTime}`);
    
            let distance, days, hours, minutes, seconds;
            const addZero = (num) => {
                if (num < 10) {
                    return "0" + num;
                } else {
                    return num;
                }
            };
    
            const initialRaceDistance = raceCountdownDate - new Date().getTime();
            days = Math.floor(initialRaceDistance / (1000 * 60 * 60 * 24));
            hours = Math.floor((initialRaceDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((initialRaceDistance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((initialRaceDistance % (1000 * 60)) / 1000);
    
            const initialRaceStartTime = addZero(days) + ":" + addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    
            setRaceStartTime(initialRaceStartTime);
    
            const raceCountdown = setInterval(function() {
                let now = new Date().getTime();
                distance = raceCountdownDate - now;
                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
                if (distance < 0) {
                    clearInterval(raceCountdown);
                    setRaceStartTime('00:00:00');
                } else {
                    setRaceStartTime(addZero(days) + ":" + addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds));
                }
            }, 1000);

            // SET QUALIFYING TIME COUNTDOWN
            const qualiTime = deconstructedAPI.Qualifying.time;
            let qualiTimeString = qualiTime.split("");
            qualiTimeString.pop();
            qualiTimeString[1]++;
            const returnedQualiTime = qualiTimeString.join("");

            const qualiDate = deconstructedAPI.Qualifying.date;
            const qualiCountdownDate = new Date(`${qualiDate} ${returnedQualiTime}`);

            const initialDistance = qualiCountdownDate - new Date().getTime();
            days = Math.floor(initialDistance / (1000 * 60 * 60 * 24));
            hours = Math.floor((initialDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((initialDistance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((initialDistance % (1000 * 60)) / 1000);

            const initialQualifyingStartTime = addZero(days) + ":" + addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);

            setQualifyingStartTime(initialQualifyingStartTime);

            const qualiCountdown = setInterval(function() {
                let now = new Date().getTime();
                distance = qualiCountdownDate - now;
                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (distance < 0) {
                    clearInterval(qualiCountdown);
                    setQualifyingStartTime('00:00:00:00');
                } else {
                    setQualifyingStartTime(addZero(days) + ":" + addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds));
                }
            }, 1000);
        }
        catch (error) {
            console.error(error);
        }
    } 
    fetchDynamicData();

    }, []);
    return {
        raceStartTime,
        qualifyingStartTime
    }
}

