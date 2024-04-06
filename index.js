// config inicial
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// forma de ler JSON / midlewares (recursos executados entre as nossas requisicoes e respostas)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// nkyWnEqLo0cViH35
// mongodb+srv://winniestefany303:nkyWnEqLo0cViH35@apicluster.tbgprir.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=APICluster


// entregar uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.tbgprir.mongodb.net/?retryWrites=true&w=majority&appName=APICluster`,
  )
  .then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3100)
  })
  .catch((err) => console.log(err))