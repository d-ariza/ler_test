const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
  user: 'ler',
  host: 'localhost',
  database: 'ler_db',
  password: '1234',
  port: 5432,
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener datos');
  }
});

describe('GET /api/data', () => {
  it('debería devolver una lista de usuarios', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
