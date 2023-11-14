import { useState, useRef, useEffect } from 'react'
import RaceRound from './RaceRound'
import { SeasonSchedule } from '../../../hooks/ErgastAPIQueries';
import { circuitFlags } from '../../../data/CircuitInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './races.css'

export default function Races({ returnedApiData }) {

    // Assign rounds to activeRound if clicked
    const [activeUpcomingRound, setActiveUpcomingRound] = useState();
    const [activePreviousRound, setActivePreviousRound] = useState();
    const [activePostponedRound, setActivePostponedRound] = useState();
    const [activeCancelledRound, setActiveCancelledRound] = useState();
    const toggleUpcomingRound = (index) => {
        if (activeUpcomingRound === index + 1) {
          setActiveUpcomingRound(null);
        } else {
          setActiveUpcomingRound(index + 1);
        }
    };
    const togglePreviousRound = (index) => {
        if (activePreviousRound === index + 1) {
          setActivePreviousRound(null);
        } else {
          setActivePreviousRound(index + 1);
        }
    };
    const togglePostponedRound = (index) => {
        if (activePostponedRound === index + 1) {
          setActivePostponedRound(null);
        } else {
          setActivePostponedRound(index + 1);
        }
    };
    const toggleCancelledRound = (index) => {
        if (activeCancelledRound === index + 1) {
          setActiveCancelledRound(null);
        } else {
          setActiveCancelledRound(index + 1);
        }
    };

    // Sort data into correct array
    const competitionRaces = returnedApiData.filter(event => event.type === 'Race');
    const scheduledRaces = competitionRaces
    .map((event, index) => ({ ...event, originalIndex: index + 1 })) // Adding originalIndex property so that round number is correct
    .filter(event => event.status === 'Scheduled');

    const completedRaces = competitionRaces
    .map((event, index) => ({ ...event, originalIndex: index + 1 })) // Adding originalIndex property so that round number is correct
    .filter(event => event.status === 'Completed');

    const postponedRaces = competitionRaces
    .map((event, index) => ({ ...event, originalIndex: index + 1 })) // Adding originalIndex property so that round number is correct
    .filter(event => event.status === 'Postponed');

    const cancelledRaces = competitionRaces
    .map((event, index) => ({ ...event, originalIndex: index + 1 })) // Adding originalIndex property so that round number is correct
    .filter(event => event.status === 'Cancelled');


    return (
        <>
        {!returnedApiData ? (
            <section className="homepage_loader">
                    <div className="loader"></div>
            </section>
        ) : (
            <section className="races_carousel">
            <ul>
                <li className="race_carousel_dividers">Next Race</li>
                {scheduledRaces.length > 0 && (
                    <li 
                        key={scheduledRaces[0].originalIndex}
                        className='race_round active_race_round'
                        >
                        <RaceRound
                            apiData={returnedApiData}
                            competitionToShow={scheduledRaces[0].competition.name}
                            roundNumber={scheduledRaces[0].originalIndex}
                        /> 
                    </li>
                )}
                <li className="race_carousel_dividers">Upcoming races</li>
                {scheduledRaces.slice(1).map((round, index) => (
                    <li 
                        key={index}
                        className='race_round'
                        onClick={() => toggleUpcomingRound(index)}
                    >
                        <div 
                        className={activeUpcomingRound === index + 1 ? 'active_race_round' : ''}
                        >
                        {activeUpcomingRound === index + 1 ? (
                            <RaceRound
                                apiData={returnedApiData}
                                competitionToShow={round.competition.name}
                                roundNumber={round.originalIndex}
                            />
                        ) : (
                        <div className='inactive_race_round'>
                            <p className='inactive_race_round_heading'>
                                <span className='inactive_race_round_heading_text'>Round </span>
                                <span className='inactive_race_round_heading_number'>{round.originalIndex}</span>
                            </p>
                            <figure className='inactive_race_round_img_cont'>
                                <img
                                className='inactive_race_round_img'
                                src={round.competition.location.country ? circuitFlags[round.competition.location.country] : ''}
                                alt={round.competition.location.country ? round.competition.location.country + " Flag" : ''}
                                />
                            </figure>
                            <h2 className="inactive_race_round_race_title">
                                {round.competition.name || 'Race Name Not Available'}
                            </h2>
                            <div className="inactive_race_round_chevrons">
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                            </div>
                        </div>
                        )}
                        </div>
                    </li>
                ))}
                <li className="race_carousel_dividers">Previous Races</li>
                {completedRaces.map((round, index) => (
                    <li 
                        key={index}
                        className='race_round'
                        onClick={() => togglePreviousRound(index)}
                    >
                        <div 
                        className={activePreviousRound === index + 1 ? 'active_race_round' : ''}
                        >
                        {activePreviousRound === index + 1 ? (
                            <RaceRound
                                apiData={returnedApiData}
                                competitionToShow={round.competition.name}
                                roundNumber={round.originalIndex}
                                raceComplete={true}
                            />
                        ) : (
                        <div className='inactive_race_round'>
                            <p className='inactive_race_round_heading'>
                                <span className='inactive_race_round_heading_text'>Round </span>
                                <span className='inactive_race_round_heading_number'>{round.originalIndex}</span>
                            </p>
                            <figure className='inactive_race_round_img_cont'>
                                <img
                                className='inactive_race_round_img'
                                src={round.competition.location.country ? circuitFlags[round.competition.location.country] : ''}
                                alt={round.competition.location.country ? round.competition.location.country + " Flag" : ''}
                                />
                            </figure>
                            <h2 className="inactive_race_round_race_title">
                                {round.competition.name || 'Race Name Not Available'}
                            </h2>
                            <div className="inactive_race_round_chevrons">
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                            </div>
                        </div>
                        )}
                        </div>
                    </li>
                ))}
                {postponedRaces.length > 0 && (
                    <>
                    <li className="race_carousel_dividers">Postponed Races</li>
                    {postponedRaces.map((round, index) => (
                        <li 
                            key={index}
                            className='race_round'
                            onClick={() => togglePostponedRound(index)}
                        >
                            <div 
                            className={activePostponedRound === index + 1 ? 'active_race_round' : ''}
                            >
                            {activePostponedRound === index + 1 ? (
                                <RaceRound
                                    apiData={returnedApiData}
                                    competitionToShow={round.competition.name}
                                    roundNumber={round.originalIndex}
                                />
                            ) : (
                            <div className='inactive_race_round'>
                                <p className='inactive_race_round_heading'>
                                    <span className='inactive_race_round_heading_text'>Round </span>
                                    <span className='inactive_race_round_heading_number'>{round.originalIndex}</span>
                                </p>
                                <figure className='inactive_race_round_img_cont'>
                                    <img
                                    className='inactive_race_round_img'
                                    src={round.competition.location.country ? circuitFlags[round.competition.location.country] : ''}
                                    alt={round.competition.location.country ? round.competition.location.country + " Flag" : ''}
                                    />
                                </figure>
                                <h2 className="inactive_race_round_race_title">
                                    {round.competition.name || 'Race Name Not Available'}
                                </h2>
                                <div className="inactive_race_round_chevrons">
                                    <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                    <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                    <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                </div>
                            </div>
                            )}
                            </div>
                        </li>
                    ))}
                    </>
                )}
                {cancelledRaces.length > 0 && (
                    <>
                    <li className="race_carousel_dividers">Cancelled Races</li>
                    {cancelledRaces.map((round, index) => (
                        <li 
                            key={index}
                            className='race_round'
                            onClick={() => toggleCancelledRound(index)}
                        >
                            <div 
                            className={activeCancelledRound === index + 1 ? 'active_race_round' : ''}
                            >
                            {activeCancelledRound === index + 1 ? (
                                <RaceRound
                                    apiData={returnedApiData}
                                    competitionToShow={round.competition.name}
                                    roundNumber={round.originalIndex}
                                />
                            ) : (
                            <div className='inactive_race_round'>
                                <p className='inactive_race_round_heading'>
                                    <span className='inactive_race_round_heading_text'>Round </span>
                                    <span className='inactive_race_round_heading_number'>{round.originalIndex}</span>
                                </p>
                                <figure className='inactive_race_round_img_cont'>
                                    <img
                                    className='inactive_race_round_img'
                                    src={round.competition.location.country ? circuitFlags[round.competition.location.country] : ''}
                                    alt={round.competition.location.country ? round.competition.location.country + " Flag" : ''}
                                    />
                                </figure>
                                <h2 className="inactive_race_round_race_title">
                                    {round.competition.name || 'Race Name Not Available'}
                                </h2>
                                <div className="inactive_race_round_chevrons">
                                    <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                    <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                    <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                </div>
                            </div>
                            )}
                            </div>
                        </li>
                    ))}
                    </>
                )}
                
            </ul>
        </section>
        )}
        </>
    )
}
