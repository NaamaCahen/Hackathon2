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
                <Routes>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                     <Route path='/' element={<Welcome />}/>
                </Routes>
                <NewAppointment/> 
                <ViewMyAppointments/>
            </>

            )
    }
}

export default Home;