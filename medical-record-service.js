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
app.get('/api/records', (req, res) => {
  db.query('SELECT * FROM records', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET BY ID
app.get('/api/records/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM records WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// POST
app.post('/api/records', (req, res) => {
  const { patient_id, diagnosis } = req.body;

  db.query(
    'INSERT INTO records (patient_id, diagnosis) VALUES (?, ?)',
    [patient_id, diagnosis],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Record created' });
    }
  );
});

// PUT
app.put('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const { patient_id, diagnosis } = req.body;

  db.query(
    'UPDATE records SET patient_id=?, diagnosis=? WHERE id=?',
    [patient_id, diagnosis, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Record updated' });
    }
  );
});

// DELETE
app.delete('/api/records/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM records WHERE id=?',
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Record deleted' });
    }
  );
});

//HISTORY
app.get('/api/history', (req, res) => {
  const query = `
    SELECT 
      p.name AS patient_name,
      d.name AS doctor_name,
      a.id AS appointment_id,
      r.diagnosis
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
    LEFT JOIN records r ON r.patient_id = p.id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(3004, () => console.log('Medical Record Service running'));