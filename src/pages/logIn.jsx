import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SubmitBtn } from "../components/buttons";


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
            const response = await fetch('/api/mongodb_test.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
        
            // if (response.ok) {
            //     const responseData = await response.json();
            //     const userEmail = responseData.userEmail;
            //     const userPassword = responseData.userPassword;
            //     const userFirstName = responseData.userFirstName;
            //     const userSecondName = responseData.userSecondName;
            //     const userUsername = responseData.userUsername;
        
            //     if (userEmail && userPassword) {
            //         console.log('Login successful');
            //         localStorage.setItem('Username', userUsername)
            //         navigate('/');
            //         window.location.reload();
            //       }
            //   } else {
            //     const responseData = await response.json();
            //     const errorMessage = responseData.message;
            //     console.log(errorMessage);
            //   }

            if (response.ok) {
                console.log('Successfully uploaded to mongodb')
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
        <section className="formPages">
            <h1 className="formPageHeadings">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="forms">
                <div className="formFieldCont">
                    <label htmlFor="email">Email Address:</label>
                    <input className="inputField wider" {...register("email", { required: true })} />
                    {errors.email && <span className="errorField">*This field is required</span>}
                </div>
                <div className="formFieldCont">
                <label htmlFor="password">Password:</label>
                <input className="inputField wider" {...register("password", { required: true, maxLength: 30, minLength: 8 })} />
                {errors.password && <span className="errorField">*Error</span>}
                </div>
            <SubmitBtn />
            </form>
        </section>
    )
}