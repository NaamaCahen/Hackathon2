let currentpatient;

export const fetchPatient=(id)=>{
    
    fetch(`http://localhost:5001/api/patients/${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        currentpatient= data;
    })
    .catch(e=>console.log(e))
}

export default currentpatient ;