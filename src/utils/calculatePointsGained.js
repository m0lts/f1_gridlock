import { useState, useEffect } from "react";
import { PreviousRaceRound, PreviousRaceInformation } from "../hooks/ergastAPIQueries";
import axios from "axios";




export default function CalculatePointsGained() {


    const [predictions, setPredictions] = useState([]);
    // Get username from localstorage
    const username = localStorage.getItem('Username');
  
    // Get round from ergast API to query previous prediction with
    const { round } = PreviousRaceRound();

    // Get actual race result from previous round and reduce to 10 drivers
    const result = PreviousRaceInformation();
    const resultTop10 = result.lastNames.slice(0, 10);
  
  //   fetch data from POSTGRES vercel database by calling api endpoint query-prediction.
  // when you get a chance, change it so that values are passed to the query so more specific data can be fetched i.e. race round etc.
  // currently, the query is set to fetch all predictions for a user. Must add it so that previous race round is fetched. ********** <--- TODO
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`/api/query-prediction?username=${username}&round=${round}`);
          const data = response.data;
          // data returned as object notation, sort data below. WILL HAVE TO CHANGE DATA SORTING WHEN PROPER QUERIES HAPPEN
          const sortedData = data.rows[0];
          // check data is an object, then convert to an array of driver names
          if (typeof sortedData === 'object') {
              const predictionsArray = Object.values(sortedData);
              setPredictions(predictionsArray);
            } else {
              console.error('API response is not an object:', sortedData);
            }
        } catch (error) {
          console.error('Error fetching predictions:', error);
        }
      }
  
      fetchData();
    }, [round]);

    // Calculate points gained
    let points = 0;

    if (predictions.join() === resultTop10.join()) {
        points += 10;
    }

    for (let i = 0; i < predictions.length; i++) {
        if (predictions[i] === resultTop10[i]) {
            points += 2;
        }
    }

    for (let j = 0; j < predictions.length; j++) {
        for (let l = 0; l < resultTop10.length; l++) {
            if (predictions[j] === resultTop10[l]) {
                points += 1;
            }
        }
    }
  
    return points;
}