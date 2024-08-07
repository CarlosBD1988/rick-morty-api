const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/character/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    const character = response.data;
    res.json(character);
  } catch (error) {
    res.status(500).send('Error al obtener los datos del personaje');
  }
});

// Ruta catch-all para servir index.html para cualquier otra solicitud
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
