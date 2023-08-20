import { Form, useForm } from "react-hook-form"

export default function SignUp() {

    const { register, 
        control, 
        handleSubmit,
        watch,
        formState: {errors}, } = useForm();

        // TAKE A LOOK AT THE VALIDATION - ITS NOT WORKING

        const validatePassword = (value) => {
            console.log('Validating password:', value);
            let isValid = true;
            let message = '';

            if (!value) {
            isValid = false;
            message = 'This field is required';
            } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
            isValid = false;
            message = 'Password must include at least one letter and one number';
            } else if (value.length < 8) {
            isValid = false;
            message = 'Password must be at least 8 characters long';
            }

            
            return { isValid, message };
          };
        
          const watchPassword = watch("password");
          
          const validatePasswordMatch = (value) => {
            let isValid = true;
            let message = '';
        
            if (value !== watchPassword) {
              isValid = false;
              message = 'Passwords must match';
            }
        
            return { isValid, message };
          };

          const onSubmit = async (data) => {
            try {
              const response = await fetch('/api/create-account.js', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
        
              if (response.ok) {
                // Handle successful submission
                alert('Your application is updated.');
              } else {
                // Handle submission error
                alert('Submission has failed.');
              }
            } catch (error) {
              console.error('Error submitting form:', error);
            }
          };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              control={control}
              className="signUpForm"
        >
            <label htmlFor="firstName">First Name:
                <input {...register("firstName", { required: true, maxLength: 30 })} />
                {errors.firstName && <span>This field is required</span>}
            </label>
            <label htmlFor="secondName">Surname:
                <input {...register("secondName", { required: true, maxLength: 30 })} />
                {errors.secondName && <span>This field is required</span>}
            </label>
            <label htmlFor="username">Choose a username:
                <input {...register("username", { required: true, maxLength: 30 })} />
                {errors.username && <span>This field is required</span>}
            </label>
            <label htmlFor="email">Email Address:
                <input {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}
            </label>
            <label htmlFor="phoneNumber">Phone Number:
                <input {...register("phoneNumber", { required: true })} />
            </label>
            <label htmlFor="password">Password:
                <input {...register("password", { required: true, maxLength: 30, minLength: 8, validate: validatePassword  })} />
                {errors.password && <span>{errors.password.message}</span>}
            </label>
            <label htmlFor="passwordVerify">Repeat password:
                <input {...register("passwordVerify", { required: true, maxLength: 30, minLength: 8, validate: validatePasswordMatch  })} />
                {errors.passwordVerify && <span>{errors.passwordVerify.message}</span>}
            </label>
            <button>Submit</button>

        </form>

    )
}