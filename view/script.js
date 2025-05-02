const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Ruta principal para comprobar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente.');
});

// Proxy para redirigir peticiones a Home Assistant
app.post('/api/services/:domain/:service', async (req, res) => {
    try {
        const homeAssistantUrl = `http://192.168.1.200:8123/api/services/${req.params.domain}/${req.params.service}`;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhYjQ3YTdjNGQwODQ0NDY3YmNlZTYwMWJmNTg4MzUzZSIsImlhdCI6MTc0Mjc1OTcxOSwiZXhwIjoyMDU4MTE5NzE5fQ.KVdGeE4byLteFuumxcBKgjP-vG4DZMMnBQs2ADccBuI';

        const response = await axios.post(homeAssistantUrl, req.body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        res.status(error.response?.status || 500).json({ message: 'Error en la solicitud' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});