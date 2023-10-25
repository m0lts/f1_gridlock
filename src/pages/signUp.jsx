import { Form, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { SubmitBtn } from "../components/buttons";

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
      <section className="formPages">
        <h1 className="formPageHeadings">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}
              control={control}
              className="forms">
          <div className="formFieldCont">
            <label htmlFor="firstName">First Name</label>
            <input className="inputField" {...register("firstName", { required: true, maxLength: 30 })} />
            {errors.firstName && <span className="errorField">*This field is required</span>}
          </div>
          <div className="formFieldCont">
            <label htmlFor="secondName">Surname</label>
            <input className="inputField" {...register("secondName", { required: true, maxLength: 30 })} />
            {errors.secondName && <span className="errorField">*This field is required</span>}
          </div>
          <div className="formFieldCont">
            <label htmlFor="username">Username</label>
            <input className="inputField" {...register("username", { required: true, maxLength: 30 })} />
            {errors.username && <span className="errorField">*This field is required</span>}
          </div>
          <div className="formFieldCont">
            <label htmlFor="email">Email Address</label>
            <input className="inputField wider" {...register("email", { required: true })} />
            {errors.email && <span className="errorField">*This field is required</span>}
          </div>
          <div className="formFieldCont">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input className="inputField" {...register("phoneNumber", { required: true })} />
          </div>
          <div className="formFieldCont">
            <label htmlFor="password">Password</label>
            <input className="inputField" {...register("password", { required: true, maxLength: 30, minLength: 8, validate: validatePassword  })} />
            {errors.password && <span className="errorField">*{errors.password.message}</span>}
          </div>
          <div className="formFieldCont">
            <label htmlFor="passwordVerify">Repeat password</label>
            <input className="inputField" {...register("passwordVerify", { required: true, maxLength: 30, minLength: 8, validate: validatePasswordMatch  })} />
            {errors.passwordVerify && <span className="errorField">*{errors.passwordVerify.message}</span>}
          </div>
          <SubmitBtn />
        </form>
        
        <Link to='/login' className="signUpLinkToLogin">
          <p>Already have an account?</p>
        </Link>

      </section>

        

    )
}