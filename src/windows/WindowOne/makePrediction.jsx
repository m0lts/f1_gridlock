import React from "react";
import { StaticRaceInformation, DynamicRaceInformation } from "../../hooks/raceInfoErgast";
import { driverInfo } from "../../data/driverInfo";
import { PredictionForm } from "../../components/forms";
import "../../assets/global.css";
import BelgianFlag from "../../assets/interface/media/flags/belgium_flag.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function MakePrediction() {

    const [positionCounter, setPositionCounter] = useState(1);


    // GET API RACE DATA
    const { grandPrixName } = StaticRaceInformation();
    const { qualifyingStartTime } = DynamicRaceInformation();

    const driverDetails = driverInfo;

    const [unpickedDrivers, setUnpickedDrivers] = useState(driverDetails);
    const [pickedDrivers, setPickedDrivers] = useState([]);

    const handlePickDriver = (driver) => {
        if (pickedDrivers.length < 10) {
        const updatedUnpickedDrivers = unpickedDrivers.filter((d) => d !== driver);
        setUnpickedDrivers(updatedUnpickedDrivers);
        setPickedDrivers((prevPickedDrivers) => [...prevPickedDrivers, driver]);
        }
      };

      const handleUnpickDriver = (driver) => {
        const updatedPickedDrivers = pickedDrivers.filter((d) => d !== driver);
        setPickedDrivers(updatedPickedDrivers);
        setUnpickedDrivers((prevUnpickedDrivers) => [...prevUnpickedDrivers, driver]);
      };

    // FORM HANDLING
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
        
    //     const formData = new FormData(event.target);
    //     const queryParams = new URLSearchParams(formData);
    
    //     const url = `/api/add-prediction?${queryParams.toString()}`;

    //     const response = await fetch(url);
    
    //     if (response.ok) {
    //         console.log("SUCCESS");
    //     } else {
    //       console.log("ERROR");
    //     }
    //   };

    
    return (
        <div className='makePredictionWindow'>
            <div className={qualifyingStartTime === "00:00:00:00" ? "makePredictionInfoClosed" : "makePredictionInfo"}>
                <FontAwesomeIcon className={qualifyingStartTime === "00:00:00:00" ? "showLock" : "hideLock"} icon={faLock} />
                <h6 className="qualifyingCountdown">
                    {qualifyingStartTime === "00:00:00:00" ? "Predictions are Closed" : `Predictions close in: ${qualifyingStartTime}`}
                </h6>
                <p className="infoText">
                    {qualifyingStartTime === "00:00:00:00" ? "Your prediction from last week has been submitted." : `Make your prediction for the ${grandPrixName} below by selecting your Top 10 drivers.`}                </p>
            </div>
            <div className={qualifyingStartTime === "00:00:00:00" ? 'predictionsClosed' : ''}>
                <div className="unpickedDriversCont">
                    <h5>Select Drivers:</h5>
                    <ul className="unpickedDrivers">
                        {unpickedDrivers.map((driver, index) => (
                        <li key={index} className="unpickedDriver" onClick={() => handlePickDriver(driver)}>
                            <span className="unpickedDriverNumber">{driver.number}</span><span className="unpickedDriverFullName"><span className="unpickedDriverFirstName">{driver.firstName}</span> <span className="unpickedDriverLastName">{driver.lastName}</span></span>
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="pickedDriversCont">
                    <table className={pickedDrivers.length === 0 ? "pickedDriversTableHide" : "pickedDriversTable"}>
                        <thead className="pickedDriversTableHeader">
                            <tr>
                                <td className="pickedDriversTableHeaderPosition">Position</td>
                                <td className="pickedDriversTableHeaderNumber">Number</td>
                                <td className="pickedDriversTableHeaderTeam">Team</td>
                                <td className="pickedDriversTableHeaderName">Name</td>
                                <td className="pickedDriversTableHeaderRemove">Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                        {pickedDrivers.map((driver, index) => (
                        <tr key={index} onClick={() => handleUnpickDriver(driver)}>
                            <td className="position">P{positionCounter + index}</td>
                            <td className="pickedDriverNumber">{driver.number}</td>
                            <td className="pickedDriverTeam">{driver.team}</td>
                            <td><span className="pickedDriverFirstName">{driver.firstName}</span> <span className="pickedDriverLastName">{driver.lastName}</span></td>
                            <td className="removeDriver">X</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* <form onSubmit={handleSubmit}>
                    {pickedDrivers.map((driver, index) => (
                        <input className="submissionForm" type="text" key={index} name={`P${index + 1}`} defaultValue={driver.lastName} />
                    ))}
                    <input className={pickedDrivers.length === 0 ? "submissionFormSubmitBtnHide" : "submissionFormSubmitBtn"} type="submit" value="Submit"/>
                </form> */}
            </div>
        </div>
    )
}