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
    componentDidUpdate(){
        fetch(`http://localhost:5001/myAppointments/${this.state.currentPatient.p_id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({appointments:data})
        })
    }
    handleEdit(){
        
    }
    handleDelete(e){
        const id=e.target.parentNode.id
        fetch(`http://localhost:5001/myAppointments/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            alert(`the appointment was deleted. \n Thank You!`)
        })
        .catch(e=>console.log(e))
        
    }
    render() {
        return (
            <>
                <div>
                    {
                        this.state.appointments.map((item,i)=>{
                            return(
                               <div key={i} id={item.appointment_id}>
                                <h4>Dr. {item.dr_last_name}  {item.dr_first_name}</h4>
                                <p>{item.appointment_time.split('T')[0]}</p>
                                <p>{item.appointment_time.split('T')[1].slice(0,5)}</p>
                                <button onClick={this.handleEdit}>edit</button>
                                <button onClick={this.handleDelete}>delete</button>
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