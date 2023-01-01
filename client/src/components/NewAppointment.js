import React from "react";
// import currentpatient from "../patient";

class NewAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            hours: [],
            minutes: [],
            currentPatient: JSON.parse(localStorage.getItem('current'))
        }
    }
    componentDidMount = () => {
        fetch(`/api/doctors`)
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
        fetch(`/isAvailable`, {
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
        console.log(this.state.currentPatient);
        let id;
        const firstLast = {
            dr_first_name: appointment.dr_first_name,
            dr_last_name: appointment.dr_last_name
        }
        console.log(firstLast);
        fetch('/api/doctors/getId/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(firstLast)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data[0].dr_id);
                id = data[0].dr_id
                fetch('/myAppointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dr_id: id,
                        p_id: this.state.currentPatient.p_id,
                        appointment_time: appointment.time,
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        data[0].dr_first_name = appointment.dr_first_name;
                        data[0].dr_last_name = appointment.dr_last_name;
                        this.props.addAppointment(data[0]);
                        alert(`done!\n your appointment with Dr ${firstLast.dr_first_name} ${firstLast.dr_last_name} will be on: ${appointment.time}`)
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => {
                console.log(e);
            })
    }


    render() {
        const { nextDay, maxDate } = this.getMinMaxDates();
        return (
            <>

                <form className="bg-light-blue br-pill ma4 flex flex-column items-center dib w-40" onSubmit={this.handleSubmit}>
                    <h1 className="green">New Appointment:</h1>
                   <div className="ma3"> <select id='doctor' required >
                        <option key='-1' style={{ display: "none" }} ></option>
                        {
                            this.state.doctors.map((item, i) => {
                                return (
                                    <option key={i} id={item.dr_id}>
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
                    </select></div>
                    <button type='submit' className="bg-blue bn ma3 pa2 br-pill white">done</button>
                </form>
            </>
        )
    }
}

export default NewAppointment;