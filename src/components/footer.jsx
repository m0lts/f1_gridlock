import React from "react";
import logo from "../assets/interface/logos/logo_standard_vector.svg";
import "../assets/global.css";

export default function Footer() {
    return (
        <footer>
            <div className="footerFlex">
                <img src={logo} alt="GridLock logo" className="logoImg" />
                <ul className="footerList">
                    <li className="footerListItem">What is GridLock?</li>
                    <li className="footerListItem">How does GridLock work?</li>
                    <li className="footerListItem">Terms and Conditions</li>
                    <li className="footerListItem">Contact Us</li>
                </ul>
            </div>
            <p className="copyright">Copyright: GridLock 2023. All rights reserved.</p>
        </footer>
    )
}