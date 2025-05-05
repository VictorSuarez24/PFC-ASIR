const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhYjQ3YTdjNGQwODQ0NDY3YmNlZTYwMWJmNTg4MzUzZSIsImlhdCI6MTc0Mjc1OTcxOSwiZXhwIjoyMDU4MTE5NzE5fQ.KVdGeE4byLteFuumxcBKgjP-vG4DZMMnBQs2ADccBuI';
const haURL = 'http://192.168.1.200:8123';

// Ruta para encender la luz
app.post('/api/services/light/turn_on', async (req, res) => {
  try {
    const response = await axios.post(`${haURL}/api/services/light/turn_on`, req.body, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error al encender:', err.message);
    res.status(err.response?.status || 500).send('Error al encender la luz');
  }
});

// Ruta para apagar la luz
app.post('/api/services/light/turn_off', async (req, res) => {
  try {
    const response = await axios.post(`${haURL}/api/services/light/turn_off`, req.body, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error('Error al apagar:', err.message);
    res.status(err.response?.status || 500).send('Error al apagar la luz');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});