
require('dotenv').config()
const express = require('express')
const path = require('path')

const acervoRoutes = require('./routes/acervo.routes')
const dadosPecaRoutes = require('./routes/dadosPeca.routes')
const midiasFotosRoutes = require('./routes/midiasFotos.routes')

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api', (req, res) => {
    res.json({
        mensagem: 'API REST - Museu de Música',
        versao: '1.0.0'
    })
})

app.use('/api/acervo', acervoRoutes)
app.use('/api/dados-peca', dadosPecaRoutes)
app.use('/api/midias-fotos', midiasFotosRoutes)

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    })
})

module.exports = app
