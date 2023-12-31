import { Link } from "react-router-dom"
import { SubmitButton } from "../../features/Buttons";
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import logo from "../../../assets/interface/logos/logo_notext_vector.svg";

export default function ResetPassword() {

    const navigate = useNavigate();


    const [formSubmitted, setFormSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [formValues, setFormValues] = useState({
        password: '',
        verify_password: '',
        token: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
            });
        
        // Password validation
        if (name === 'password') {
            const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPasswordError(passwordPattern.test(value) ? '' : '* Password must be at least 8 characters long, contain a capital letter, and a number');
        }
        // Verify password validation
        if (name === 'verify_password' || name === 'password') {
            setVerifyPasswordError(value === formValues.password ? '' : '* Passwords do not match');
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors
        if (passwordError || verifyPasswordError) {
            // If there are errors, do not submit the form
            alert('Please ensure all fields are filled out correctly.');
            return;
        } else {
            setFormSubmitted(true);
        }

        try {
            const response = await fetch('/api/accounts/ResetPassword.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
            });
      
            // Handle the response from the backend
            if (response.ok) {
              // Password reset was successful
                setFormSubmitted(false);
                navigate('/login');
            } else {
              console.error('Password reset failed:', response.statusText);
              setFormSubmitted(false);
            }
          } catch (error) {
            console.error('An error occurred during password reset:', error);
          }


    }



    return (
        <section className="gateway_page_body">
            <header className="gateway_page_header">
                <Link to="/" className="gateway_page_logo_link">
                    <img src={logo} alt="GridLock Logo" className="logo_img" />
                    <h1 className="logo_text">gridlock</h1>
                </Link>
            </header>
            <main className="gateway_page_main">
                <h1 className="gateway_page_title">Reset Password</h1>
                {formSubmitted ? (
                    <div className="submission_processing">
                    <div className="loader"></div>
                    </div>
                ) : (
                    <form action="" className="gateway_page_form" onSubmit={handleSubmit}>
                        <div className="gateway_page_token_input">
                        {/* <label htmlFor="password">Password</label> */}
                        <input 
                        type="text" 
                        id="token" 
                        name="token" 
                        placeholder="Unique Code" 
                        required={true}
                        className="gateway_page_form_input" 
                        value={formValues.token}
                        onChange={handleInputChange}
                        />
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
                        onChange={handleInputChange}
                        />
                        {verifyPasswordError && <div className="error-message">{verifyPasswordError}</div>}
                    </div>
                    <SubmitButton />
                    </form>
                )}
            </main>
        </section>
    )
}