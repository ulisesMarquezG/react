//Carga variables de entorno
require('dotenv').config();

//Importa dependencias
const express = require('express');
const cors = require('cors');

//Importa rutas de autenticación
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error interno.' });
});

// justo después de crear tu `app = express()`
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`)
);