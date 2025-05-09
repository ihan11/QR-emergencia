const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const database = {}; // Simulación de base de datos en memoria

// Ruta para guardar datos
app.post('/api/save', (req, res) => {
  const id = uuidv4();
  database[id] = req.body;
  res.json({ id });
});

// Ruta para mostrar datos
app.get('/datos/:id', (req, res) => {
  const data = database[req.params.id];
  if (!data) return res.status(404).send('<h2>Datos no encontrados</h2>');

  const html = `
    <h1>Datos de Emergencia</h1>
    <p><strong>Nombre:</strong> ${data.fullName}</p>
    <p><strong>RUT:</strong> ${data.rut}</p>
    <p><strong>Fecha de Nacimiento:</strong> ${data.dob}</p>
    <p><strong>Grupo Sanguíneo:</strong> ${data.bloodType}</p>
    <p><strong>Alergias:</strong> ${data.allergies}</p>
    <p><strong>Condiciones Médicas:</strong> ${data.conditions}</p>
    <p><strong>Medicamentos:</strong> ${data.medications}</p>
    <p><strong>Dirección:</strong> ${data.address}</p>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});