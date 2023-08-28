import { useEffect, useState } from "react";
import React from "react";

export function LastYearResult() {
    const [circuitID, setCircuitID] = useState('');
    const [resultLastYear, setResultLastYear] = useState({
        position: [],
        driverNumber: [],
        lastNames: [],
        team: [],
    });


    // Get the circuit ID
    useEffect(() => {
        async function fetchCircuitID() {
            try {
                // CALL API TO RETRIEVE CIRCUIT ID
                const response = await fetch('https://ergast.com/api/f1/current/next.json');
                const data = await response.json();
                const circuitId = data.MRData.RaceTable.Races[0].Circuit.circuitId;
                setCircuitID(circuitId);

            } catch (error) {
                console.error(error);
            }
        }
        fetchCircuitID();
        
    }, []);


    // Get the last year result using the ciurcuit ID
    useEffect(() => {
        async function fetchLastYearResult() {
            try {
                // CALL API TO RETRIEVE RESULT
                const response = await fetch(`https://ergast.com/api/f1/2022/circuits/${circuitID}/results.json`);
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0].Results;

                // SET RESULT
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