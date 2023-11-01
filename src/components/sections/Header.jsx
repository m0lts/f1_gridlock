import logo from "../../assets/interface/logos/logo_notext_vector.svg";
import { SignUpBtn } from "../features/Buttons";
import { LoginBtn } from "../features/Buttons";
import { Link } from "react-router-dom";
import './header.css'

export default function Header() {
    return (
        <header>
            <div className="headerLeftFlex">
                <Link to='/'>
                    <img src={logo} alt="GridLock Logo" className="logoImg" />
                </Link>

            </div>
            <div className="headerRightFlex">
                <SignUpBtn />
                <LoginBtn />
            </div>
        </header>
    )
}