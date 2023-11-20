import { useEffect, useState } from 'react';
import './race_prediction.css'

export default function RacePrediction({ selectedDrivers, setDrivers, setSelectedDrivers, drivers, raceInfo, driverInfo, qualifyingStarted }) {

    const [predictionSending, setPredictionSending] = useState(false);
    const [predictionSubmitted, setPredictionSubmitted] = useState(false);

    const userID = sessionStorage.getItem('UserID');

    const handleUnselectDriver = (driverData) => {
        setSelectedDrivers(prevDrivers => prevDrivers.filter(driver => driver !== driverData));
        // Check if the driver being removed exists in unselectedDrivers
        const isDriverInUnselected = drivers.some(driver => driver === driverData);
        if (!isDriverInUnselected) {
            setDrivers(prevDrivers => [...prevDrivers, driverData]);
        }
    };

    const handlePredictionSubmission = async (e) => {
        e.preventDefault();
        setPredictionSending(true)

        const raceID = raceInfo.id;
        const submittedAt = new Date();

        try {
            // Convert user prediction to just the driver's IDs, userID and competitionID
            const driverIds = selectedDrivers.map(driver => driver.driver.id);
            const payload = {
                userID: userID,
                driverIDs: driverIds,
                competition: raceID,
                submissionTime: submittedAt,
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

    // Get user's prediction for race if true
    const [dbPrediction, setDbPrediction] = useState();
    const [dbPredictionReceived, setDbPredictionReceived] = useState(false);

    useEffect(() => {

        const fetchPrediction = async () => {

            if (raceInfo) {
                const raceID = raceInfo.id;
                try {
                    const payload = {
                        userID: userID,
                        competition: raceID,
                    };
        
                    const response = await fetch('/api/predictions/QueryPrediction', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(payload),
                    });
        
                    if (response.status === 200) {
                        // If user has a prediction in database
                        const responseData = await response.json();
                        const dbPrediction = responseData.dbPrediction;
                        setDbPrediction(dbPrediction.driverIDs);
                        setDbPredictionReceived(true);
                    } else if (response.status === 201) {
                        // If user hasnt yet completed a prediction
                        setDbPrediction(false);
                        setDbPredictionReceived(true);
                    }
              
                  } catch (error) {
                    console.error('Error submitting form:', error);
                  }
                }       

            }

        fetchPrediction();
        
    }, [raceInfo])

    // If user wants to edit prediction, populate selectedDrivers state with dbPrediction array and remove selected drivers from drivers list
    const [editingMode, setEditingMode] = useState(false);

    const handleEditPrediction = () => {
        setEditingMode(true);

        // Update selected drivers with dbPrediction 
        const updatedSelectedDrivers = dbPrediction.map(driverID => {
            const matchingDriver = driverInfo.find(driver => driver.driver.id === driverID);
            
            return matchingDriver ? matchingDriver : null;
        }).filter(driver => driver !== null);

        setSelectedDrivers(updatedSelectedDrivers);

        // Remove drivers from unselectedDrivers if in dbPrediction
        const updatedUnselectedDrivers = drivers.filter(driver => {
            return !dbPrediction.includes(driver.driver.id);
        });
    
        setDrivers(updatedUnselectedDrivers);
    }

    // // If qualifying has started, send the user's most recent prediction to db for this race
    // useEffect(() => {

    //     if (!dbPrediction && qualifyingStarted)

    //     const queryUserPreviousPrediction = async () => {

    //     try {
    //         const raceID = raceInfo.id;
    //         const timeNow = new Date();
    //         const payload = {
    //             userID: userID,
    //             timeNow: timeNow,
    //             competition: raceID,
    //         };

    //         const response = await fetch('/api/predictions/QueryPreviousPrediction', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(payload),
    //         });

    //         if (response.ok) {
    //             // setPredictionSending(false);
    //             // setPredictionSubmitted(true);
    //         }
      
    //       } catch (error) {
    //         console.error('Error submitting form:', error);
    //       }
    //     }

    //     queryUserPreviousPrediction();

    // }, [qualifyingStarted])



    return (
        <div className={`predictions_page_section race_prediction ${!dbPredictionReceived ? 'loading' : ''}`}>
            {!dbPredictionReceived ? (
                <div className='loader'></div>
            ) : dbPrediction !== false ? (
                <>
                    {!editingMode ? (
                        <>
                        <div className='predictions_page_placeholder'>
                            <p>Below is your submitted prediction for the {raceInfo.competition.name}.</p>
                            {!qualifyingStarted && <button className='btn' onClick={handleEditPrediction}>Edit Your Prediction</button>}
                        </div>
                        <ul className='selected_driver_list'>
                            {dbPrediction.map((driverData, index) => {
                                // Because dbPrediction only contains an array of the drivers' IDs, this data must be changed into the drivers full information
                                const infoIndex = driverInfo.findIndex(
                                    info => info.driver.id === driverData
                                );
                                
                                if (infoIndex !== -1) {
                                    const selectedDriverInfo = driverInfo[infoIndex];
                                    return (
                                        <li key={index} className="selected_driver_container db_prediction">
                                        <p className='selected_driver_position'>P{index + 1}</p>
                                        <p className='selected_driver_number'>{selectedDriverInfo.driver.number}</p>
                                        <figure className='selected_driver_img_container'>
                                            <img className="selected_driver_img" src={selectedDriverInfo.team.logo} alt={selectedDriverInfo.team.name} />
                                        </figure>
                                        <p className="selected_driver_name">{selectedDriverInfo.driver.name}</p>
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                        </ul>
                        </>
                    ) : (
                        !predictionSubmitted ? (
                            <>
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
                            {selectedDrivers.length === 10 && (
                                <div className='submit_prediction_btn_container'>
                                    <button className='btn' onClick={handlePredictionSubmission}>
                                        {predictionSending ? (
                                            <div className='loader'></div>
                                        ) : (
                                            <p>Submit Prediction</p>
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                        ) : (
                            <p className='predictions_page_submission_success'>Your prediction has been submitted</p>
                        )
                    )}
                </>
            ) : (
                <>
                    {!predictionSubmitted ? (
                            <>
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
                                {selectedDrivers.length === 10 && (
                                    <div className='submit_prediction_btn_container'>
                                        <button className='btn' onClick={handlePredictionSubmission}>
                                            {predictionSending ? (
                                                <div className='loader'></div>
                                            ) : (
                                                <p>Submit Prediction</p>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className='predictions_page_submission_success'>Your prediction has been submitted</p>
                        )}
                </>
            )}

        </div>
    )
}