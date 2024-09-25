import { useState } from "react";

import './sign-up-form.styles.scss'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("error");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user , email already in use')
            } else {
                console.log('err', err);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label = "Display Name" type="text" onChange={handleChange} name='displayName' value={displayName} required/>
                  

                <FormInput label = "Email" type="email" onChange={handleChange} name='email' value={email} required />

        
                <FormInput label = "Password" type="password" onChange={handleChange} name='password' value={password} required />

                
                <FormInput label="Confirm Password" type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required />
                <Button buttonType="inverted" type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;