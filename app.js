require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const usuarioRoutes = require('./routes/usuario.routes');
const articuloRoutes = require('./routes/articulo.routes');
const disponibilidadRoutes = require('./routes/disponibilidad.routes');

const app = express();

// CORS CONFIG: Permitir solo desde Firebase (puedes usar '*' para pruebas)
app.use(cors({
  origin: ['https://recursos360-91f5b.web.app'], // <-- cámbialo si cambia tu dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/articulos', articuloRoutes); 
app.use('/api/disponibilidad', disponibilidadRoutes);

// Conexión a base de datos
db.authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL exitosa');
  })
  .catch(err => console.error('❌ Error en conexión MySQL:', err));

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
