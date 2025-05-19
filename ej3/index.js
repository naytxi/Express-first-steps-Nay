const express = require('express');
const app = express();

app.use(express.json());

let products = [
  { id: 1, nombre: 'Taza de Harry Potter', precio: 300 },
  { id: 2, nombre: 'FIFA 22 PS5', precio: 1000 },
  { id: 3, nombre: 'Figura Goku Super Saiyan', precio: 100 },
  { id: 4, nombre: 'Zelda Breath of the Wild', precio: 200 },
  { id: 5, nombre: 'Skin Valorant', precio: 120 },
  { id: 6, nombre: 'Taza de Star Wars', precio: 220 }
];

app.get('/products', (req, res) => {
  res.json({
    description: 'Productos',
    items: products
  });
});

app.post('/products', (req, res) => {
  const { nombre, precio } = req.body;
  const newProduct = {
    id: products.length + 1,
    nombre,
    precio
  };
  products.push(newProduct);
  res.status(201).json({
    message: 'Producto creado',
    product: newProduct
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const productIndex = products.findIndex(p => p.id == id);
  
  if (productIndex === -1) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }
  
  products[productIndex] = {
    id: parseInt(id),
    nombre,
    precio
  };
  
  res.json({
    message: 'Producto actualizado',
    product: products[productIndex]
  });
});

app.delete('/products/:id', (req, res) => { 
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id == id);
  
  if (productIndex === -1) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    });
  }
  
  products.splice(productIndex, 1);
  
  res.json({
    message: 'Producto eliminado'
  });
});

app.get('/products/filter/price', (req, res) => {
  const precio = parseFloat(req.query.precio);
  const resultado = products.filter(p => p.precio === precio);
  res.json(resultado);
});

app.get('/products/filter/range', (req, res) => {
  const resultado = products.filter(p => p.precio >= 50 && p.precio <= 250);
  res.json(resultado);
});

app.get('/products/filter/id', (req, res) => {
  const id = parseInt(req.query.id);
  const producto = products.find(p => p.id === id);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

app.get('/products/filter/name', (req, res) => {
  const nombre = req.query.nombre.toLowerCase();
  const producto = products.find(p => p.nombre.toLowerCase() === nombre);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
       