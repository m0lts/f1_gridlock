import { useState, useRef, useEffect } from 'react'
import RaceRound from './RaceRound'
import { SeasonSchedule } from '../../../hooks/ErgastAPIQueries';
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

    const toggleRound = (index) => {
        if (activeRound === index + 1) {
          setActiveRound(null); // Toggle it off
        } else {
          setActiveRound(index + 1); // Toggle it on
        }
      };


    useEffect(() => {
        if (activeElementRef.current) {
            activeElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

    }, [activeRound]);

    return (
        <section className="races_carousel">
            <ul>
            {rounds.map((round, index) => (
                <li key={index} className='race_round' onClick={() => toggleRound(index)}>
                    <div 
                    className={activeRound === index + 1 ? 'active_race_round' : ''}
                    ref={activeRound === index + 1 ? activeElementRef : null}
                    >
                    {activeRound === index + 1 ? (
                        <RaceRound
                            roundNumberProps={index + 1}
                        />
                    ) : (
                        <div className='inactive_race_round'>
                            <p className='inactive_race_round_heading'>
                                <span className='inactive_race_round_heading_text'>Round </span>
                                <span className='inactive_race_round_heading_number'>{index + 1}</span>
                            </p>
                            <figure className='inactive_race_round_img_cont'>
                                <img
                                className='inactive_race_round_img'
                                src={round.country ? circuitFlags[round.country] : ''}
                                alt={round.country ? round.country + " Flag" : ''}
                                />
                            </figure>
                            <h2 className="inactive_race_round_race_title">
                                {round.raceName || 'Race Name Not Available'}
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
            </ul>
        </section>
    )
}
