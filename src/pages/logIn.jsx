import { useForm } from "react-hook-form";

export default function LogIn() {

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
                const responseData = await response.json(); // Parse response JSON
                const user = responseData.user; // Extract user data from response
        
                // Use the user data as needed
                console.log('Password:', user);
        
                alert('Login successful.'); // For example
              } else {
                // Handle submission error
                alert('Submission has failed.');
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