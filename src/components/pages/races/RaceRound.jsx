import { useState, useEffect } from "react";
import { circuitFlags, circuitTracks } from "../../../data/CircuitInfo";
import './race_round.css'

export default function RaceRound({ roundNumberProps }) {

    const [raceName, setRaceName] = useState();
    const [raceCountry, setRaceCountry] = useState();
    const [circuitName, setCircuitName] = useState();
    const [FP1Time, setFP1Time] = useState();
    const [FP2Time, setFP2Time] = useState();
    const [FP3Time, setFP3Time] = useState();
    const [sprintQualifyingTime, setSprintQualifyingTime] = useState();
    const [sprintTime, setSprintTime] = useState();
    const [qualifyingTime, setQualifyingTime] = useState();
    const [raceTime, setRaceTime] = useState();

    const [sprintWeekend, setSprintWeekend] = useState();


    useEffect(() => {
        const fetchRaceInformation = async (roundNumber) => {
            try {
                const response = await fetch(`https://ergast.com/api/f1/current/${roundNumber}.json`);
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0];
                const name = deconstructedAPI.raceName;
                setRaceName(name);
                const country = deconstructedAPI.Circuit.Location.country;
                setRaceCountry(country);
                const circuitName = deconstructedAPI.Circuit.circuitName;
                setCircuitName(circuitName);
                const firstPractice = deconstructedAPI.FirstPractice.date + deconstructedAPI.FirstPractice.time;
                setFP1Time(firstPractice);
                if (deconstructedAPI.Sprint) {
                    setSprintWeekend(true);
                    const sprintQualifying = deconstructedAPI.SecondPractice.date + deconstructedAPI.SecondPractice.time;
                    const sprint = deconstructedAPI.Sprint.date + deconstructedAPI.Sprint.time;
                    setSprintQualifyingTime(sprintQualifying);
                    setSprintTime(sprint);
                } else {
                    setSprintWeekend(false);
                    const secondPractice = deconstructedAPI.SecondPractice.date + deconstructedAPI.SecondPractice.time;
                    const thirdPractice = deconstructedAPI.ThirdPractice.date + deconstructedAPI.ThirdPractice.time;
                    setFP2Time(secondPractice);
                    setFP3Time(thirdPractice);
                }
                const qualifying = deconstructedAPI.Qualifying.date + deconstructedAPI.Qualifying.time;
                setQualifyingTime(qualifying);
                const race = deconstructedAPI.date + deconstructedAPI.time;
                setRaceTime(race);
            } catch (error) {
                console.log(error);
            }
        }
        fetchRaceInformation(roundNumberProps)
    }, [roundNumberProps])


    // Get countdown timer to race start from CountdownHook hook located in countdownFunctions.jsx
    // const { raceCountdown } = CountdownFunction();


    return (
        <section className="nextRaceBanner">
            {!raceName || !raceCountry || !circuitName ? (
                <div className="submission_processing">
                    <div className="loader"></div>
                </div>
            ) : (

                <div className="selected_race_round">
                    <figure className="selected_race_round_img_cont">
                        <img src={circuitFlags[raceCountry]} alt={raceCountry + " Flag"} />
                    </figure>
                    <div className="selected_race_round_top_section">
                        <p className='selected_race_round_heading'>
                            <span className='selected_race_round_heading_text'>Round </span>
                            <span className='selected_race_round_heading_number'>{roundNumberProps}</span>
                        </p>
                    </div>
                    <div className="selected_race_round_middle_section">
                        <div className="selected_race_round_middle_left">
                            <div className="selected_race_round_titles">
                                <h1>{raceCountry}</h1>
                                <h2>{raceName}</h2>
                            </div>
                            {sprintWeekend ? (
                                    <ul className="selected_race_round_timings sprint_weekend">
                                        <li className="selected_race_round_session"><span>FP1:</span><span>{FP1Time}</span></li>
                                        <li className="selected_race_round_session"><span>Qualifying:</span><span>{qualifyingTime}</span></li>
                                        <li className="selected_race_round_session"><span>Sprint Shootout:</span><span>{sprintQualifyingTime}</span></li>
                                        <li className="selected_race_round_session"><span>Sprint:</span><span>{sprintTime}</span></li>
                                        <li className="selected_race_round_session"><span>Race:</span><span>{raceTime}</span></li>
                                    </ul>
                                ) : (
                                    <ul className="selected_race_round_timings">
                                        <li className="selected_race_round_session"><span>FP1:</span><span>{FP1Time}</span></li>
                                        <li className="selected_race_round_session"><span>FP2:</span><span>{FP2Time}</span></li>
                                        <li className="selected_race_round_session"><span>FP3:</span><span>{FP3Time}</span></li>
                                        <li className="selected_race_round_session"><span>Qualifying:</span><span>{qualifyingTime}</span></li>
                                        <li className="selected_race_round_session"><span>Race:</span><span>{raceTime}</span></li>
                                    </ul>
                                )}
                        </div>
                        <div className="selected_race_round_middle_right">
                            <div className="selected_race_round_circuit_cont">
                                <h2>{circuitName}</h2>
                                <img src={circuitTracks[raceName]} alt={raceCountry + " Track"} />
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
                // <div>
                //     <div className="heroTop">
                //         <img src={circuitFlags[raceCountry]} alt={raceCountry + " Flag"} className="flagFill"/>
                //         <h3>Round {roundNumberProps}</h3>
                //     </div>
                //     <div className="bannerHeroMain">
                //         <div className="heroMainLeft">
                //             <div>
                //                 <h1 className="raceCountry">{raceCountry}</h1>
                //                 <h2 className="grandPrixName">{raceName}</h2>
                                
                //             </div>
                //             <div className="timerBox">
                //                 <h3 className="timerTitle">Lights Out:</h3>
                //                 {/* <h1 className="timer">{raceCountdown}</h1> */}
                //             </div>
                //         </div>
                //         <div className="heroMainRight">
                //             <h2 className="raceName">{circuitName}</h2>
                //             <img className="circuitImg" src={circuitTracks[raceName]} alt={raceCountry + " Track"} />
                //         </div>
                //     </div>
                // </div>
