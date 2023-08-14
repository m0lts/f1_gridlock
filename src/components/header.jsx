import React from "react";
import logo from "../assets/interface/logos/logo_whiteflag_blacktext.svg";
import { SignUpBtn } from "./buttons";
import { LoginBtn } from "./buttons";
import "../assets/global.css";

export default function Header() {
    return (
        <header>
            <div className="headerLeftFlex">
                <img src={logo} alt="GridLock Logo" className="logoImg" />
            </div>
            <div className="headerRightFlex">
                <SignUpBtn />
                <LoginBtn />
            </div>
        </header>
    )
}