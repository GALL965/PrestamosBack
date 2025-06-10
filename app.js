require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const prestamoRoutes = require('./routes/prestamo.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const articuloRoutes = require('./routes/articulo.routes');
const disponibilidadRoutes = require('./routes/disponibilidad.routes');
const Prestamo = require('./models/prestamo.model');
const app = express();
const puntuacionRoutes = require('./routes/puntuacion.routes');


// 🔥 CORS ABIERTO (para pruebas)
app.use(cors());

app.use(express.json());

// Ruta
app.use('/api/puntuaciones', puntuacionRoutes);
app.use('/api/prestamos', prestamoRoutes);
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


Prestamo.sync()
  .then(() => console.log("🟢 Tabla 'prestamos' sincronizada."))
  .catch(err => console.error("🔴 Error al sincronizar 'prestamos':", err));
