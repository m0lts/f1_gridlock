import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faRankingStar, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import './nav_system.css'

export default function NavSystem() {

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
                    <Outlet />
                </main>
                <nav className='nav_tabs_container'>
                <ul className='nav_tabs_list'>
                        <Link 
                        to={'/'}
                        className={`nav_tab ${selectedTab === 'Races' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Races')}
                        >
                            <FontAwesomeIcon icon={faCalendar} className='nav_tab_icon' />
                        </Link>
                        <Link 
                        to={'/predictions'}
                        className={`nav_tab ${selectedTab === 'Predictions' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Predictions')}
                        >
                            <FontAwesomeIcon icon={faListCheck} className='nav_tab_icon' />
                        </Link>
                        <Link 
                        to={'/standings'}
                        className={`nav_tab ${selectedTab === 'Standings' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Standings')}
                        >
                            <FontAwesomeIcon icon={faRankingStar} className='nav_tab_icon' />
                        </Link>
                        <Link 
                        to={'/information'}
                        className={`nav_tab ${selectedTab === 'Information' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Information')}
                        >
                            <FontAwesomeIcon icon={faCircleInfo} className='nav_tab_icon' />
                        </Link>
                    </ul>
                </nav>
            </>
        ) : (
            <>
                <Header />
                <nav className='nav_tabs_container'>
                    <ul className='nav_tabs_list'>
                        <Link 
                        to={'/'}
                        className={`nav_tab ${selectedTab === 'Races' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Races')}
                        >
                            <FontAwesomeIcon icon={faCalendar} className='nav_tab_icon' /> Races
                        </Link>
                        <Link 
                        to={'/predictions'}
                        className={`nav_tab ${selectedTab === 'Predictions' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Predictions')}
                        >
                            <FontAwesomeIcon icon={faListCheck} className='nav_tab_icon' /> Predictions
                        </Link>
                        <Link 
                        to={'/standings'}
                        className={`nav_tab ${selectedTab === 'Standings' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Standings')}
                        >
                            <FontAwesomeIcon icon={faRankingStar} className='nav_tab_icon' /> Standings
                        </Link>
                        <Link 
                        to={'/information'}
                        className={`nav_tab ${selectedTab === 'Information' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('Information')}
                        >
                            <FontAwesomeIcon icon={faCircleInfo} className='nav_tab_icon' /> Information
                        </Link>
                    </ul>
                </nav>
                <main className='appBackground'>
                    <Outlet />
                </main>
            </>
        )}
        </>
    )
}
