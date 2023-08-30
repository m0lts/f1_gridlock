import { useState, useEffect } from "react";
import { circuitNames, circuitFlags, circuitTracks } from "../data/circuitInfo";

// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************

// Get the next Race Weekend's Information
export function NextRaceInformation() {

    // Define Schedule States
    const [practiceOneTime, setPracticeOneTime] = useState('');
    const [practiceOneDate, setPracticeOneDate] = useState('');
    const [practiceTwoTime, setPracticeTwoTime] = useState('');
    const [practiceTwoDate, setPracticeTwoDate] = useState('');
    const [practiceThreeTime, setPracticeThreeTime] = useState('');
    const [practiceThreeDate, setPracticeThreeDate] = useState('');
    const [qualifyingTime, setQualifyingTime] = useState('');
    const [qualifyingDate, setQualifyingDate] = useState('');
    const [raceTime, setRaceTime] = useState('');
    const [raceDate, setRaceDate] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    // Define Information States
    const [round, setRound] = useState('');
    const [flag, setFlag] = useState('');
    const [circuitName, setCircuitName] = useState('');
    const [circuitTrackImg, setCircuitTrackImg] = useState('');
    const [raceName, setRaceName] = useState('');
    const [grandPrixName, setGrandPrixName] = useState('');
    const [circuitID, setCircuitID] = useState('');

    // Call API and set states in useEffect
    useEffect(() => {
        async function fetchNextRaceInformation() {
            try {

                // Call API ergast.com/api/f1/current/next.json
                const response = await fetch('https://ergast.com/api/f1/current/next.json');
                const data = await response.json();



                // SET SCHEDULE STATES
                // First Practice
                const firstPracticeDate = data.MRData.RaceTable.Races[0].FirstPractice.date;
                const firstPracticeTime = data.MRData.RaceTable.Races[0].FirstPractice.time;
                setPracticeOneDate(firstPracticeDate);
                setPracticeOneTime(firstPracticeTime);
                // Second Practice
                const secondPracticeDate = data.MRData.RaceTable.Races[0].SecondPractice.date;
                const secondPracticeTime = data.MRData.RaceTable.Races[0].SecondPractice.time;
                setPracticeTwoDate(secondPracticeDate);
                setPracticeTwoTime(secondPracticeTime);
                // Third Practice
                const thirdPracticeDate = data.MRData.RaceTable.Races[0].ThirdPractice.date;
                const thirdPracticeTime = data.MRData.RaceTable.Races[0].ThirdPractice.time;
                setPracticeThreeDate(thirdPracticeDate);
                setPracticeThreeTime(thirdPracticeTime);
                // Qualifying
                const qualifyingDate = data.MRData.RaceTable.Races[0].Qualifying.date;
                const qualifyingTime = data.MRData.RaceTable.Races[0].Qualifying.time;
                setQualifyingDate(qualifyingDate);
                setQualifyingTime(qualifyingTime);
                // Race
                const raceDate = data.MRData.RaceTable.Races[0].date;
                const raceTime = data.MRData.RaceTable.Races[0].time;
                setRaceDate(raceDate);
                setRaceTime(raceTime);
                // Location
                const longitude = data.MRData.RaceTable.Races[0].Circuit.Location.long;
                const latitude = data.MRData.RaceTable.Races[0].Circuit.Location.lat;
                setLongitude(longitude);
                setLatitude(latitude);


                // SET INFORMATION STATES
                // Deconstruct API data so can be accessed easily below
                const deconstructedAPI = data.MRData.RaceTable.Races[0];
                // Set round number
                const roundNumber = deconstructedAPI.round;
                setRound(roundNumber);
                // Set flag using imported data from circuitInfo.js, circuitFlags
                const circuitCountry = deconstructedAPI.Circuit.Location.country;
                const countryFlag = circuitFlags[circuitCountry];
                setFlag(countryFlag);
                // Set circuit img using imported data from circuitInfo.js, circuitTracks
                const raceName = deconstructedAPI.raceName;
                const circuitTrack = circuitTracks[raceName];
                setCircuitTrackImg(circuitTrack);
                // Set circuit name using imported data from circuitInfo.js, circuitNames
                const circuitName = circuitNames[raceName];
                setCircuitName(circuitName);
                // Set grand prix name
                const grandPrixName = deconstructedAPI.raceName;
                setGrandPrixName(grandPrixName);
                // Set secondary circuit name
                const technicalCircuitName = deconstructedAPI.Circuit.circuitName;
                setRaceName(technicalCircuitName);
                // Set circuit ID
                const circuitId = deconstructedAPI.Circuit.circuitId;
                setCircuitID(circuitId);


            } catch (error) {
                console.error(error);
            }
        }
        fetchNextRaceInformation();
        
    }, []);
    
    return {
        round,
        flag,
        circuitName,
        circuitTrackImg,
        raceName,
        grandPrixName,
        circuitID,
        practiceOneTime,
        practiceOneDate,
        practiceTwoTime,
        practiceTwoDate,
        practiceThreeTime,
        practiceThreeDate,
        qualifyingTime,
        qualifyingDate,
        raceTime,
        raceDate,
        longitude,
        latitude
    }
}

// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************



// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************

// Get information from the previous race weekend
export function PreviousRaceInformation() {
    const [result, setResult] = useState({
        position: [],
        driverNumber: [],
        lastNames: [],
        team: [],
    });

    useEffect(() => {
        async function fetchPreviousRaceInformation() {
            try {
                // CALL API
                const response = await fetch('https://ergast.com/api/f1/current/last/results.json');
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0].Results;
                // SET RESULT
                const positions = deconstructedAPI.map(item => item.positionText);
                const driverNumbers = deconstructedAPI.map(item => item.Driver.permanentNumber);
                const lastNames = deconstructedAPI.map(item => item.Driver.familyName);
                const teams = deconstructedAPI.map(item => item.Constructor.name);

                // Set the result state
                setResult({
                    position: positions,
                    driverNumber: driverNumbers,
                    lastNames: lastNames,
                    team: teams,
                });

            } catch (error) {
                console.error(error);
            }
        }
        fetchPreviousRaceInformation();
        
    }, []);

    return result
}

// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************



// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************

// Get information from next round's race, last year
export function LastYearResult() {

    // Get the circuit ID from NextRaceInformation()
    const { circuitID } = NextRaceInformation();

    // Define states
    const [resultLastYear, setResultLastYear] = useState({
        position: [],
        driverNumber: [],
        lastNames: [],
        team: [],
    });

    // Get the result from last year using circuit ID
    useEffect(() => {
        async function fetchLastYearResult() {
            try {
                // Call API to retrieve result
                const response = await fetch(`https://ergast.com/api/f1/2022/circuits/${circuitID}/results.json`);
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0].Results;

                // Find and define the results
                const positions = deconstructedAPI.map(item => item.positionText);
                const driverNumbers = deconstructedAPI.map(item => item.Driver.permanentNumber);
                const lastNames = deconstructedAPI.map(item => item.Driver.familyName);
                const teams = deconstructedAPI.map(item => item.Constructor.name);
                // const time = deconstructedAPI.map(item => item.Time.time);

                // Set the result state
                setResultLastYear({
                    position: positions,
                    driverNumber: driverNumbers,
                    lastNames: lastNames,
                    team: teams,
                });

            } catch (error) {
                console.error(error);
            }
        }
        if (circuitID !== '') {
            fetchLastYearResult();
        }
        
    }, [circuitID]);

    return resultLastYear;
}

// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************
// **********************************************************************************************************************