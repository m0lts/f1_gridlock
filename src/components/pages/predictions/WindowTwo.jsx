import { useState } from 'react';
import CircuitInfo from './CircuitInfo';
import ResultLastYear from './ResultLastYear';
import WeatherComponent from './Weather';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";

export default function WindowTwo() {
    // ARRAY CONTAINING COMPONENTS TO BE DISPLAYED IN WINDOW ONE
    const components = [
        <CircuitInfo title="Circuit Information" />,
        <WeatherComponent title="Weather Forecast" />,
        <ResultLastYear title="Result Last Year" />
    ]

    const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

    // HANDLES CLICKING OF ARROWS TO CHANGE COMPONENTS
    const handleNextClick = () => {
        setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % components.length);
    };
    const handlePrevClick = () => {
        setCurrentComponentIndex((prevIndex) => prevIndex === 0 ? components.length - 1 : prevIndex - 1);
    };

    // SETS CURRENT COMPONENT TO BE DISPLAYED
    const currentComponent = components[currentComponentIndex];

    return (
        <section className="windowOne">
            <div className="windowHeadingBanners">
                <div className="windowHeadingTitleAndArrows">
                    <FontAwesomeIcon 
                        icon={faChevronLeft} 
                        onClick={handlePrevClick}
                        className="faArrows" />
                    <h3>{currentComponent.props.title}</h3>
                    <FontAwesomeIcon 
                        icon={faChevronRight}
                        onClick={handleNextClick}
                        className="faArrows" />
                </div>
                <ul className="activeWindowCont">
                        {/* CHANGES DOT STYLE DEPENDING ON WHICH COMPONENT IS SHOWING */}
                        <li className="activeWindowDot">
                            {currentComponentIndex === 0 ? (
                                <FontAwesomeIcon icon={faCircleDot} className="faCircleDot"/>
                            ) : (
                                <FontAwesomeIcon icon={faCircle} className="faCircle" />
                            )}
                        </li>
                        <li className="activeWindowDot">
                            {currentComponentIndex === 1 ? (
                                    <FontAwesomeIcon icon={faCircleDot} className="faCircleDot"/>
                                ) : (
                                    <FontAwesomeIcon icon={faCircle} className="faCircle" />
                                )}
                        </li>
                        <li className="activeWindowDot">
                            {currentComponentIndex === 2 ? (
                                    <FontAwesomeIcon icon={faCircleDot} className="faCircleDot"/>
                                ) : (
                                    <FontAwesomeIcon icon={faCircle} className="faCircle" />
                                )}
                        </li>
                </ul>

            </div>
            <div className="windowContent">
                {currentComponent}
            </div>
        </section>
    )
}