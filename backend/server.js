const express = require('express');
const cors = require('cors');
const { db } = require('./db.js');
const dotenv = require('dotenv');


const app = express();

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`running on port: ${process.env.PORT}`);
})

//get all patients details
app.get('/api/patients', (req, res) => {
    db('patients')
        .select('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            res.status(404).json({ msg: e.message })
        })
})

//get one patient details by id
app.get('/api/patients/:id', (req, res) => {
    const { id } = req.params;
    db('patients')
        .select('*')
        .where({ p_id: id })
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            res.status(404).json({ msg: e.message })
        })
})

//get all doctors details
app.get('/api/doctors', (req, res) => {
    db('doctors')
        .select('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            res.status(404).json({ msg: e.message })
        })
})

//get one doctor details by id
app.get('/api/doctors/:id', (req, res) => {
    const { id } = req.params;
    db('doctors')
        .select('*')
        .where({ dr_id: id })
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            res.status(404).json({ msg: e.message })
        })
})

//get all my future appointments ordered by date
app.get('/myAppointments/:id', (req, res) => {
    const { id } = req.params;
    const today=new Date();
    db('appointments')
        .from('appointments')
        .innerJoin('doctors', 'appointments.dr_id', 'doctors.dr_id')
        .select('appointment_id', 'appointments.dr_id', 'p_id', 'appointment_time', 'doctors.dr_first_name', 'doctors.dr_last_name')
        .where({ p_id: id })
        .andWhere('appointment_time','>','today')
        .orderBy('appointments.appointment_time')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
})

//get all specializations
app.get('/api/specializations', (req, res) => {
    db('specializations')
        .select('spe_id', 'spe_name')
        .then(rows => {
            res.json(rows);
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//add a new doctor
app.post('/api/doctors', (req, res) => {
    const { dr_password, dr_username, dr_first_name, dr_last_name, specialization, dr_gender, dr_email, dr_phone } = req.body
    db('doctors')
        .insert({
            dr_password,
            dr_username,
            dr_first_name,
            dr_last_name,
            specialization,
            dr_gender,
            dr_email,
            dr_phone
        })
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//add a new patient
app.post('/api/patients', (req, res) => {
    db('patients')
        .insert(
            req.body
        )
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//add a new appointment
app.post('/myAppointments', (req, res) => {
    const { dr_id, p_id, appointment_time } = req.body;
    db('appointments')
        .insert({
            dr_id,
            p_id,
            appointment_time
        })
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//add specialization
app.post('/api/specializations', (req, res) => {
    const { spe_name } = req.body;
    db('specializations')
        .insert({
            spe_name
        })
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//update patient details
app.put('/api/patients/:id', (req, res) => {
    const { id } = req.params;
    db('patients')
        .update(req.body)
        .where({ p_id: id })
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
})

//update doctors details
app.put('/api/doctors/:id', (req, res) => {
    const { id } = req.params;
    db('doctors')
        .update(req.body)
        .where({ dr_id: id })
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
})

//update an appointment
app.put('/myAppointments/:id', (req, res) => {
    const { id } = req.params;
    db('appointments')
        .update(req.body)
        .where({ appointment_id: id })
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
        })
})

//delete a patient
app.delete('/api/patients/:id', (req, res) => {
    const { id } = req.params;
    db('patients')
        .where({ p_id: id })
        .del()
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//delete a doctor
app.delete('/api/doctors/:id', (req, res) => {
    const { id } = req.params;
    db('doctors')
        .where({ dr_id: id })
        .del()
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//delete an appointment
app.delete('/myAppointments/:id', (req, res) => {
    const { id } = req.params;
    db('appointments')
        .where({ appointment_id: id })
        .del()
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//delete a specialization
app.delete('/api/specializations/:id', (req, res) => {
    const { id } = req.params;
    db('specializations')
        .where({ spe_id: id })
        .del()
        .returning('*')
        .then(rows => {
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//api for login and register checks if the user exists
app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    db('patients')
        .where({
            p_username: username,
            p_password: password
        })
        .select('*')
        .then(rows => {
            if (rows.length === 0) {
                return res.status(200).json({ msg: 'not found' })
            }
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})



//checking if a selected hour and doctor is available 
app.post('/isAvailable', (req, res) => {
    const { dr_first_name, dr_last_name, time } = req.body
    db('appointments')
        .select('*')
        .from('appointments')
        .innerJoin('doctors', 'appointments.dr_id', 'doctors.dr_id')
        .where('doctors.dr_first_name', dr_first_name)
        .andWhere('doctors.dr_last_name', dr_last_name)
        .andWhere('appointments.appointment_time', time)
        .then(rows => {
            if (rows.length !== 0) {

                return res.json({ msg: 'this doctor is unavailable on this time' })
            }
            res.json({ msg: 'available' })
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message })
        })
})

//posting the first and last name of th edoctor and getting hus id
app.post('/api/doctors/getId/', (req, res) => {
    const { dr_first_name, dr_last_name } = req.body;
    db('doctors')
        .select('dr_id')
        .where({
            dr_first_name,
            dr_last_name
        })
        .then(rows => {
            if (rows.length === 0) {
                res.json({ msg: 'not found' })
            }
            res.json(rows)
        })
        .catch(e => {
            res.status(404).json({ msg: e.message })
        })
})