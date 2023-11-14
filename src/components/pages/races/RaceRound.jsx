import { useState, useEffect } from "react";
import { circuitFlags, circuitTracks } from "../../../data/CircuitInfo";
import './race_round.css'

export default function RaceRound({ apiData, competitionToShow, roundNumber, raceComplete }) {

    // Get countdown timer to race start from CountdownHook hook located in countdownFunctions.jsx
    // const { raceCountdown } = CountdownFunction();

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

    // For races that have completed, retrieve result data
    // Race results are done by raceID. Can be retrieved at competitionRace.id
    // Then must send the competitionRace.id to "https://api-formula-1.p.rapidapi.com/rankings/races?race=${competitionRace.id}"
    // Move useEffect hook from App.jsx to Races.jsx - there's no point in having it there.

    useEffect(() => {
        console.log(competitionRace)
    }, [competitionRace])

    return (
        <section className="nextRaceBanner">
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
                                {competitionSprintRace.length !== 0 ? (
                                    <ul className="selected_race_round_timings sprint_weekend">
                                        <li className="selected_race_round_session">
                                            <span>FP1:</span>
                                            <span>{formatDateTime(competitionFp1[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionFp1[0].date).formattedTime} GMT</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>Qualifying:</span>
                                            <span>{formatDateTime(competitionQualifying[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionQualifying[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>Sprint Shootout:</span>
                                            <span>{formatDateTime(competitionSprintShootout[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionSprintShootout[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>Sprint Race:</span>
                                            <span>{formatDateTime(competitionSprintRace[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionSprintRace[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>Race:</span>
                                            <span>{formatDateTime(competitionRace[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionRace[0].date).formattedTime}</span>
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="selected_race_round_timings">
                                        <li className="selected_race_round_session">
                                            <span>FP1:</span>
                                            <span>{formatDateTime(competitionFp1[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionFp1[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>FP2:</span>
                                            <span>{formatDateTime(competitionFp2[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionFp2[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>FP3:</span>
                                            <span>{formatDateTime(competitionFp3[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionFp3[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>Qualifying:</span>
                                            <span>{formatDateTime(competitionQualifying[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionQualifying[0].date).formattedTime}</span>
                                        </li>
                                        <li className="selected_race_round_session">
                                            <span>Race:</span>
                                            <span>{formatDateTime(competitionRace[0].date).formattedDate}</span>
                                            <span>{formatDateTime(competitionRace[0].date).formattedTime}</span>
                                        </li>
                                    </ul>
                                )}
                                </>
                            ) : (
                                <h1>Complete</h1>
                            )}
                            
                        </div>
                        <div className="selected_race_round_middle_right">
                            <div className="selected_race_round_circuit_cont">
                                <h2>{competitionRace[0].circuit.name}</h2>
                                <img src={competitionRace[0].circuit.image} alt={competitionRace[0].competition.location.country + " Track"} />
                            </div>
                        </div>
                    </div>
                    <div className="selected_race_round_bottom_section">
                        <p>Race Countdown: 00:00:00</p>
                    </div>
                </div>
            )}
        </section>
    )
}
