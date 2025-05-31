// 1. Requerir
const express = require('express');
const cors    = require('cors');
const { Articulo, sqlTool } = require('./models');

// 2. Crear instancia
const serverApp = express();

// 3. Middlewares
serverApp.use(express.json());
serverApp.use(cors());

// 4. Sincronizar base de datos
(async () => {
  try {
    await sqlTool.authenticate();
    console.log('✅ Conectado a SQLite');
    await sqlTool.sync();
    console.log('✅ Tablas sincronizadas');
  } catch (e) {
    console.error('❌ Error en DB:', e);
  }
})();

// 5. Rutas CRUD
serverApp.post('/articulos', async (req, res) => {
  try {
    const nuevo = await Articulo.create(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

serverApp.get('/articulos',    async (_, res) => res.json(await Articulo.findAll()));
serverApp.get('/articulos/:id', async (req, res) => {
  const a = await Articulo.findByPk(req.params.id);
  return a ? res.json(a) : res.status(404).json({ error: 'No encontrado' });
});
serverApp.put('/articulos/:id', async (req, res) => {
  await Articulo.update(req.body, { where: { id: req.params.id } });
  res.json(await Articulo.findByPk(req.params.id));
});
serverApp.delete('/articulos/:id', async (req, res) => {
  await Articulo.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

// 6. Iniciar servidor
const PORT = process.env.PORT || 3001;
serverApp.listen(PORT, () => console.log(` Backend en http://localhost:${PORT}`));
