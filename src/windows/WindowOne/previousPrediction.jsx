import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PreviousRaceRound } from '../../hooks/ergastAPIQueries';

import '../../assets/global.css';

export default function PreviousPrediction({ title }) {
  const [predictions, setPredictions] = useState([]);
  // Get username from localstorage
  const username = localStorage.getItem('Username');

  const { round } = PreviousRaceRound();

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
        // checl data is an object, then convert to an array of driver names
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

  return (
    <>
      <h3>{title}</h3>
      <h2>Round {round}</h2>
      <ul>
      <li id="username">{username}</li>
      {/* map out predictions state - ADD LOADING SCREEN? */}
        {predictions.length > 0 ? (
          predictions.map((prediction, index) => (
            <li key={index} id={`p${index + 1}`}>
              {prediction}
            </li>
          ))
        ) : (
          <li>No predictions available.</li>
        )}
      </ul>
    </>
  );
}
