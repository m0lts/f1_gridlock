import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import './buttons.css'


// Handle logout
function handleLogout() {
    sessionStorage.removeItem('Username');
    sessionStorage.removeItem('UserID');
    window.location.reload();
}

// Check if user is logged in - if truthy, return login, else return logout.
function Icon({isLoggedIn}) {
    if (isLoggedIn) {
        return <span onClick={handleLogout}>
                Log Out
            </span>;
    }
    return <span>
        <Link to='/login' className="linkBtns">
            Log In
        </Link>
        </span>;
}

function SignupIcon({isLoggedIn}) {
    if (isLoggedIn) {
        return (<span className="hideSignUpBtn">
        </span>);
    }
    return (<span>
        <Link to='/signup' className="linkBtns">
            Sign Up
        </Link>
        </span>);
}


export function SignUpBtn() {
    const isLoggedIn = sessionStorage.getItem('Username') !== null;

    if (isLoggedIn) {
        return null; // Return nothing to hide the button
    }
    return (
        <button className="btn signUpBtn">
            <SignupIcon isLoggedIn={sessionStorage.getItem('Username') !== null} />
        </button>
    )
}

export function LoginBtn() {
    return (
        <button className="btn loginBtn">
            <Icon isLoggedIn={sessionStorage.getItem('Username') !== null} />
        </button>
    )
}

// NEW BUTTONS

export function RedirectToSignup() {
    return (
        <button className="redirect_button btn">
            <Link to="/signup" className="redirect_link">
                New to Gridlock? Click here.
            </Link>
        </button>
    )
}

export function RedirectToLogin() {
    return (
        <button className="redirect_button btn">
            <Link to="/login" className="redirect_link">
                Already have an account? Click here.
            </Link>
        </button>
    )
}


export function SubmitButton() {
    return <input type="submit" className="submit_button btn"/>
}