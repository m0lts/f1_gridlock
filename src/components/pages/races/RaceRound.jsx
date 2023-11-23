import { useState, useEffect } from "react";
import { circuitFlags, circuitTracks } from "../../../data/CircuitInfo";
import CompleteRaceRounds from "./CompleteRaceRounds";
import './race_round.css'

export default function RaceRound({ apiData, competitionToShow, roundNumber, raceComplete, raceCancelled }) {

    // Get competition to show
    const competition = apiData.filter(event => event.competition.name === competitionToShow);

    // Normal weekend
    const competitionRace = competition.filter(event => event.type === "Race");
    const competitionQualifying = competition.filter(event => event.type === "1st Qualifying");
    const competitionFp1 = competition.filter(event => event.type === "1st Practice");
    const competitionFp2 = competition.filter(event => event.type === "2nd Practice");
    const competitionFp3 = competition.filter(event => event.type === "3rd Practice");

    // Sprint Weekend
    const competitionSprintRace = competition.filter(event => event.type === "Sprint");
    const competitionSprintShootout = competition.filter(event => event.type === "1st Sprint Shootout");

    // Format date and time
    const formatDateTime = (dateString) => {
    
        const date = new Date(dateString);
    
        const formattedDate = `${('0' + date.getUTCDate()).slice(-2)}/${('0' + (date.getUTCMonth() + 1)).slice(-2)}/${date.getUTCFullYear()}`;
        const formattedTime = `${('0' + date.getUTCHours()).slice(-2)}:${('0' + date.getUTCMinutes()).slice(-2)}`;
    
        return {
            formattedDate,
            formattedTime
        };
    };

    // Race countdown 
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
        const now = new Date().getTime();
        const apiTime = new Date(competitionRace[0].date).getTime();
        const difference = apiTime - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const countdownText = `${days} <span class="days">days</span>  ${hours} <span class="hours">hours</span>  ${minutes} <span class="minutes">minutes</span>  ${seconds} <span class="seconds">seconds</span>`;
            setCountdown(countdownText);
        } else {
            setCountdown('Race started!');
        }
        };

        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId);
    }, [competitionRace[0].date]);

    // Show race result when clicked
    const [showRaceResult, setShowRaceResult] = useState(false);

    const handleShowRaceResult = (event) => {
        event.stopPropagation();
        if (showRaceResult) {
            setShowRaceResult(false);
        } else {
            setShowRaceResult(true);
        }
    }


    return (
        <section>
            {!competitionRace || !competitionQualifying ? (
                <div className="submission_processing">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="selected_race_round">
                    <figure className="selected_race_round_img_cont">
                        <img src={circuitFlags[competitionRace[0].competition.location.country]} alt={competitionRace[0].competition.location.country + " Flag"} />
                    </figure>
                    <div className="selected_race_round_top_section">
                        <p className='selected_race_round_heading'>
                            <span className='selected_race_round_heading_text'>Round </span>
                            <span className='selected_race_round_heading_number'>{roundNumber}</span>
                        </p>
                    </div>
                    <div className="selected_race_round_middle_section">
                        <div className="selected_race_round_middle_left">
                            <div className="selected_race_round_titles">
                                <h1>{competitionRace[0].competition.location.country}</h1>
                                <h2>{competitionRace[0].competition.name}</h2>
                            </div>
                            {!raceComplete ? (
                                <>
                                {!raceCancelled ? (
                                    <>
                                    {competitionSprintRace.length !== 0 ? (
                                        <ul className="selected_race_round_timings sprint_weekend">
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">FP1:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionFp1[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionFp1[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">Qualifying:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionQualifying[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionQualifying[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">Sprint Shootout:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionSprintShootout[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionSprintShootout[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">Sprint Race:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionSprintRace[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionSprintRace[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">Race:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionRace[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionRace[0].date).formattedTime}</span>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="selected_race_round_timings">
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">FP1:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionFp1[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionFp1[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">FP2:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionFp2[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionFp2[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">FP3:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionFp3[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionFp3[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">Qualifying:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionQualifying[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionQualifying[0].date).formattedTime}</span>
                                            </li>
                                            <li className="selected_race_round_session">
                                                <span className="selected_race_round_session_title">Race:</span>
                                                <span className="selected_race_round_session_date">{formatDateTime(competitionRace[0].date).formattedDate}</span>
                                                <span className="selected_race_round_session_time">{formatDateTime(competitionRace[0].date).formattedTime}</span>
                                            </li>
                                        </ul>
                                    )}
                                    </>
                                ) : (
                                    <h1>Race Cancelled</h1>
                                )}
                               
                                </>
                            ) : (
                                <CompleteRaceRounds
                                    raceID={competitionRace[0].id}
                                    podiumResult={true}
                                />
                            )}
                            
                        </div>
                        <div className="selected_race_round_middle_right">
                            <div className="selected_race_round_circuit_cont">
                                <h2>{competitionRace[0].circuit.name}</h2>
                                <img src={competitionRace[0].circuit.image} alt={competitionRace[0].competition.location.country + " Track"} />
                            </div>
                        </div>
                    </div>
                    {raceComplete ? (
                        <div className="selected_race_round_bottom_section race_complete" onClick={handleShowRaceResult}>
                            {!showRaceResult && <p>See race result</p>}
                            {showRaceResult && (
                                <div>
                                    <CompleteRaceRounds 
                                        raceID={competitionRace[0].id}
                                        fullResult={true}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="selected_race_round_bottom_section race_upcoming">
                            <p className="countdown_timer" dangerouslySetInnerHTML={{ __html: countdown }}></p>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}
