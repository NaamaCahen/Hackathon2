import React from "react";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            current: []
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const patient = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        //get the user
        fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.localStorage.setItem('current',JSON.stringify(data[0]))
                // //send the id to the patient.js file that will fetch the user and save it during the process
                // fetchPatient(data[0].p_id);
            })
            .catch(e => console.log(e));
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' id='username' required placeholder="user name" />
                    <input type='text' id='password' required placeholder="password" />
                    <button type='submit'>Login</button>
                </form>
            </>
        )
    };
}
export default Login;