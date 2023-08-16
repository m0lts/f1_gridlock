import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "../assets/global.css";

// Check if user is logged in - if truthy, return solid icon, else return empty one.
function Icon({isLoggedIn}) {
    if (isLoggedIn) {
        return <span><FontAwesomeIcon icon={faUser} /> Account</span>;
    }
    return <span><FontAwesomeIcon icon={faUser} /> Log In</span>;
}



export function SignUpBtn() {
    return (
        <button className="btn signUpBtn">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <Link to='/signup' className="signUpBtnTxt">Sign Up</Link>
        </button>
    )
}

export function LoginBtn() {
    return (
        <button className="btn loginBtn">
            <Link to='/login'>
                <Icon 
                    isLoggedIn={false}
                />
            </Link>
        </button>
    )
}

export function SubmitBtn({type}) {
    return (
        <button type={type} className="btn submitBtn">
            Submit
        </button>
    )
}