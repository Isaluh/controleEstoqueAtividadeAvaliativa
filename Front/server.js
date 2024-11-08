const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const response = await fetch('http://localhost:8080/produtos');
        
        if (!response.ok) {
            throw new Error('Erro na requisição para a API');
        }
        
        const produtos = await response.json();

        res.render('index', { produtos });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao carregar produtos');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
