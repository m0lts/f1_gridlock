import { useState } from 'react';
import './race_prediction.css'

export default function RacePrediction({ selectedDrivers, setDrivers, setSelectedDrivers, raceInfo }) {

    const [predictionSending, setPredictionSending] = useState(false);
    const [predictionSubmitted, setPredictionSubmitted] = useState(false);

    const userID = sessionStorage.getItem('UserID');

    const handleUnselectDriver = (driverData) => {
        setDrivers(prevDrivers => [...prevDrivers, driverData]);
        setSelectedDrivers(prevDrivers => prevDrivers.filter(driver => driver !== driverData));
    };

    const handlePredictionSubmission = async (e) => {
        e.preventDefault();
        setPredictionSending(true)

        const raceID = raceInfo.id;

        try {
            // Convert user prediction to just the driver's IDs, userID and competitionID
            const driverIds = selectedDrivers.map(driver => driver.driver.id);
            const payload = {
                userID: userID,
                driverIDs: driverIds,
                competition: raceID,
            };

            const response = await fetch('/api/predictions/AddPrediction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
                setPredictionSending(false);
                setPredictionSubmitted(true);
            }
      
          } catch (error) {
            console.error('Error submitting form:', error);
          }

    }

    // *****************
    // MAKE SO IF THE USER HAS MADE A PREDICTION FOR THE GP ALREADY, IT IS PRINTED IN THE PREDICTION SECTION:
    // >>>> need to remove drivers that have been selected from drivers list
    // >>>> only update driverIDs array in database with new prediction !!!DONT MAKE NEW DOCUMENT WITH UPDATED PREDICTIONS!!!

    return (
        <div className="predictions_page_section race_prediction">
            {selectedDrivers.length === 0 ? (
                <div className='predictions_page_placeholder'>
                    <p>Please select a driver from the list. Your selected drivers will appear here.</p>
                </div>
            ) : (
                <ul className='selected_driver_list'>
                    {selectedDrivers.map((driverData, index) => (
                    <li key={index} className="selected_driver_container" onClick={() => handleUnselectDriver(driverData)}>
                        <p className='selected_driver_position'>P{index + 1}</p>
                        <p className='selected_driver_number'>{driverData.driver.number}</p>
                        <figure className='selected_driver_img_container'>
                            <img className="selected_driver_img" src={driverData.team.logo} alt={driverData.team.name} />
                        </figure>
                        <p className="selected_driver_name">{driverData.driver.name}</p>
                    </li>
                    ))}
                </ul>
            )}
            {selectedDrivers.length === 10 && 
                <div className='submit_prediction_btn_container'>
                    <button className='submit_prediction_btn' onClick={handlePredictionSubmission}>
                        {predictionSending ? (
                            <div className='loader'></div>
                        ) : (
                            <p>Submit Prediction</p>
                        )}
                    </button>
                </div>
            }
            {predictionSubmitted && <p className='predictions_page_submission_success'>Your prediction has been submitted</p>}
        </div>
    )
}