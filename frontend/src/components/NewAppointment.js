import React from "react";

class NewAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            hours: [],
            minutes: [],
            currentPatient:props.patient
        }
    }
    componentDidMount = () => {
        fetch(`http://localhost:5001/api/doctors`)
            .then(res => res.json())
            .then(data => {
                this.setState({ doctors: data })
            })
            .catch(e => {
                console.log(e);
            })

        const arrHours = []
        for (let i = 9, j = 0; i <= 20; i++) {
            arrHours[j] = i;
            j++;
        }
        const arrMinutes = [];
        for (let i = 0, j = 0; i < 60; i += 15) {
            arrMinutes[j] = i;
            j++;
        }
        this.setState({ hours: arrHours, minutes: arrMinutes })
    }
    componentDidUpdate=()=>{
        fetch(`http://localhost:5001/api/doctors`)
            .then(res => res.json())
            .then(data => {
                this.setState({ doctors: data })
            })
            .catch(e => {
                console.log(e);
            })

        const arrHours = []
        for (let i = 9, j = 0; i <= 20; i++) {
            arrHours[j] = i;
            j++;
        }
        const arrMinutes = [];
        for (let i = 0, j = 0; i < 60; i += 15) {
            arrMinutes[j] = i;
            j++;
        }
        this.setState({ hours: arrHours, minutes: arrMinutes })
    }
    getMinMaxDates() {

        //getting the current tomorrow date and converting it to a string in format:yyyy-mm-dd
        let today = new Date()
        let nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        let dd = nextDay.getDate()
        if (dd < 10) {
            dd = '0' + dd
        }
        let mm = nextDay.getMonth() + 1
        if (mm < 10) {
            mm = '0' + mm
        }
        const yyyy = nextDay.getFullYear()
        nextDay = `${yyyy}-${mm}-${dd}`;
        //set the max date to now+1 year.
        const maxDate = `${yyyy + 1}-${mm}-${dd}`;
        return { nextDay, maxDate };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const [dr_first_name, dr_last_name] = e.target.doctor.value.split(' ');
        const date = new Date(e.target.date_picker.value);
        if (date.getDay() === 5 || date.getDay() === 6) {
            alert(`the doctors aren't working on friday and saturday.\n please choose another day.`)
            return
        }
        const dateTime = `${e.target.date_picker.value} ${e.target.hours.value}:${e.target.minutes.value}`;
        const appointment = {
            dr_first_name: dr_first_name,
            dr_last_name: dr_last_name,
            time: dateTime
        }
        //check if the doctor is avalable at this time...
        fetch(`http://localhost:5001/isAvailable`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointment)

        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.msg !== 'available') {
                    alert(`${data.msg}\n please choose another date`)
                }
                else {
                    this.addAppointment(appointment);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
    addAppointment(appointment) {
        const dr_id=this.getDoctorId(appointment.dr_first_name,appointment.dr_last_name);
        const newAppointment={
            dr_id,
            p_id:currentPatient.id ,
            appointment_time:appointment.time,
        }
        fetch('http://localhost:5001/myAppointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAppointment)

        })
        this.setState({
            doctors: [],
            hours: [],
            minutes: []
        })
    }
    getDoctorId(first,last){
        const firstLast={
            first,
            last
        }
        fetch('http://localhost:5001/api/doctors/getId/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(firstLast)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.id);
            return data.id
        })
        .catch(e=>{
            console.log(e);
        })
    }

    render() {
        const { nextDay, maxDate } = this.getMinMaxDates();
        return (
            <>
                <h1>New Appointment:</h1>
                <form on onSubmit={this.handleSubmit}>
                    <select id='doctor' required >
                        <option key='-1' style={{ display: "none" }} ></option>
                        {
                            this.state.doctors.map((item, i) => {
                                return (
                                    <option key={i}>
                                        {item.dr_first_name} {item.dr_last_name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input type='date' id="date_picker" min={nextDay} max={maxDate} required />
                    <select id='hours' required>
                        {
                            this.state.hours.map((item, i) => {
                                return (
                                    <option key={i}>{item < 10 ? '0' + item : item}</option>
                                )
                            })
                        }
                    </select>
                    <select id='minutes' required>
                        {
                            this.state.minutes.map((item, i) => {
                                return (
                                    <option key={i}>{(item === 0) ? '00' : (item)}</option>
                                )
                            })
                        }
                    </select>
                    <button type='submit'>done</button>
                </form>
            </>
        )
    }
}

export default NewAppointment;