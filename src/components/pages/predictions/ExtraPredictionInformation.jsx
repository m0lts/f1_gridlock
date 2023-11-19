import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { circuitInfo } from '../../../data/CircuitInfo';
import './extra_prediction_information.css';
import { useEffect, useState } from 'react';

export default function ExtraPredictionInfo({ raceInfo }) {

    const [circuitStats, setCircuitStats] = useState();

    useEffect (() => {
        if (raceInfo) {
            setCircuitStats(circuitInfo[raceInfo.circuit.name])
        }

    }, [raceInfo])

    return (
        <div className="predictions_page_section">
            <div className="circuit_stats">
                <h1 className='extra_information_title'>circuit stats</h1>
                {circuitStats ? (
                    <> 
                        <div className='circuit_stat_container'>
                            <p className='circuit_stat_title'>Asphalt Abrasion</p>
                            <ul className='circuit_stats_list'>
                                <li className='circuit_stats_text'>
                                    Low
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['asphalt abrasion'] === 1 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['asphalt abrasion'] === 2 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['asphalt abrasion'] === 3 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['asphalt abrasion'] === 4 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['asphalt abrasion'] === 5 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className='circuit_stats_text'>
                                    High
                                </li>
                            </ul>
                        </div>
                        <div className='circuit_stat_container'>
                            <p className='circuit_stat_title'>Braking</p>
                            <ul className='circuit_stats_list'>
                                <li className='circuit_stats_text'>
                                    Low
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.braking === 1 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.braking === 2 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.braking === 3 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.braking === 4 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.braking === 5 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className='circuit_stats_text'>
                                    High
                                </li>
                            </ul>
                        </div>
                        <div className='circuit_stat_container'>
                            <p className='circuit_stat_title'>Downforce</p>
                            <ul className='circuit_stats_list'>
                                <li className='circuit_stats_text'>
                                    Low
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.downforce === 1 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.downforce === 2 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.downforce === 3 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.downforce === 4 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.downforce === 5 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className='circuit_stats_text'>
                                    High
                                </li>
                            </ul>
                        </div>
                        <div className='circuit_stat_container'>
                            <p className='circuit_stat_title'>Track Evolution</p>
                            <ul className='circuit_stats_list'>
                                <li className='circuit_stats_text'>
                                    Low
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['track evolution'] === 1 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['track evolution'] === 2 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['track evolution'] === 3 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['track evolution'] === 4 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['track evolution'] === 5 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className='circuit_stats_text'>
                                    High
                                </li>
                            </ul>
                        </div>
                        <div className='circuit_stat_container'>
                            <p className='circuit_stat_title'>Traction</p>
                            <ul className='circuit_stats_list'>
                                <li className='circuit_stats_text'>
                                    Low
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.traction === 1 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.traction === 2 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.traction === 3 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.traction === 4 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats.traction === 5 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className='circuit_stats_text'>
                                    High
                                </li>
                            </ul>
                        </div>
                        <div className='circuit_stat_container'>
                            <p className='circuit_stat_title'>Tyre Stress</p>
                            <ul className='circuit_stats_list'>
                                <li className='circuit_stats_text'>
                                    Low
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['tyre stress'] === 1 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['tyre stress'] === 2 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['tyre stress'] === 3 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['tyre stress'] === 4 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className={`circuit_stats_dot ${circuitStats['tyre stress'] === 5 ? 'red' : 'white'}`}>
                                    <FontAwesomeIcon icon={faCircle} />
                                </li>
                                <li className='circuit_stats_text'>
                                    High
                                </li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <p>loading</p>
                )}
            </div>
            <div className="weekend_weather">
                <h1 className='extra_information_title'>weather</h1>
                <p>Weather forecast unavailable</p>
                {/* LOOK AT WEATHER OBJECT WHEN WEEKEND COMES AROUND */}
                {/* {raceInfo.weather ? (
                    <p>{console.log(raceInfo.weather)}</p>
                ) : (
                    <p>Weather forecast unavailable</p>
                )} */}
            </div>
        </div>
    )
}