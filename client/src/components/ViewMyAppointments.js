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
        fetch(`/myAppointments/${this.state.currentPatient.p_id}`)
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
                    <p className='b'>hello {this.state.currentPatient.p_first_name} </p>
                    <NewAppointment addAppointment={this.addAppointment}/>
                    <AppointmentList handleDelete={this.handleDelete} parentAppointments={this.state.appointments}/>
                </>
            )
        } else {
            return (
                <>
                    <p className='b'>hello {this.state.currentPatient.p_first_name} </p>
                    <NewAppointment addAppointment={this.addAppointment}/>
                    <h2 className='green ma5'>no future appointments found...</h2>
                </>
            )
        }


    }
}

export default ViewMyAppointments