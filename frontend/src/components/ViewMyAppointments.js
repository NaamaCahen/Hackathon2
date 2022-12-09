import React, { Component } from 'react'
import NewAppointment from './NewAppointment'
import AppointmentList from './AppointmentList'

export class ViewMyAppointments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPatient: JSON.parse(localStorage.getItem('current')),
            appointments: [],
            edit: false
        }
    }
    componentDidMount() {
        //get all my appointments from the server (from the datebase)
        fetch(`http://localhost:5001/myAppointments/${this.state.currentPatient.p_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ appointments: data })
            }).catch(e => console.log(e))
    }
  
    // handleEdit() {
    //     console.log(`edit!!`);

    // }
     handleDelete=(appointmentList)=>{
        this.setState({appointments:appointmentList})
     }

    addAppointment=(appointment)=>{
        this.setState({appointments:[...this.state.appointments,appointment]})
    }
    render() {
        if (this.state.appointments.length) {
            return (
                <>
                    <NewAppointment addAppointment={this.addAppointment}/>
                    <AppointmentList handleDelete={this.handleDelete} parentAppointments={this.state.appointments}/>
                </>
            )
        } else {
            return (
                <>
                    <NewAppointment addAppointment={this.addAppointment}/>
                    <h3>no future appointments found...</h3>
                </>
            )
        }


    }
}

export default ViewMyAppointments