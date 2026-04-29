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

db.connect((err) => {
  if (err) {
    console.error('❌ DB gagal konek:', err.message);
    process.exit(1); // stop service kalau DB gagal
  }
  console.log('✅ DB Connected!');
});

// GET ALL
app.get('/api/patients', (req, res) => {
  db.query('SELECT * FROM patients', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET BY ID
app.get('/api/patients/:id', (req, res) => {
  db.query('SELECT * FROM patients WHERE id=?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// CREATE
app.post('/api/patients', (req, res) => {
  const { name, age } = req.body;
  db.query(
    'INSERT INTO patients (name, age) VALUES (?, ?)',
    [name, age],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Patient added' });
    }
  );
});

// UPDATE 
app.put('/api/patients/:id', (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;

  db.query(
    'UPDATE patients SET name=?, age=? WHERE id=?',
    [name, age, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Patient updated' });
    }
  );
});

// DELETE 
app.delete('/api/patients/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM patients WHERE id=?',
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Patient deleted' });
    }
  );
});

app.listen(3001, () => console.log('Patient Service running on port 3001'));