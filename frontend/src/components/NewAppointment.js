import React from "react";

class NewAppointment extends React.Component{
    constructor(props){
        super();
        this.state={
            doctors:[],
            hours:[],
            minutes:[]
        }
    }
    componentDidMount=()=>{
        fetch(`http://localhost:5001/api/doctors`)
        .then(res=>res.json())
        .then(data=>{
            this.setState({doctors:data})
            console.log(data);
        })
        .catch(e=>{
            console.log(e);
        })

        const arrHours=[]
        for (let i = 9,j=0; i <= 20; i++) {
            arrHours[j]=i;
            j++;
        }
        const arrMinutes=[];
        for (let i = 0,j=0; i < 60; i+=15) {
            arrMinutes[j]=i;
            j++;
        }
        this.setState({hours:arrHours,minutes:arrMinutes})
    }
    getMinMaxDates(){
         //getting the current date and converting it to a string in format:yyyy-mm-dd
        let today=new Date()
        let dd=today.getDate()
        if(dd<10){
            dd='0'+dd
        }
        let mm=today.getMonth()+1
        if(mm<10){
            mm='0'+mm
        }
        const yyyy=today.getFullYear()
        today=`${yyyy}-${mm}-${dd}`;
        //set the max date to now+1 year.
        const maxDate=`${yyyy+1}-${mm}-${dd}`;
        return {today,maxDate};
    }
    
    render(){
       const {today,maxDate}=this.getMinMaxDates();
        return(
            <>
            <h1>New Appointment:</h1>
            <form on onSubmit={this.handleSubmit}>
                <select>
                    <option key='-1' style={{display: "none"}}>choose a doctor</option>
                    {
                        this.state.doctors.map((item,i)=>{
                            return(
                                <option key={i}>
                                    {item.dr_first_name} {item.dr_last_name}
                                </option>
                            )
                        })
                    }
                </select>
                <input type='date' id="date-picker" min={today} max={maxDate}/>
                <select name='hours'>
                   {
                    this.state.hours.map((item,i)=>{
                        return(
                            <option key={i}>{item<10?'0'+item:item}</option>
                        )
                    })
                   }
                </select>
                <select name='minutes'>
                   {
                    this.state.minutes.map((item,i)=>{
                        return(
                            <option key={i}>{(item===0)?'00':(item)}</option>
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