const router = require('express').Router()

const Person = require('../models/Person')

// Create - criação de dados
router.post('/', async (req, res) => {

  // req.body

  // {name: 'Diego', salary: 10000, approved: false}
  const {name, salary, approved} = req.body

  if (!name) {
    res.status(422).json({error: 'O nome é obrigatório!'})
    return // para de executar o script
  }

  const person = {
    name,
    salary,
    approved,
  }

  try {
    // criando dados
    await Person.create(person)

    res.status(201).json({message: 'Pessoa inserida com sucesso!'}) // 201 significa que criamos um novo recurso com sucesso


  } catch (error) {
    res.status(500).json({error: error}) // esse numero de status http significa que deu erro no servidor
  }

})

// Read - leitura de dados
router.get('/', async (req, res) => {
  try {

    const people = await Person.find() // o await faz com que o script espere a resposta do mongo
    
    res.status(200).json(people)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {

  // extrair o dado da requisição, pela url = req.params
  const id = req.params.id

  try {

    const person = await Person.findOne({_id: id})

    if (!person) {
      res.status(422).json({message: 'Pessoa não encontrada!'})
      return
    }

    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({error: error})
  }

})

// Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

  const id = req.params.id

  const {name, salary, approved} = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    
    const updatedPerson = await Person.updateOne({_id: id}, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({message: 'Pessoa não encontrada!'})
      return
    }

    res.status(200).json(person)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Delete - delete de dados
router.delete('/:id', async (req, res) => {

  const id = req.params.id

  const person = await Person.findOne({_id: id})

  if (!person) {
    res.status(422).json({message: 'Pessoa não encontrada!'})
    return
  }

  try {

    await Person.deleteOne({_id: id})

    res.status(200).json({message: 'Pessoa removida com sucesso!'})
    
  } catch (error) {
    res.status(500).json({error: error})
  }

})

module.exports = router