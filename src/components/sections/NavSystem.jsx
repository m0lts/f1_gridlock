import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faListCheck, faRankingStar, faCircleInfo, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Header from './Header';
import './nav_system.css'

export default function NavSystem() {

    const location = useLocation();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    // const [selectedTab, setSelectedTab] = useState('Races');

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
                <nav className='nav_tabs_container'>
                <ul className='nav_tabs_list'>
                        <NavLink 
                            exact={true}
                            to={'/'}
                            className={`nav_tab ${location.pathname === '/' ? 'active' : ''}`} 
                        >
                            <FontAwesomeIcon icon={faCalendar} className='nav_tab_icon' />
                        </NavLink>
                        <NavLink 
                            to={'/predictions'}
                            className={`nav_tab ${location.pathname === '/predictions' ? 'active' : ''}`} 
                        >
                            <FontAwesomeIcon icon={faListCheck} className='nav_tab_icon' />
                        </NavLink>
                        <NavLink 
                            to={'/standings'}
                            className={`nav_tab ${location.pathname === '/standings' ? 'active' : ''}`} 
                        >
                            <FontAwesomeIcon icon={faRankingStar} className='nav_tab_icon' />
                        </NavLink>
                        <NavLink 
                            to={'/information'}
                            className={`nav_tab ${location.pathname === '/information' ? 'active' : ''}`} 
                        >
                            <FontAwesomeIcon icon={faCircleInfo} className='nav_tab_icon' />
                        </NavLink>
                    </ul>
                </nav>
        ) : (
                <nav className='nav_tabs_container'>
                    <ul className='nav_tabs_list'>
                        <NavLink 
                            exact={true}
                            to={'/'}
                            className={`nav_tab ${location.pathname === '/' ? 'active' : ''}`} 
                        >
                            Races
                        </NavLink>
                        <NavLink 
                            to={'/predictions'}
                            className={`nav_tab ${location.pathname === '/predictions' ? 'active' : ''}`} 
                        >
                            Predictions
                        </NavLink>
                        <NavLink 
                            to={'/standings'}
                            className={`nav_tab ${location.pathname === '/standings' ? 'active' : ''}`} 
                        >
                            Standings
                        </NavLink>
                        <NavLink 
                            to={'/information'}
                            className={`nav_tab ${location.pathname === '/information' ? 'active' : ''}`} 
                        >
                            Information
                        </NavLink>
                    </ul>
                </nav>
        )}
        </>
    )
}
