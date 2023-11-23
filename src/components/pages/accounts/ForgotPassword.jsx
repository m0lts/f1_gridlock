import { Link } from "react-router-dom"
import { SubmitButton } from "../../features/Buttons";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/interface/logos/logo_notext_vector.svg";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
    });
    const [emailError, setEmailError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {
        const emailInput = event.target.value;

        if (emailInput) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(emailInput) ? '' : '* Must be a valid email address');
        }
        setFormData({
            email: emailInput
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for errors
        if (emailError) {
            // If there are errors, do not submit the form
            alert('Please ensure all fields are filled out correctly.');
            return;
        } else {
            setFormSubmitted(true);
        }

        try {
            const response = await fetch('/api/accounts/ForgotPassword.js', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            // Handle relative responses and edit modal message.
            if (response.ok) {
                setSuccess(true);
                navigate('/resetpassword');
              } else if (response.status === 400) {
                setFormSubmitted(false);
                setEmailError('* Email address not registered.')
              }
              else {
                setFormSubmitted(false);
                setSuccess(false);
              }
          } catch (error) {
            console.error('Error submitting form:', error);
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
                <h1 className="gateway_page_title">Forgot Password</h1>
                {!success && (
                    <p className="gateway_page_message">
                        Please enter the email address associated with your account below.
                    </p>
                    )}
                {success ? (
                    <p className="gateway_page_message">If there is an account associated with that email address, you will receive an email with instructions on how to reset your password.
                    <Link to='/'>
                        Return home here.
                    </Link>
                    </p>
                ) : formSubmitted ? (
                    <div className="submission_processing">
                    <div className="loader"></div>
                    </div>
                ) : (
                    <form action="" className="gateway_page_form" onSubmit={handleSubmit}>
                    <div className="gateway_page_email_input">
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
                    <SubmitButton />
                    </form>
                )}
            </main>
        </section>
    )
}