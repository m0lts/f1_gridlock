import Drivers from "./Drivers"
import RacePrediction from "./RacePrediction"
import ExtraPredictionInfo from "./ExtraPredictionInformation"
import './predictions.css'
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function Predictions({ returnedApiData }) {

    const [nextRace, setNextRace] = useState();
    const [qualifyingStartTime, setQualifyingStartTime] = useState();


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

        // Set qualifying start time
        const competitionQualifying = returnedApiData.filter(event => event.type = 'Qualifying');
        const scheduledQualifying = competitionQualifying
        .map((event, index) => ({ ...event, originalIndex: index + 1 })) // Adding originalIndex property so that round number is correct
        .filter(event => event.status === 'Scheduled');
        const nextQualifying = scheduledQualifying[0];
        setQualifyingStartTime(nextQualifying);

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

    // Qualifying countdown
    const [qualifyingStarted, setQualifyingStarted] = useState(false);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        if (qualifyingStartTime) {
            const qualiDate = qualifyingStartTime.date
            const updateCountdown = () => {
            const now = new Date().getTime();
            const qualiTime = new Date(qualiDate).getTime();
            const difference = qualiTime - now;
    
            if (difference > 0) {
                setQualifyingStarted(false);
    
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
                const countdownText = `${days} <span class="days">days</span>  ${hours} <span class="hours">hours</span>  ${minutes} <span class="minutes">minutes</span>  ${seconds} <span class="seconds">seconds</span>`;
                setCountdown(countdownText);
            } else {
                setCountdown(`0 <span class="days">days</span>  0 <span class="hours">hours</span>  0 <span class="minutes">minutes</span>  0 <span class="seconds">seconds</span>`);
                setQualifyingStarted(true);
            }
            };
    
            const intervalId = setInterval(updateCountdown, 1000);
    
            return () => clearInterval(intervalId);
        }
    }, [qualifyingStartTime]);


    return (
        <div className="predictions_page">
            {nextRace && (
                <div className="countdown_container">
                    <h3>Time remaining to submit your prediction:</h3>
                    <p className="countdown_timer" dangerouslySetInnerHTML={{ __html: countdown }}></p>
                </div>
            )}
            <div className={`predictions_page ${nextRace ? 'grid' : 'flex'}`}>
                {!nextRace ? (
                        <div className="loader"></div>
                ) : (
                    qualifyingStarted ? (
                        <div className="qualifying_started_overlay">
                            <FontAwesomeIcon icon={faCircleExclamation} className="error_icon" />
                            <p>You missed this week's predictions - qualifying has started.</p>
                        </div>
                    ) : (
                        <>
                        <Drivers 
                            className='predictions_page_section' 
                            drivers={drivers}
                            setSelectedDrivers={setSelectedDrivers}
                            setDrivers={setDrivers}
                            selectedDrivers={selectedDrivers}
                            raceInfo={nextRace}
                        />
                        <RacePrediction 
                            className='predictions_page_section'
                            selectedDrivers={selectedDrivers}
                            setDrivers={setDrivers}
                            setSelectedDrivers={setSelectedDrivers}
                            raceInfo={nextRace}
                            driverInfo={driverData}
                            drivers={drivers}
                            qualifyingStarted={qualifyingStarted}
                        />
                        <ExtraPredictionInfo 
                            className='predictions_page_section' 
                            raceInfo={nextRace}
                        />
                    </>
                    )
                )}
            </div>
        </div>

    )
}