import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faRankingStar, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Footer from './Footer';
import Information from '../pages/information/Information'
import Races from '../pages/races/Races';
import Standings from '../Pages/Standings/standings';
import Predictions from '../pages/predictions/Predictions';



import './nav_tabs.css'

export default function Body() {

    const [selectedTab, setSelectedTab] = useState('Races');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        {isMobile ? (
            <>
                <Header />
                <main className='appBackground'>
                    {selectedTab === 'Races' && <Races />}
                    {selectedTab === 'Predictions' && <Predictions />}
                    {selectedTab === 'Standings' && <Standings />}
                    {selectedTab === 'Information' && <Information />}
                </main>
                <nav className='nav_tabs_container'>
                    <ul className='nav_tabs_list'>
                        <li className={`nav_tab ${selectedTab === 'Races' ? 'active' : ''}`} onClick={() => handleTabClick('Races')}>
                            <FontAwesomeIcon icon={faCalendar} className='nav_tab_icon' />
                        </li>
                        <li className={`nav_tab ${selectedTab === 'Predictions' ? 'active' : ''}`} onClick={() => handleTabClick('Predictions')}>
                            <FontAwesomeIcon icon={faListCheck} className='nav_tab_icon' />
                        </li>
                        <li className={`nav_tab ${selectedTab === 'Standings' ? 'active' : ''}`} onClick={() => handleTabClick('Standings')}>
                            <FontAwesomeIcon icon={faRankingStar} className='nav_tab_icon' />
                        </li>
                        <li className={`nav_tab ${selectedTab === 'Information' ? 'active' : ''}`} onClick={() => handleTabClick('Information')}>
                            <FontAwesomeIcon icon={faCircleInfo} className='nav_tab_icon' />
                        </li>
                    </ul>
                </nav>
            </>
        ) : (
            <>
                <Header />
                <nav className='nav_tabs_container'>
                    <ul className='nav_tabs_list'>
                        <li className={`nav_tab ${selectedTab === 'Races' ? 'active' : ''}`} onClick={() => handleTabClick('Races')}>
                            <FontAwesomeIcon icon={faCalendar} className='nav_tab_icon' /> Races
                        </li>
                        <li className={`nav_tab ${selectedTab === 'Predictions' ? 'active' : ''}`} onClick={() => handleTabClick('Predictions')}>
                            <FontAwesomeIcon icon={faListCheck} className='nav_tab_icon' /> Predictions
                        </li>
                        <li className={`nav_tab ${selectedTab === 'Standings' ? 'active' : ''}`} onClick={() => handleTabClick('Standings')}>
                            <FontAwesomeIcon icon={faRankingStar} className='nav_tab_icon' /> Standings
                        </li>
                        <li className={`nav_tab ${selectedTab === 'Information' ? 'active' : ''}`} onClick={() => handleTabClick('Information')}>
                            <FontAwesomeIcon icon={faCircleInfo} className='nav_tab_icon' /> Information
                        </li>
                    </ul>
                </nav>
                <main className='appBackground'>
                    {selectedTab === 'Races' && <Races />}
                    {selectedTab === 'Predictions' && <Predictions />}
                    {selectedTab === 'Standings' && <Standings />}
                    {selectedTab === 'Information' && <Information />}
                </main>
            </>
        )}
        </>
    )
}
