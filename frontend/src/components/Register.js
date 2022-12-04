import React from 'react';

class Register extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    addPatient=(e)=>{
        e.preventDefault();
        const form=e.target;
        const patient={
            p_first_name:form.p_first_name.value,
            p_last_name:form.p_last_name.value,
            p_username:form.p_username.value,
            p_password:form.p_password.value,
            p_gender:(form.male.checked)? 'male':'female',
            p_address:form.p_address.value,
            p_birth_date:form.p_birth_date.value,
            p_email:form.p_email.value,
            p_phone:form.p_phone.value
        }
        fetch('http://localhost:5001/api/patients',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })
    }
    render(){
        return(
            <>
                <form method='post' onSubmit={this.addPatient}>
                    <h2>Please fill in your personal details:</h2>
                    <input type='text' required placeholder='first name' id='p_first_name'/>
                    <input type='text' required placeholder='last name' id='p_last_name'/>
                    <input type='text' required placeholder='user name' id='p_username'/>
                    <input type='text'  required placeholder='password' id='p_password'/>
                    <input type='radio' required name='gender' id='male'/>male
                    <input type='radio' required name='gender' id='female'/>female
                    <input type='text'  placeholder='address' id='p_address'/>
                    birth of date:<input type='date'  required placeholder='date of birth' id='p_birth_date'/>
                    <input type='email' placeholder='email' required id='p_email'/>
                    <input type='phone' placeholder='phone number' required id='p_phone'/>
                    <button type='submit' >Register</button>
                </form>
            </>
        )
    }
}

export default Register;