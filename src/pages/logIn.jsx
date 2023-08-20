import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function LogIn() {
    // const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const { register, 
        control, 
        handleSubmit,
        watch,
        formState: {errors}, } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/process-login.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
        
            if (response.ok) {
                const responseData = await response.json();
                const userEmail = responseData.userEmail;
                const userPassword = responseData.userPassword;
                const userFirstName = responseData.userFirstName;
                const userSecondName = responseData.userSecondName;
                const userUsername = responseData.userUsername;
        
                if (userEmail && userPassword) {
                    console.log('Login successful');
                    localStorage.setItem('Username', userUsername)
                    navigate('/');
                  }
              } else {
                const responseData = await response.json();
                const errorMessage = responseData.message;
                console.log(errorMessage);
              }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                <label htmlFor="email">Email Address:
                    <input {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}
                </label>
                <label htmlFor="password">Password:
                <input {...register("password", { required: true, maxLength: 30, minLength: 8 })} />
                {errors.password && <span>Error</span>}
            </label>
            <button>Submit</button>
            </form>
        </>
    )
}