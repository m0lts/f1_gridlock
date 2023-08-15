import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../assets/global.css';

export default function PreviousPrediction({ title }) {
  const [predictions, setPredictions] = useState([]);
  const username = 'TOM-Test'; // Update this with the actual username

//   fetch data from POSTGRES vercel database by calling api endpoint query-prediction.
// when you get a chance, change it so that values are passed to the query so more specific data can be fetched i.e. race round etc.
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/query-prediction?username=${username}`);
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
  }, //Change username below to empty [] so that it loads when component renders?
  [username]);

  return (
    <>
      <h3>{title}</h3>
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
