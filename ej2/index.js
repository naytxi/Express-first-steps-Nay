const express = require('express');
const app = express();

const puerto = 3000;
app.use(express.json());

app.get('/', (req, res) => {    
    res.send('Bienvenido al sitio');
}   );

app.get('/productos', (req, res) => {       
    res.send('Lista de productos');
});

app.post('/productos', (req, res) => {
    res.send('Producto creado');
});

app.put('/productos', (req, res) => {   
    res.send('Producto actualizado');
});

app.delete('/productos', (req, res) => {
    res.send('Producto eliminado');
});

app.get('/usuarios', (req, res) => {       
    res.send('Lista de usuarios');
});

app.post('/usuarios', (req, res) => {
    res.send('Usuario creado');
});

app.put('/usuarios', (req, res) => {   
    res.send('Usuario actualizado');
});

app.delete('/usuarios', (req, res) => {
    res.send('Usuario eliminado');
});

app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});

