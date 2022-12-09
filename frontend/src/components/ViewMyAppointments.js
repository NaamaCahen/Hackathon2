import React, { Component } from 'react'
import NewAppointment from './NewAppointment'

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
     handleDelete =(id) =>{       
        fetch(`http://localhost:5001/myAppointments/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert(`the appointment was deleted. \n Thank You!`)
                let appointmentList=this.state.appointments
                .filter((item)=>{
                    console.log(item,id);
                   return item.appointment_id!==id})
                console.log(appointmentList);
                this.setState({ appointments:appointmentList})
            })
            .catch(e => console.log(e))
    }

    addAppointment=(appointment)=>{
        this.setState({appointments:[...this.state.appointments,appointment]})
    }
    render() {
        if (this.state.appointments.length) {
            return (
                <>
                    <NewAppointment addAppointment={this.addAppointment}/>
                    {
                        this.state.appointments.map((item, i) => {
                            return (
                                <div key={i} id={item.appointment_id}>
                                    <h4>Dr. {item.dr_last_name}  {item.dr_first_name}</h4>
                                    <p>{item.appointment_time.split('T')[0]}</p>
                                    <p>{item.appointment_time.split('T')[1].slice(0, 5)}</p>
                                    {/* <button onClick={this.handleEdit}>edit</button> */}
                                    <button onClick={()=>this.handleDelete(item.appointment_id)}>delete</button>
                                </div>
                            )
                        })

                    }

                </>
            )
        } else {
            return (

                <>
                    <NewAppointment />
                    <h3>no future appointments found...</h3>
                </>
            )
        }


    }
}

export default ViewMyAppointments