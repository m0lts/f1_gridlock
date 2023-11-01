import { NextRaceInformation } from "../../../hooks/ErgastAPIQueries";
import { CountdownFunction } from "../../../utils/CountdownFunction";
import { driverInfo } from "../../../data/DriverInfo";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function MakePrediction() {

    const [positionCounter, setPositionCounter] = useState(1);

    // GET API RACE DATA
    const { grandPrixName } = NextRaceInformation();
    const { qualifyingCountdown } = CountdownFunction();

    // Initialize unpickedDrivers as an empty array
    const [unpickedDrivers, setUnpickedDrivers] = useState([]);

    // Get the drivers details from the Ergast API
    useEffect(() => {
        async function fetchDrivers() {
            try {
                // Call API to retrieve result
                const response = await fetch(`https://ergast.com/api/f1/current/drivers.json`);
                const data = await response.json();
                const deconstructedAPI = data.MRData.DriverTable.Drivers;
                
                const allDrivers = deconstructedAPI.map(driver => ({
                    firstName: driver.givenName,
                    lastName: driver.familyName,
                    number: driver.permanentNumber
                }));
    
                // Set the result state
                setUnpickedDrivers(allDrivers);

            } catch (error) {
                console.error(error);
            }
        }
        fetchDrivers();
        
    }, []);

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
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const queryParams = new URLSearchParams(formData);
        const username = localStorage.getItem('Username');
        queryParams.append('username', username);
    
        const url = `/api/predictions/AddPrediction?${queryParams.toString()}`;

        const response = await fetch(url);
    
        if (response.ok) {
            console.log("SUCCESS");
        } else {
            try {
            const errorData = await response.json(); // Parse the error response
            const errorMessage = errorData.error; // Extract the error message
      
            console.log("ERROR:", errorMessage);
          } catch (error) {
            console.log("An unknown error occurred.");
          }
      }};

    
    return (
        <div className='makePredictionWindow'>
            <div className={qualifyingCountdown === "00:00:00:00" ? "makePredictionInfoClosed" : "makePredictionInfo"}>
                <FontAwesomeIcon className={qualifyingCountdown === "00:00:00:00" ? "showLock" : "hideLock"} icon={faLock} />
                <h6 className="qualifyingCountdown">
                    {qualifyingCountdown === "00:00:00:00" ? "Predictions are Closed" : `Predictions close in: ${qualifyingCountdown}`}
                </h6>
                <p className="infoText">
                    {qualifyingCountdown === "00:00:00:00" ? "Your prediction from last week has been submitted." : `Make your prediction for the ${grandPrixName} below by selecting your Top 10 drivers.`}                </p>
            </div>
            <div className={qualifyingCountdown === "00:00:00:00" ? 'predictionsClosed' : ''}>
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

                <form onSubmit={handleSubmit}>
                    {pickedDrivers.map((driver, index) => (
                        <input className="submissionForm" type="text" key={index} name={`P${index + 1}`} defaultValue={driver.lastName} />
                    ))}
                    <input className={pickedDrivers.length === 0 ? "submissionFormSubmitBtnHide" : "submissionFormSubmitBtn"} type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}