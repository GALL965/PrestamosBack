require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const usuarioRoutes = require('./routes/usuario.routes');
const articuloRoutes = require('./routes/articulo.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/articulos', articuloRoutes); 
app.use('/api/disponibilidad', require('./routes/disponibilidad.routes'));

// Conexión a base de datos
db.authenticate()
  .then(() => {
    console.log('✅ Conexión a MySQL exitosa');
  })
  .catch(err => console.error('❌ Error en conexión MySQL:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
