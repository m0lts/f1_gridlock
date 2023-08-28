import { useEffect, useState } from "react";

export function LastRoundResult() {
    const [result, setResult] = useState({
        position: [],
        driverNumber: [],
        lastNames: [],
        team: [],
    });

    useEffect(() => {
        async function fetchPreviousResultData() {
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
        fetchPreviousResultData();
        
    }, []);

    return result
}