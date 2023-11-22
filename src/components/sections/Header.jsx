import logo from "../../assets/interface/logos/logo_notext_vector.svg";
import { SignUpBtn } from "../features/Buttons";
import { LoginBtn } from "../features/Buttons";
import { Link } from "react-router-dom";
import NavSystem from "./NavSystem";
import './header.css'
import { useState, useEffect } from "react";

export default function Header() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

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
        <header>
            <div className="header_top_flex">
                <div className="header_left_flex">
                    <Link to='/' className="home_link">
                        <img src={logo} alt="GridLock Logo" className="logo_img" />
                        <h1 className="logo_text">gridlock</h1>
                    </Link>
                </div>
                <div className="headerRightFlex">
                    <LoginBtn />
                    <SignUpBtn />
                </div>
            </div>
            <div className="header_bottom_flex">
                <NavSystem />
            </div>
    </header>

        ) : (

        <header>
            <div className="header_left_flex">
                <Link to='/' className="home_link">
                    <img src={logo} alt="GridLock Logo" className="logo_img" />
                    <h1 className="logo_text">gridlock</h1>
                </Link>
            </div>
            <div className="header_middle_flex">
                <NavSystem />
            </div>
            <div className="headerRightFlex">
                <LoginBtn />
                <SignUpBtn />
            </div>
        </header>
        )}
        </>
    )
}