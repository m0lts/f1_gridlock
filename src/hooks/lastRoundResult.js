import { useEffect, useState } from "react";

export function LastRoundResult() {
    const [result, setResult] = useState('');

    useEffect(() => {
        async function fetchPreviousResultData() {
            try {
                // CALL API
                const response = await fetch('https://ergast.com/api/f1/current/last/results.json');
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0].Results;
                // SET RESULT
                const position = deconstructedAPI.map(item => item.positionText);
                const driverNumber = deconstructedAPI.map(item => item.Driver.permanentNumber);
                const lastNames = deconstructedAPI.map(item => item.Driver.familyName);
                const team = deconstructedAPI.map(item => item.Constructor.name);
                const time = deconstructedAPI.map(item => item.Time.time);

                console.log(deconstructedAPI);
                // Set the result state
                setResult(position, driverNumber, lastNames, team, time);

            } catch (error) {
                console.error(error);
            }
        }
        fetchPreviousResultData();
        
    }, []);

    return result
}