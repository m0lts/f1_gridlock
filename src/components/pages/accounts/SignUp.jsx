import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { SubmitButton, RedirectToLogin } from "../../features/Buttons";
import logo from "../../../assets/interface/logos/logo_notext_vector.svg";


export default function SignUp() {

    // SET UP NAVIGATE
    const navigate = useNavigate();

    // SET STATES
    // For data packet to be sent to database
    const [formValues, setFormValues] = useState({
        forename: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        verify_password: '',
    });
    // For validation errors
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    // For submission modal
    const [formSubmitted, setFormSubmitted] = useState(false);


    
    // SET FORM VALUES TO ENTERED VALUES
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
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
        // Verify password validation
        if (name === 'verify_password' || name === 'password') {
            setVerifyPasswordError(value === formValues.password ? '' : '* Passwords do not match');
        }
    };
    


    // HANDLE FORM SUBMISSION
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors
        if (emailError || passwordError || verifyPasswordError) {
            // If there are errors, do not submit the form
            alert('Please ensure all fields are filled out correctly.');
            return;
        } else {
            setFormSubmitted(true);
        }

        try {
            const response = await fetch('/api/accounts/SignUp.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
            });
      
            // Handle relative responses and edit modal message.
            if (response.ok) {
                // Redirect user to login page if sign up successful
                navigate('/login');
              } else if (response.status === 400) {
                // Email already taken
                setEmailError('* Email already in use.');
                setFormSubmitted(false);
              } else if (response.status === 401) {
                // Username already taken
                setUsernameError('* Username taken.');
                setFormSubmitted(false);
              } else {
                alert('Account creation failed, please try again later.');
                setFormSubmitted(false);
              }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        
    };


    return (
        <section className="gateway_page_body"> 
        {/* omment */}
            <header className="gateway_page_header">
                <Link to="/" className="gateway_page_logo_link">
                    <img src={logo} alt="GridLock Logo" className="logo_img" />
                    <h1 className="logo_text">gridlock</h1>
                </Link>
            </header>
            <main className="gateway_page_main">
                <h1 className="gateway_page_title">Sign Up</h1>
                {formSubmitted ? (
                    <div className="submission_processing">
                        <div className="loader"></div>
                    </div>
                ) : 
                <form action="post" className="gateway_page_form" onSubmit={handleSubmit}>
                    <div className="gateway_page_name_inputs">
                        <div className="gateway_page_forename_input">
                            {/* <label htmlFor="forename">First Name</label> */}
                            <input 
                                type="text" 
                                id="forename" 
                                name="forename" 
                                placeholder="First Name" 
                                required={true}
                                className="gateway_page_form_input"
                                value={formValues.forename}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="gateway_page_surname_input">
                            {/* <label htmlFor="surname">Second Name</label> */}
                            <input 
                                type="text" 
                                id="surname" 
                                name="surname" 
                                placeholder="Second Name" 
                                required={true}
                                className="gateway_page_form_input"
                                value={formValues.surname}
                                onChange={handleInputChange}
                                />
                        </div>
                    </div>
                    <div className="gateway_page_username_input">
                        {/* <label htmlFor="surname">Second Name</label> */}
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Username" 
                            required={true}
                            className="gateway_page_form_input"
                            value={formValues.username}
                            onChange={handleInputChange}
                            />
                            {usernameError && <div className="error-message">{usernameError}</div>}
                    </div>
                    <div className="gateway_page_email_input">
                        {/* <label htmlFor="email">Email</label> */}
                        <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Email Address" 
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.email}
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
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.password}
                        onChange={handleInputChange}
                        />
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    <div className="gateway_page_verify_password_input">
                        {/* <label htmlFor="verify_password">Repeat Password</label> */}
                        <input 
                        type="password" 
                        id="verify_password" 
                        name="verify_password" 
                        placeholder="Repeat Password" 
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.verify_password}
                        onChange={handleInputChange}
                        />
                        {verifyPasswordError && <div className="error-message">{verifyPasswordError}</div>}
                    </div>
                    <SubmitButton />
                </form>
                }
                <RedirectToLogin />
            </main>
        </section>

    )
}