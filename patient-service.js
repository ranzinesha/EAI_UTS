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
app.get('/api/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// GET BY ID
app.get('/api/patients/:id', (req, res) => {
  db.query('SELECT * FROM patients WHERE id=?', [req.params.id], (err, result) => {
    res.json(result[0]);
  });
});

// CREATE
app.post('/api/patients', (req, res) => {
  const { name, age } = req.body;
  db.query('INSERT INTO patients (name, age) VALUES (?, ?)', [name, age], () => {
    res.json({ message: 'Patient added' });
  });
});

app.listen(3001, () => console.log('Patient Service running'));