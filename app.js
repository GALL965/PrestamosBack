require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

const app = express();

// Modelos
const Prestamo = require('./models/prestamo.model');
const Puntuacion = require('./models/puntuacion.model');

// Rutas
const prestamoRoutes = require('./routes/prestamo.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const articuloRoutes = require('./routes/articulo.routes');
const disponibilidadRoutes = require('./routes/disponibilidad.routes');
const puntuacionRoutes = require('./routes/puntuacion.routes');

// 🔥 CORS ABIERTO (para pruebas)
app.use(cors());

// Middleware JSON
app.use(express.json());

// Usar rutas
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

// Sincronizar modelos
Prestamo.sync()
  .then(() => console.log("🟢 Tabla 'prestamos' sincronizada."))
  .catch(err => console.error("🔴 Error al sincronizar 'prestamos':", err));

Puntuacion.sync()
  .then(() => console.log("🟢 Tabla 'puntuaciones' sincronizada."))
  .catch(err => console.error("🔴 Error al sincronizar 'puntuaciones':", err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
