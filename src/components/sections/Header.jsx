import logo from "../../assets/interface/logos/logo_notext_vector.svg";
import { SignUpBtn } from "../features/Buttons";
import { LoginBtn } from "../features/Buttons";
import { Link } from "react-router-dom";
import NavSystem from "./NavSystem";
import './header.css'

export default function Header() {
    return (
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
    )
}