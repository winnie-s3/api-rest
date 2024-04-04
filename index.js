// config inicial
const express = require('express')
const app = express()

// forma de ler JSON / midlewares (recursos executados entre as nossas requisicoes e respostas)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rota inicial / endpoint
app.get('/', (req, res) => {

  // mostrar req

  res.json({message: 'Oi Express!'})

})


// entregar uma porta
app.listen(3100)