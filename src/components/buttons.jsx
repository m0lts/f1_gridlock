import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "../assets/global.css";


// Handle logout
function handleLogout() {
    localStorage.removeItem('Username');
    window.location.reload();
}

// Check if user is logged in - if truthy, return login, else return logout.
function Icon({isLoggedIn}) {
    if (isLoggedIn) {
        return <span onClick={handleLogout}>
            <FontAwesomeIcon icon={faUser} /> Log Out
            </span>;
    }
    return <span>
        <Link to='/login'>
            <FontAwesomeIcon icon={faUser} /> Log In
        </Link>
        </span>;
}

function SignupIcon({isLoggedIn}) {
    if (isLoggedIn) {
        return 
        (<span className="hideSignUpBtn">
        </span>);
    }
    return (<span>
        <Link to='/signup'>
            <FontAwesomeIcon icon={faUser} /> Sign Up
        </Link>
        </span>);
}


export function SignUpBtn() {
    const isLoggedIn = localStorage.getItem('Username') !== null;

    if (isLoggedIn) {
        return null; // Return nothing to hide the button
    }
    return (
        <button className="btn signUpBtn">
            <SignupIcon isLoggedIn={localStorage.getItem('Username') !== null} />
        </button>
    )
}

export function LoginBtn() {
    return (
        <button className="btn loginBtn">
            <Icon isLoggedIn={localStorage.getItem('Username') !== null} />
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