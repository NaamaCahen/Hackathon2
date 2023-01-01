import React, { Component } from 'react'

export class AppointmentList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPatient: JSON.parse(localStorage.getItem('current')),
            appointments: [],
        }
    }

    // componentDidMount() {
    //     //get all my appointments from the server (from the datebase)
    //     fetch(`/myAppointments/${this.state.currentPatient.p_id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             this.setState({ appointments: data })
    //         }).catch(e => console.log(e))
    // }
    handleDelete = (id) => {
        fetch(`/myAppointments/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let appointmentList = this.props.parentAppointments
                    .filter((item) => {
                        console.log(item, id);
                        return item.appointment_id !== id
                    })
                console.log(appointmentList);
                alert(`the appointment was deleted. \n Thank You!`)
                
                this.props.handleDelete(appointmentList)
                console.log(appointmentList);
            })
            .catch(e => console.log(e))
    }


    render() {
        return (
            <><h1 className='green ma5'>my future appointments:</h1>
                <div className='dib flex flex-wrap'>

                    {
                        this.props.parentAppointments.map((item, i) => {
                            return (
                                <div className='bg-light-green br4 w-30 flex flex-column items-center ma4  grow shadow-3' key={i} id={item.appointment_id}>
                                    <h4>Dr. {item.dr_last_name}  {item.dr_first_name}</h4>
                                    <p>{item.appointment_time.split('T')[0]}</p>
                                    <p>{item.appointment_time.split('T')[1].slice(0, 5)}</p>
                                    {/* <button onClick={this.handleEdit}>edit</button> */}
                                    <button onClick={() => this.handleDelete(item.appointment_id)}>delete</button>
                                </div>
                            )
                        })

                    }
                </div>
            </>
        )
    }
}

export default AppointmentList