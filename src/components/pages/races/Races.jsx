import { useState, useRef, useEffect } from 'react'
import GrandPrix from './GrandPrix'
import './races.css'

export default function Races() {

    // Fill with next race round number using ergast api query
    const [activeRound, setActiveRound] = useState(10);
    const activeElementRef = useRef(null);

    const handleRoundClick = (number) => {
        setActiveRound(number);
    };

    useEffect(() => {
        // When the component mounts, set the active element to the desired default value.
        if (activeElementRef.current) {
            activeElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);


    return (
        <section className="races_carousel">
            {Array.from({ length: 24 }, (_, i) => (
                <div
                    key={i}
                    className={`race_round ${activeRound === i + 1 ? 'active' : ''}`}
                    onClick={() => handleRoundClick(i + 1)}
                    ref={activeRound === i + 1 ? activeElementRef : null}
                >
                    {activeRound === i + 1 ? (
                        <GrandPrix />
                    ) : (
                        <h3>Round: {i + 1}</h3>
                    )}
                </div>
            ))}
        </section>
    )
}