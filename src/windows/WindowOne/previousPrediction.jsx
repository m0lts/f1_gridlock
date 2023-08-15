import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../assets/global.css';

export default function PreviousPrediction({ title }) {
  const [predictions, setPredictions] = useState([]);
  const username = 'TOM-Test'; // Update this with the actual username

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/query-prediction?username=${username}`);
        const data = response.data;
        const sortedData = data.rows[0];
        console.log(sortedData);

        if (typeof sortedData === 'object') {
            // Convert the object to an array of driver names
            const predictionsArray = Object.values(sortedData);
            setPredictions(predictionsArray);
          } else {
            console.error('API response is not an object:', data);
          }
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    }

    fetchData();
  }, [username]);

  return (
    <>
      <h3>{title}</h3>
      <ul>
      <li id="username">{username}</li>
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
