import React, { Component } from 'react'

export class ViewMyAppointments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPatient: JSON.parse(localStorage.getItem('current')),
            appointments:[]
        }
    }
    componentDidMount() {
        //get all my appointments from the server (from the datebase)
        fetch(`http://localhost:5001/myAppointments/${this.state.currentPatient.p_id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({appointments:data})
        })
    }
    render() {
        return (
            <>
                <div>
                    {
                        this.state.appointments.map((item,i)=>{
                            return(
                               <div key={i}>
                                <h4>Dr. {item.dr_last_name}  {item.dr_first_name}</h4>
                                <p>{item.appointment_time.split('T')[0]}</p>
                                <p>{item.appointment_time.split('T')[1].slice(0,5)}</p>
                                <button>edit</button>
                                <button>delete</button>
                               </div> 
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default ViewMyAppointments