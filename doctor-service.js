const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_healthcare'
});

// GET ALL
app.get('/api/doctors', (req, res) => {
  db.query('SELECT * FROM doctors', (err, result) => {
    res.json(result);
  });
});

// CREATE
app.post('/api/doctors', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO doctors (name) VALUES (?)', [name], () => {
    res.json({ message: 'Doctor added' });
  });
});

// AVAILABILITY
app.get('/api/doctors/:id/availability', (req, res) => {
  const doctorId = req.params.id;

  db.query(
    'SELECT * FROM appointments WHERE doctor_id = ?',
    [doctorId],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length > 0) {
        return res.json({
          doctor_id: doctorId,
          available: false,
          message: 'Doctor is not available'
        });
      }

      res.json({
        doctor_id: doctorId,
        available: true,
        message: 'Doctor is available'
      });
    }
  );
});

// PUT DOCTOR
app.put('/api/doctors/:id', (req, res) => {
  const id = req.params.id;
  const { name, specialty } = req.body;

  db.query(
    'UPDATE doctors SET name=?, specialty=? WHERE id=?',
    [name, specialty, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Doctor updated');
    }
  );
});

// DELETE DOCTOR
app.delete('/api/doctors/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM doctors WHERE id=?',
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Doctor deleted');
    }
  );
});

app.listen(3002, () => console.log('Doctor Service running'));