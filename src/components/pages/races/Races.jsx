import { useState, useRef, useEffect } from 'react'
import GrandPrix from './GrandPrix'
import { SeasonSchedule, NextRaceInformation } from '../../../hooks/ErgastAPIQueries';
import { circuitFlags } from '../../../data/CircuitInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './races.css'

export default function Races() {

    const rounds = SeasonSchedule();

    useEffect(() => {
        async function fetchRoundNumber() {
            try {
                const response = await fetch('https://ergast.com/api/f1/current/next.json');
                const data = await response.json();
                const deconstructedAPI = data.MRData.RaceTable.Races[0];
                const roundNumber = deconstructedAPI.round;
                const roundNumberInt = parseInt(roundNumber);
                if (typeof roundNumberInt === 'number') {
                    setActiveRound(roundNumberInt);
                } else {
                    console.log('Error: round number is a string.')
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchRoundNumber();
    }, [])

    const [activeRound, setActiveRound] = useState();
    const activeElementRef = useRef(null);

    const handleRoundClick = (number) => {
        setActiveRound(number);
    };

    useEffect(() => {
        if (activeElementRef.current) {
            activeElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

    }, [activeRound]);

    return (
        <section className="races_carousel">
            {Array.from({ length: rounds.length }, (_, i) => (
                <div
                    key={i}
                    className={`race_round ${activeRound === i + 1 ? 'active' : ''}`}
                    onClick={() => handleRoundClick(i + 1)}
                    ref={activeRound === i + 1 ? activeElementRef : null}
                >
                    {activeRound === i + 1 ? (
                        <GrandPrix />
                    ) : (
                        <div className='inactive_race_round'>
                            <p className='inactive_race_round_heading'>
                                <span className='inactive_race_round_heading_text'>Round </span>
                                <span className='inactive_race_round_heading_number'>{i + 1}</span>
                            </p>
                            <figure className='inactive_race_round_img_cont'>
                                <img 
                                className='inactive_race_round_img' 
                                src={rounds[i]?.country ? circuitFlags[rounds[i].country] : ''}
                                alt={rounds[i]?.country ? rounds[i].country + " Flag" : ''} 
                                />
                            </figure>
                            <h2 className="inactive_race_round_race_title">{rounds[i]?.raceName || 'Race Name Not Available'}</h2>
                                <div className="inactive_race_round_chevrons">
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                <FontAwesomeIcon icon={faChevronRight} className='inactive_race_round_chevron' />
                                </div>
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}