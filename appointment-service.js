const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_healthcare'
});

// GET ALL APPOINTMENTS
app.get('/api/appointments', (req, res) => {
  db.query('SELECT * FROM appointments', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// CREATE APPOINTMENT + VALIDASI
app.post('/api/appointments', async (req, res) => {
  const { patient_id, doctor_id } = req.body;
  try {
    const patient = await axios.get(`http://localhost:3001/api/patients/${patient_id}`);
    const doctor = await axios.get(`http://localhost:3002/api/doctors/${doctor_id}`);
    if (!patient.data || !doctor.data) {
      return res.status(400).json({ message: 'Invalid patient or doctor data' });
    }
    db.query(
      'INSERT INTO appointments (patient_id, doctor_id) VALUES (?, ?)',
      [patient_id, doctor_id],
      (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Appointment created' });
      }
    );
  } catch (err) {
    res.status(500).json({ message: 'Service error', error: err.message });
  }
});

// UPDATE APPOINTMENT
app.put('/api/appointments/:id', (req, res) => {
  const id = req.params.id;
  const { patient_id, doctor_id } = req.body;
  db.query(
    'UPDATE appointments SET patient_id=?, doctor_id=? WHERE id=?',
    [patient_id, doctor_id, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Appointment updated' });
    }
  );
});

// DELETE APPOINTMENT
app.delete('/api/appointments/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    'DELETE FROM appointments WHERE id=?',
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Appointment deleted' });
    }
  );
});

app.listen(3003, () => console.log('Appointment Service running on port 3003'));