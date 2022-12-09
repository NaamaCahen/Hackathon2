import React from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";
import NewAppointment from "./NewAppointment";
import ViewMyAppointments from "./ViewMyAppointments";


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
   
    render() {
        return (
            <>
                {/* <span style={{ display: this.state.displayUser}}>hello {this.state.currentPatient.p_first_name}</span> */}
                <img src="https://myhealthcareclinic.com/wp-content/uploads/logo-1.png" alt='logo' width='20%' />
                <Routes>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Welcome />} />
                    <Route path='/appointments' element={<ViewMyAppointments />} />
                </Routes>
            </>

        )
    }
}

export default Home;