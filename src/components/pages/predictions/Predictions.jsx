import Drivers from "./Drivers"
import RacePrediction from "./RacePrediction"
import ExtraPredictionInfo from "./ExtraPredictionInformation"
import './predictions.css'
import { useEffect, useState } from "react"

export default function Predictions({ returnedApiData }) {

    const [nextRace, setNextRace] = useState();

    // Get Drivers for season
    const apiRequest = `rankings/drivers?season=2023`;
    const [driverData, setDriverData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/externalData/CallAPI', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiRequest),
                });
            
                // Receive returned data and set state with data.
                if (response.ok) {
                    const responseData = await response.json();
                    setDriverData(responseData.result.response);
                    } else {
                    console.log('failure');
                    }
                } catch (error) {
                console.error('Error submitting form:', error);
                }
        }
        fetchData();

        // Sort next race information
        const competitionRaces = returnedApiData.filter(event => event.type === 'Race');
        const scheduledRaces = competitionRaces
        .map((event, index) => ({ ...event, originalIndex: index + 1 })) // Adding originalIndex property so that round number is correct
        .filter(event => event.status === 'Scheduled');
        setNextRace(scheduledRaces[0]);
    }, [returnedApiData])


    // Update drivers state with array including only seated drivers
    const updateDrivers = (updatedDriverData) => {
        setDrivers(updatedDriverData);
    };
    useEffect(() => {
        let driversToRemove = ['Liam Lawson', 'Nyck De Vries'];
        let updatedDriverData = driverData.filter(driver => !driversToRemove.includes(driver.driver.name));
        updateDrivers(updatedDriverData);
    }, [driverData]);

    // Set state for driver selection
    const [selectedDrivers, setSelectedDrivers] = useState([]);
    const [drivers, setDrivers] = useState();


    return (
        <div className="predictions_page">
            {nextRace && <h1 className="predictions_page_title">Your {nextRace.competition.name} Prediction</h1>}
            <div className="predictions_page_flex">
                <Drivers 
                    className='predictions_page_section' 
                    drivers={drivers}
                    setSelectedDrivers={setSelectedDrivers}
                    setDrivers={setDrivers}
                    selectedDrivers={selectedDrivers}
                />
                <RacePrediction 
                    className='predictions_page_section'
                    selectedDrivers={selectedDrivers}
                    setDrivers={setDrivers}
                    setSelectedDrivers={setSelectedDrivers}
                    raceInfo={nextRace}
                />
                <ExtraPredictionInfo 
                    className='predictions_page_section' 
                    raceInfo={nextRace}
                />
            </div>
        </div>

    )
}