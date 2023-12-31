import { RedirectToSignup, SubmitButton } from "../../features/Buttons";
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/interface/logos/logo_notext_vector.svg";

export default function LogIn() {

    // SET NAVIGATE
    const navigate = useNavigate();

    // SET STATES
    // For data packet to be sent to database
    const [loginFormValues, setLoginFormValues] = useState({
        email: '',
        password: ''
    });
    // For validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // For submission modal
    const [formSubmitted, setFormSubmitted] = useState(false);

    // SET FORM VALUES TO ENTERED VALUES
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setLoginFormValues({
            ...loginFormValues,
            [name]: value,
        });

        // Email validation
        if (name === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(value) ? '' : '* Must be a valid email address');
        }
        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
    };

    // HANDLE FORM SUBMISSION
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors
        if (emailError || passwordError) {
            // If there are errors, do not submit the form
            alert('Please ensure all fields are filled out correctly.');
            return;
        } else {
            setFormSubmitted(true);
        }

        try {
            const response = await fetch('/api/accounts/LogIn.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(loginFormValues),
            });
      
            // Handle relative responses and edit modal message.
            if (response.ok) {
                const responseData = await response.json();
                const username = responseData.userRecord.username;
                const userID = responseData.userRecord._id;

                sessionStorage.setItem('Username', username);
                sessionStorage.setItem('UserID', userID);

                // Redirect user to login page if sign up successful
                navigate('/');

              } else if (response.status === 400) {
                  setFormSubmitted(false);
                  setEmailError('* Email address not recognised.');
              } else if (response.status === 401) {
                  setFormSubmitted(false);
                  setPasswordError('* Incorrect password.');
              } else {
                alert('Login failed, please try again later.');
                setFormSubmitted(false);
              }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        
    };

    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/" className="gateway_page_logo_link">
                    <img src={logo} alt="GridLock Logo" className="logo_img" />
                    <h1 className="logo_text">gridlock</h1>
                </Link>
            </header>
            <main className="gateway_page_main">
                <h1 className="gateway_page_title">Log in</h1>
                {formSubmitted ? (
                    <div className="submission_processing">
                        <div className="loader"></div>
                    </div>
                ) : 
                <form action="" className="gateway_page_form" onSubmit={handleSubmit}>
                    <div className="gateway_page_email_input">
                        {/* <label htmlFor="email">Email</label> */}
                        <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Email Address" 
                        required 
                        className="gateway_page_form_input"
                        onChange={handleInputChange}
                         />
                        {emailError && <div className="error-message">{emailError}</div>}
                    </div>
                    <div className="gateway_page_password_input">
                        {/* <label htmlFor="password">Password</label> */}
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Password" 
                        required 
                        className="gateway_page_form_input"
                        onChange={handleInputChange}
                         />
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    <SubmitButton />
                    <div className="forgot-password-message">
                        <Link to='/forgotpassword' className="forgot-password-link">
                            Forgot Password?
                        </Link>
                    </div>
                </form>
                }
                <RedirectToSignup />
            </main>
        </section>

    )
}