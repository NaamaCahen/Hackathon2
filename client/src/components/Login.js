import React from "react";
import { Link } from "react-router-dom";
import './Style.css'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            current: [],
            // displayRegister:'none'
        }
    }
    componentDidMount(){
        localStorage.clear();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const patient = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        //get the user
        
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.msg==='not found'){
                    alert(`oops...\n we don't have your user in our system,\n please register before logging in. `)
                    // this.setState({displayRegister:'block'})
                }else{
                    window.localStorage.setItem('current',JSON.stringify(data[0]))
                    document.getElementById('submit').click();
                }
                
            })
            .catch(e => console.log(e));
    }
    render() {
        return (
            <>
                <form className="bg-light-green login-form shadow-3 grow flex flex-column items-center" onSubmit={this.handleSubmit}>
                    <input className="input" type='text' id='username' required placeholder="user name" />
                    <input className="input" type='text' id='password' required placeholder="password" />
                    <button id='' className="bg-blue white bn w-25 pa2 " type='submit'>Login</button>
                    <Link id='submit' to='/appointments'></Link>
                    <Link className="pa2" to='/'>back</Link>
                    <Link style={{display:this.state.displayRegister}} className="pa2" to='/register'>register</Link>
                </form>
            </>
        )
    };
}
export default Login;