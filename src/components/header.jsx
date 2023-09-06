import React from "react";
import logo from "../assets/interface/logos/logo_notext_vector.svg";
import { SignUpBtn } from "./buttons";
import { LoginBtn } from "./buttons";
import { Link } from "react-router-dom";
import "../assets/global.css";

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