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

//get all my appointments
app.get('/myAppointments/:id', (req, res) => {
    const { id } = req.params;
    db('appointments')
        .join('patients', 'appointments.p_id', 'patients.p_id')
        .join('doctors', 'appointments.dr_id', 'doctors.dr_id')
        .select('appointment_id', 'doctors.dr_id', 'patients.p_first_name', 'patients.p_last_name', 'appointment_time')
        .where({ p_id: id })
        .then(rows => {
            if (rows.length === 0) {
                return res.status(404).json({ msg: 'not found' })
            }
            res.json(rows)
        })
        .catch(e => {
            console.log(e);
            res.status(404).json({ msg: e.message });
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
    .then(rows=>{
        res.json(rows)
    })
    .catch(e=>{
        console.log(e);
        res.status(404).json({msg:e.message})
    })
})

//add a new patient
app.post('/api/patients', (req, res) => {
    const { p_password, p_username, p_first_name, p_last_name,  p_gender,p_address,p_birth_date, p_email, p_phone } = req.body
    db('patients')
    .insert({
        p_password,
        p_username,
        p_first_name,
        p_last_name,
        p_gender,
        p_address,
        p_birth_date,
         p_email, 
         p_phone
    })
    .returning('*')
    .then(rows=>{
        res.json(rows)
    })
    .catch(e=>{
        console.log(e);
        res.status(404).json({msg:e.message})
    })
})