const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // Importa el middleware cors

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'ler',
  host: 'localhost',
  database: 'ler_db',
  password: '1234',
  port: 5432,
});

// Usar el middleware cors
app.use(cors());

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener datos');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
